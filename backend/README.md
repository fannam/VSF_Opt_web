# VSF Optimization - FastAPI Backend

Backend API server for VSF Industrial Optimization System with PostgreSQL database integration.

## Features

- **FastAPI** - Modern, fast web framework for building APIs
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **CORS enabled** - For frontend integration

## Prerequisites

- Python 3.9+
- PostgreSQL 15+ (or use Docker)
- pip or poetry for dependency management

## Setup Instructions

### Option 1: Using Docker (Recommended)

1. **Start PostgreSQL with Docker Compose**
   ```bash
   # From the root directory
   docker-compose up -d
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env if needed (default values work with docker-compose)
   ```

4. **Initialize the database**
   ```bash
   python -m app.init_db
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Option 2: Using Local PostgreSQL

1. **Install and start PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # macOS
   brew install postgresql@15
   brew services start postgresql@15
   ```

2. **Create database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE vsf_optimization;
   CREATE USER user WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE vsf_optimization TO user;
   \q
   ```

3. **Follow steps 2-5 from Option 1**

## API Endpoints

### Production Plans
- `GET /api/production-plans` - List all production plans
- `GET /api/production-plans/{id}` - Get specific plan
- `POST /api/production-plans` - Create new plan
- `PUT /api/production-plans/{id}` - Update plan
- `DELETE /api/production-plans/{id}` - Delete plan

### Configurations
- `GET /api/configurations` - List all configurations
- `GET /api/configurations/{id}` - Get specific configuration
- `POST /api/configurations` - Create new configuration
- `PUT /api/configurations/{id}` - Update configuration
- `DELETE /api/configurations/{id}` - Delete configuration

### Optimization Jobs
- `GET /api/optimization-jobs` - List all jobs
- `GET /api/optimization-jobs/{job_id}` - Get specific job
- `POST /api/optimization-jobs` - Create new job
- `PUT /api/optimization-jobs/{job_id}` - Update job
- `POST /api/optimization-jobs/{job_id}/start` - Start optimization
- `POST /api/optimization-jobs/{job_id}/stop` - Stop optimization
- `POST /api/optimization-jobs/{job_id}/complete` - Mark as completed
- `DELETE /api/optimization-jobs/{job_id}` - Delete job

### Health Check
- `GET /` - API information
- `GET /health` - Health check

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Database Schema

### ProductionPlan
- id (Primary Key)
- name
- created_by
- created_at
- data (JSON - production items)

### Configuration
- id (Primary Key)
- name
- created_by
- created_at
- workshop
- ga_config (JSON)
- body_config (JSON)
- calendar_days (JSON)

### OptimizationJob
- id (Primary Key)
- job_id (Unique)
- plan_id (Foreign Key)
- config_id (Foreign Key)
- status
- created_by
- created_at
- completed_at
- results_data (JSON)

## Development

### Running tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Database migrations with Alembic
```bash
# Create a migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Troubleshooting

### Connection refused to PostgreSQL
- Check if PostgreSQL is running: `docker-compose ps` or `pg_isready`
- Verify DATABASE_URL in `.env` matches your setup

### Module not found errors
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### CORS errors from frontend
- Check CORS origins in `app/main.py`
- Default allows localhost:5173 (Vite) and localhost:3000 (React)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:password@localhost:5432/vsf_optimization |
| POSTGRES_USER | Database user | user |
| POSTGRES_PASSWORD | Database password | password |
| POSTGRES_DB | Database name | vsf_optimization |
| POSTGRES_HOST | Database host | localhost |
| POSTGRES_PORT | Database port | 5432 |

## License

See LICENSE file in root directory.
