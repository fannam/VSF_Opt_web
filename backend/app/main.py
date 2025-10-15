from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routers import production_plans, configurations, optimization_jobs

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VSF Optimization API",
    description="Backend API for VSF Industrial Optimization System",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(production_plans.router, prefix="/api/production-plans", tags=["Production Plans"])
app.include_router(configurations.router, prefix="/api/configurations", tags=["Configurations"])
app.include_router(optimization_jobs.router, prefix="/api/optimization-jobs", tags=["Optimization Jobs"])

@app.get("/")
def read_root():
    return {"message": "VSF Optimization API", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
