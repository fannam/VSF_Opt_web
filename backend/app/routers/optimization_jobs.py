from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app import models, schemas
from app.database import get_db

router = APIRouter()

def generate_job_id(db: Session) -> str:
    """Generate a unique job ID based on current date"""
    today = datetime.now()
    date_string = today.strftime("%Y%m%d")
    
    # Count jobs created today
    jobs_today = db.query(models.OptimizationJob).filter(
        models.OptimizationJob.job_id.like(f"{date_string}_%")
    ).count()
    
    return f"{date_string}_{jobs_today + 1}"

@router.get("/", response_model=List[schemas.OptimizationJobWithDetails])
def get_optimization_jobs(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all optimization jobs with details"""
    query = db.query(models.OptimizationJob)
    
    if status:
        query = query.filter(models.OptimizationJob.status == status)
    
    jobs = query.offset(skip).limit(limit).all()
    
    # Add plan and config names
    jobs_with_details = []
    for job in jobs:
        job_dict = {
            "id": job.id,
            "job_id": job.job_id,
            "plan_id": job.plan_id,
            "config_id": job.config_id,
            "status": job.status,
            "created_by": job.created_by,
            "created_at": job.created_at,
            "completed_at": job.completed_at,
            "results_data": job.results_data,
            "plan_name": job.production_plan.name if job.production_plan else "",
            "config_name": job.configuration.name if job.configuration else ""
        }
        jobs_with_details.append(schemas.OptimizationJobWithDetails(**job_dict))
    
    return jobs_with_details

@router.get("/{job_id}", response_model=schemas.OptimizationJobWithDetails)
def get_optimization_job(job_id: str, db: Session = Depends(get_db)):
    """Get a specific optimization job by job_id"""
    job = db.query(models.OptimizationJob).filter(models.OptimizationJob.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Optimization job not found")
    
    job_dict = {
        "id": job.id,
        "job_id": job.job_id,
        "plan_id": job.plan_id,
        "config_id": job.config_id,
        "status": job.status,
        "created_by": job.created_by,
        "created_at": job.created_at,
        "completed_at": job.completed_at,
        "results_data": job.results_data,
        "plan_name": job.production_plan.name if job.production_plan else "",
        "config_name": job.configuration.name if job.configuration else ""
    }
    
    return schemas.OptimizationJobWithDetails(**job_dict)

@router.post("/", response_model=schemas.OptimizationJob)
def create_optimization_job(
    job: schemas.OptimizationJobCreate,
    db: Session = Depends(get_db)
):
    """Create a new optimization job"""
    # Check if plan and config exist
    plan = db.query(models.ProductionPlan).filter(models.ProductionPlan.id == job.plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Production plan not found")
    
    config = db.query(models.Configuration).filter(models.Configuration.id == job.config_id).first()
    if not config:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    # Generate unique job ID
    job_id = generate_job_id(db)
    
    db_job = models.OptimizationJob(
        job_id=job_id,
        plan_id=job.plan_id,
        config_id=job.config_id,
        created_by=job.created_by,
        status="Chưa Tối Ưu"
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

@router.put("/{job_id}", response_model=schemas.OptimizationJob)
def update_optimization_job(
    job_id: str,
    job: schemas.OptimizationJobUpdate,
    db: Session = Depends(get_db)
):
    """Update an optimization job"""
    db_job = db.query(models.OptimizationJob).filter(models.OptimizationJob.job_id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Optimization job not found")
    
    update_data = job.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_job, key, value)
    
    db.commit()
    db.refresh(db_job)
    return db_job

@router.post("/{job_id}/start")
def start_optimization_job(job_id: str, db: Session = Depends(get_db)):
    """Start an optimization job"""
    db_job = db.query(models.OptimizationJob).filter(models.OptimizationJob.job_id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Optimization job not found")
    
    if db_job.status != "Chưa Tối Ưu":
        raise HTTPException(status_code=400, detail="Job cannot be started")
    
    db_job.status = "Đang Tối Ưu"
    db.commit()
    db.refresh(db_job)
    return {"message": "Job started successfully", "job": db_job}

@router.post("/{job_id}/stop")
def stop_optimization_job(job_id: str, db: Session = Depends(get_db)):
    """Stop an optimization job"""
    db_job = db.query(models.OptimizationJob).filter(models.OptimizationJob.job_id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Optimization job not found")
    
    if db_job.status != "Đang Tối Ưu":
        raise HTTPException(status_code=400, detail="Job cannot be stopped")
    
    db_job.status = "Chưa Tối Ưu"
    db.commit()
    db.refresh(db_job)
    return {"message": "Job stopped successfully", "job": db_job}

@router.post("/{job_id}/complete")
def complete_optimization_job(
    job_id: str,
    results_data: dict,
    db: Session = Depends(get_db)
):
    """Mark an optimization job as completed with results"""
    db_job = db.query(models.OptimizationJob).filter(models.OptimizationJob.job_id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Optimization job not found")
    
    db_job.status = "Đã Tối Ưu"
    db_job.completed_at = datetime.utcnow()
    db_job.results_data = results_data
    db.commit()
    db.refresh(db_job)
    return {"message": "Job completed successfully", "job": db_job}

@router.delete("/{job_id}")
def delete_optimization_job(job_id: str, db: Session = Depends(get_db)):
    """Delete an optimization job"""
    db_job = db.query(models.OptimizationJob).filter(models.OptimizationJob.job_id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Optimization job not found")
    
    db.delete(db_job)
    db.commit()
    return {"message": "Optimization job deleted successfully"}
