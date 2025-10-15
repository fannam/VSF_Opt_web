"""
Database initialization script with sample data
Run this script to populate the database with initial data
"""
from datetime import datetime
from app.database import SessionLocal, engine
from app.models import Base, ProductionPlan, Configuration, OptimizationJob

def init_sample_data():
    """Initialize database with sample data"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(ProductionPlan).count() > 0:
            print("Database already contains data. Skipping initialization.")
            return
        
        # Sample production data
        sample_production_data = [
            {"id": 1, "date": "01/01/2025", "itemCode": "VF3-001", "model": "VF3", "color": "Trắng", "type": "LHD", "quantity": 15},
            {"id": 2, "date": "01/01/2025", "itemCode": "VF5-002", "model": "VF5", "color": "Đen", "type": "RHD", "quantity": 12},
            {"id": 3, "date": "02/01/2025", "itemCode": "VF8-003", "model": "VF8", "color": "Xanh", "type": "LHD", "quantity": 18},
            {"id": 4, "date": "02/01/2025", "itemCode": "VF9-004", "model": "VF9", "color": "Đỏ", "type": "RHD", "quantity": 20},
            {"id": 5, "date": "03/01/2025", "itemCode": "VF6-005", "model": "VF6", "color": "Xám", "type": "LHD", "quantity": 14},
        ]
        
        # Create Production Plans
        production_plans = [
            ProductionPlan(
                name="KHSX Tháng 4/2025",
                created_by="Nguyễn Văn A",
                created_at=datetime(2025, 3, 15),
                data=sample_production_data
            ),
            ProductionPlan(
                name="KHSX Tháng 5/2025",
                created_by="Trần Thị B",
                created_at=datetime(2025, 3, 20),
                data=sample_production_data[2:4]
            ),
            ProductionPlan(
                name="KHSX Tháng 6/2025",
                created_by="Lê Văn C",
                created_at=datetime(2025, 3, 25),
                data=sample_production_data[0:3]
            ),
        ]
        
        for plan in production_plans:
            db.add(plan)
        
        db.commit()
        
        # Create Configurations
        initial_ga_config = {
            "maxCarsPerDay": 100,
            "minCarsPerDay": 20,
            "changeoverTime": 30
        }
        
        initial_body_config = {
            "maxCarsPerDay": 80,
            "minCarsPerDay": 15,
            "changeoverTime": 45
        }
        
        initial_calendar_days = [
            {"date": "2025-01-01", "isWorkingDay": True},
            {"date": "2025-01-02", "isWorkingDay": True},
        ]
        
        configurations = [
            Configuration(
                name="Cấu hình GA-01",
                created_by="Nguyễn Văn A",
                created_at=datetime(2025, 3, 10),
                workshop="GA",
                ga_config=initial_ga_config,
                body_config=initial_body_config,
                calendar_days=initial_calendar_days
            ),
            Configuration(
                name="Cấu hình Body-02",
                created_by="Trần Thị B",
                created_at=datetime(2025, 3, 12),
                workshop="Body",
                ga_config=initial_ga_config,
                body_config=initial_body_config,
                calendar_days=initial_calendar_days
            ),
            Configuration(
                name="Cấu hình Paint-01",
                created_by="Lê Văn C",
                created_at=datetime(2025, 3, 14),
                workshop="Paint",
                ga_config=initial_ga_config,
                body_config=initial_body_config,
                calendar_days=initial_calendar_days
            ),
        ]
        
        for config in configurations:
            db.add(config)
        
        db.commit()
        
        # Sample results data
        sample_results = {
            "bodyLineData": [
                {"date": "01/01", "VF3": 42, "VF5/6/7": 36, "VF8/9/e34": 40},
                {"date": "02/01", "VF3": 49, "VF5/6/7": 43, "VF8/9/e34": 46},
            ],
            "changeOverData": [
                {"date": "01/01", "VF3": 2, "VF5/6/7": 3, "VF8/9/e34": 2},
                {"date": "02/01", "VF3": 1, "VF5/6/7": 2, "VF8/9/e34": 3},
            ],
            "summaryKPIs": {
                "original": {"changeOver": 28, "multiColorDays": 12},
                "optimized": {"changeOver": 18, "multiColorDays": 6},
                "improvement": {"changeOver": "35.7%", "multiColorDays": "50%"}
            }
        }
        
        # Create Optimization Jobs
        optimization_jobs = [
            OptimizationJob(
                job_id="20251014_1",
                plan_id=1,
                config_id=1,
                status="Đã Tối Ưu",
                created_by="Nguyễn Văn A",
                created_at=datetime(2025, 1, 1, 10, 30),
                completed_at=datetime(2025, 1, 1, 11, 45),
                results_data=sample_results
            ),
            OptimizationJob(
                job_id="20251014_2",
                plan_id=2,
                config_id=2,
                status="Đang Tối Ưu",
                created_by="Trần Thị B",
                created_at=datetime(2025, 1, 15, 9, 15),
                completed_at=None,
                results_data={}
            ),
            OptimizationJob(
                job_id="20251014_3",
                plan_id=3,
                config_id=3,
                status="Chưa Tối Ưu",
                created_by="Lê Văn C",
                created_at=datetime(2025, 2, 1, 14, 20),
                completed_at=None,
                results_data={}
            ),
        ]
        
        for job in optimization_jobs:
            db.add(job)
        
        db.commit()
        
        print("✅ Database initialized with sample data successfully!")
        print(f"   - {len(production_plans)} production plans")
        print(f"   - {len(configurations)} configurations")
        print(f"   - {len(optimization_jobs)} optimization jobs")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_sample_data()
