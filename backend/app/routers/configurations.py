from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Configuration])
def get_configurations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all configurations"""
    configs = db.query(models.Configuration).offset(skip).limit(limit).all()
    return configs

@router.get("/{config_id}", response_model=schemas.Configuration)
def get_configuration(config_id: int, db: Session = Depends(get_db)):
    """Get a specific configuration by ID"""
    config = db.query(models.Configuration).filter(models.Configuration.id == config_id).first()
    if not config:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return config

@router.post("/", response_model=schemas.Configuration)
def create_configuration(
    config: schemas.ConfigurationCreate,
    db: Session = Depends(get_db)
):
    """Create a new configuration"""
    db_config = models.Configuration(**config.dict())
    db.add(db_config)
    db.commit()
    db.refresh(db_config)
    return db_config

@router.put("/{config_id}", response_model=schemas.Configuration)
def update_configuration(
    config_id: int,
    config: schemas.ConfigurationUpdate,
    db: Session = Depends(get_db)
):
    """Update a configuration"""
    db_config = db.query(models.Configuration).filter(models.Configuration.id == config_id).first()
    if not db_config:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    update_data = config.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_config, key, value)
    
    db.commit()
    db.refresh(db_config)
    return db_config

@router.delete("/{config_id}")
def delete_configuration(config_id: int, db: Session = Depends(get_db)):
    """Delete a configuration"""
    db_config = db.query(models.Configuration).filter(models.Configuration.id == config_id).first()
    if not db_config:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    db.delete(db_config)
    db.commit()
    return {"message": "Configuration deleted successfully"}
