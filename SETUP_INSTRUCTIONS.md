# VSF Optimization - Setup Instructions

Complete setup guide for the VSF Industrial Optimization System with PostgreSQL and FastAPI backend.

## Architecture Overview

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  React Frontend │ ◄────── │  FastAPI Backend │ ◄────── │   PostgreSQL    │
│   (Vite + React)│         │   (Python 3.9+)  │         │   (Database)    │
│   Port: 5173    │         │   Port: 8000     │         │   Port: 5432    │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

## Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.9+
- **Docker & Docker Compose** (recommended) OR **PostgreSQL** 15+
- **Git**

## Quick Start (Recommended)

### 1. Clone and Setup

```bash
# Navigate to project directory
cd /workspace

# Install frontend dependencies
npm install
```

### 2. Start PostgreSQL with Docker

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify it's running
docker-compose ps
```

### 3. Setup Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Initialize database with sample data
python -m app.init_db
```

### 4. Start Backend Server

```bash
# Make sure you're in the backend directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

Visit http://localhost:8000/docs to see the API documentation.

### 5. Start Frontend

Open a new terminal:

```bash
# Navigate to project root
cd /workspace

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **API Docs (ReDoc)**: http://localhost:8000/redoc

## Alternative Setup (Without Docker)

If you prefer not to use Docker, install PostgreSQL locally:

### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Windows
Download and install from: https://www.postgresql.org/download/windows/

### Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE vsf_optimization;
CREATE USER user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE vsf_optimization TO user;
\q
```

Then follow steps 3-6 from Quick Start.

## Project Structure

```
/workspace/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI application
│   │   ├── database.py        # Database configuration
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── init_db.py         # Database initialization
│   │   └── routers/           # API endpoints
│   │       ├── production_plans.py
│   │       ├── configurations.py
│   │       └── optimization_jobs.py
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment template
│   └── README.md             # Backend documentation
├── src/                       # React Frontend
│   ├── components/           # React components
│   ├── services/            # API service layer
│   │   └── api.js           # Backend API client
│   ├── data/                # Sample data
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── docker-compose.yml        # PostgreSQL container
├── package.json             # Frontend dependencies
└── README.md                # Main documentation
```

## Configuration

### Backend Environment Variables (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/vsf_optimization
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=vsf_optimization
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### Frontend Environment Variables (.env)

```env
VITE_API_URL=http://localhost:8000
```

## API Endpoints

### Production Plans
- `GET /api/production-plans` - List all production plans
- `POST /api/production-plans` - Create new plan
- `GET /api/production-plans/{id}` - Get specific plan
- `PUT /api/production-plans/{id}` - Update plan
- `DELETE /api/production-plans/{id}` - Delete plan

### Configurations
- `GET /api/configurations` - List all configurations
- `POST /api/configurations` - Create new configuration
- `GET /api/configurations/{id}` - Get specific configuration
- `PUT /api/configurations/{id}` - Update configuration
- `DELETE /api/configurations/{id}` - Delete configuration

### Optimization Jobs
- `GET /api/optimization-jobs` - List all jobs
- `POST /api/optimization-jobs` - Create new job
- `GET /api/optimization-jobs/{job_id}` - Get specific job
- `PUT /api/optimization-jobs/{job_id}` - Update job
- `POST /api/optimization-jobs/{job_id}/start` - Start optimization
- `POST /api/optimization-jobs/{job_id}/stop` - Stop optimization
- `POST /api/optimization-jobs/{job_id}/complete` - Complete with results
- `DELETE /api/optimization-jobs/{job_id}` - Delete job

## Development Workflow

### Running the Full Stack

```bash
# Terminal 1: PostgreSQL (if using Docker)
docker-compose up

# Terminal 2: Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Terminal 3: Frontend
npm run dev
```

### Stopping Services

```bash
# Stop frontend: Ctrl+C in terminal
# Stop backend: Ctrl+C in terminal
# Stop PostgreSQL: docker-compose down
```

## Testing the Integration

1. **Check Backend Health**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Test API Endpoints**
   - Visit http://localhost:8000/docs
   - Try out the endpoints using the Swagger UI

3. **Verify Frontend Connection**
   - Open http://localhost:5173
   - Navigate through the application
   - Check browser console for errors

## Troubleshooting

### Backend won't start
- **Error**: `ModuleNotFoundError`
  - Solution: Ensure virtual environment is activated and dependencies installed
  ```bash
  source venv/bin/activate
  pip install -r requirements.txt
  ```

- **Error**: `Connection refused` to PostgreSQL
  - Solution: Check if PostgreSQL is running
  ```bash
  docker-compose ps  # If using Docker
  pg_isready  # If using local PostgreSQL
  ```

### Frontend can't connect to backend
- **Error**: CORS errors in browser console
  - Solution: Check CORS settings in `backend/app/main.py`
  - Ensure VITE_API_URL in frontend .env is correct

- **Error**: API requests fail
  - Solution: Verify backend is running on port 8000
  - Check browser network tab for request details

### Database issues
- **Error**: Database doesn't exist
  - Solution: Run database initialization
  ```bash
  python -m app.init_db
  ```

- **Error**: Permission denied
  - Solution: Check database credentials in .env match your PostgreSQL setup

## Next Steps

1. **Customize Configuration**
   - Update database credentials if needed
   - Configure production URLs

2. **Add Features**
   - Implement user authentication
   - Add file upload for Excel files
   - Integrate optimization algorithms

3. **Deploy**
   - Set up production database
   - Configure environment for production
   - Deploy backend and frontend separately

## Support

For issues or questions:
- Check the API documentation at http://localhost:8000/docs
- Review backend logs in terminal
- Check browser console for frontend errors

## License

See LICENSE file for details.
