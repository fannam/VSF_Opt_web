from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.ProductionPlan])
def get_production_plans(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all production plans"""
    plans = db.query(models.ProductionPlan).offset(skip).limit(limit).all()
    return plans

@router.get("/{plan_id}", response_model=schemas.ProductionPlan)
def get_production_plan(plan_id: int, db: Session = Depends(get_db)):
    """Get a specific production plan by ID"""
    plan = db.query(models.ProductionPlan).filter(models.ProductionPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Production plan not found")
    return plan

@router.post("/", response_model=schemas.ProductionPlan)
def create_production_plan(
    plan: schemas.ProductionPlanCreate,
    db: Session = Depends(get_db)
):
    """Create a new production plan"""
    db_plan = models.ProductionPlan(**plan.dict())
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan

@router.put("/{plan_id}", response_model=schemas.ProductionPlan)
def update_production_plan(
    plan_id: int,
    plan: schemas.ProductionPlanUpdate,
    db: Session = Depends(get_db)
):
    """Update a production plan"""
    db_plan = db.query(models.ProductionPlan).filter(models.ProductionPlan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Production plan not found")
    
    update_data = plan.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_plan, key, value)
    
    db.commit()
    db.refresh(db_plan)
    return db_plan

@router.delete("/{plan_id}")
def delete_production_plan(plan_id: int, db: Session = Depends(get_db)):
    """Delete a production plan"""
    db_plan = db.query(models.ProductionPlan).filter(models.ProductionPlan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Production plan not found")
    
    db.delete(db_plan)
    db.commit()
    return {"message": "Production plan deleted successfully"}
