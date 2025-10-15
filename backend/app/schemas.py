from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

# Production Plan Schemas
class ProductionDataItem(BaseModel):
    id: int
    date: str
    itemCode: str
    model: str
    color: str
    type: str
    quantity: int

class ProductionPlanBase(BaseModel):
    name: str
    created_by: str
    data: List[Dict[str, Any]] = []

class ProductionPlanCreate(ProductionPlanBase):
    pass

class ProductionPlanUpdate(BaseModel):
    name: Optional[str] = None
    data: Optional[List[Dict[str, Any]]] = None

class ProductionPlan(ProductionPlanBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Configuration Schemas
class ConfigurationBase(BaseModel):
    name: str
    created_by: str
    workshop: str = "GA"
    ga_config: Dict[str, Any] = {}
    body_config: Dict[str, Any] = {}
    calendar_days: List[Dict[str, Any]] = []

class ConfigurationCreate(ConfigurationBase):
    pass

class ConfigurationUpdate(BaseModel):
    name: Optional[str] = None
    workshop: Optional[str] = None
    ga_config: Optional[Dict[str, Any]] = None
    body_config: Optional[Dict[str, Any]] = None
    calendar_days: Optional[List[Dict[str, Any]]] = None

class Configuration(ConfigurationBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Optimization Job Schemas
class OptimizationJobBase(BaseModel):
    plan_id: int
    config_id: int
    created_by: str

class OptimizationJobCreate(OptimizationJobBase):
    pass

class OptimizationJobUpdate(BaseModel):
    status: Optional[str] = None
    completed_at: Optional[datetime] = None
    results_data: Optional[Dict[str, Any]] = None

class OptimizationJob(BaseModel):
    id: int
    job_id: str
    plan_id: int
    config_id: int
    status: str
    created_by: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    results_data: Dict[str, Any] = {}
    
    class Config:
        from_attributes = True

class OptimizationJobWithDetails(OptimizationJob):
    plan_name: str
    config_name: str
