from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ProductionPlan(Base):
    __tablename__ = "production_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    data = Column(JSON, default=list)  # Production data items
    
    # Relationship to optimization jobs
    optimization_jobs = relationship("OptimizationJob", back_populates="production_plan")


class Configuration(Base):
    __tablename__ = "configurations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    workshop = Column(String, default="GA")  # GA, Body, Paint
    ga_config = Column(JSON, default=dict)
    body_config = Column(JSON, default=dict)
    calendar_days = Column(JSON, default=list)
    
    # Relationship to optimization jobs
    optimization_jobs = relationship("OptimizationJob", back_populates="configuration")


class OptimizationJob(Base):
    __tablename__ = "optimization_jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, unique=True, nullable=False, index=True)
    plan_id = Column(Integer, ForeignKey("production_plans.id"))
    config_id = Column(Integer, ForeignKey("configurations.id"))
    status = Column(String, default="Chưa Tối Ưu")  # Chưa Tối Ưu, Đang Tối Ưu, Đã Tối Ưu
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Results data
    results_data = Column(JSON, default=dict)
    
    # Relationships
    production_plan = relationship("ProductionPlan", back_populates="optimization_jobs")
    configuration = relationship("Configuration", back_populates="optimization_jobs")
