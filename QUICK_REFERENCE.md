# VSF Optimization - Quick Reference

## 🚀 Getting Started (First Time)

```bash
# 1. Start everything
chmod +x start-all.sh stop-all.sh
./start-all.sh

# 2. Open in browser
# Frontend: http://localhost:5173
# API Docs: http://localhost:8000/docs
```

## 🔧 Common Commands

### Starting Services

```bash
# Start all (recommended)
./start-all.sh

# Or start individually:
docker-compose up -d                    # PostgreSQL only
cd backend && ./run.sh                  # Backend only
npm run dev                             # Frontend only
```

### Stopping Services

```bash
# Stop all
./stop-all.sh

# Or stop individually:
Ctrl+C                                  # Frontend/Backend
docker-compose down                     # PostgreSQL
```

### Viewing Logs

```bash
tail -f backend.log                     # Backend logs
tail -f frontend.log                    # Frontend logs
docker-compose logs -f postgres         # PostgreSQL logs
```

## 🗄️ Database Commands

```bash
# Initialize with sample data
cd backend
source venv/bin/activate
python -m app.init_db

# Access database
docker-compose exec postgres psql -U user -d vsf_optimization

# View tables
docker-compose exec postgres psql -U user -d vsf_optimization -c "\dt"

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
cd backend && python -m app.init_db
```

## 🌐 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main application |
| Backend | http://localhost:8000 | API server |
| API Docs (Swagger) | http://localhost:8000/docs | Interactive API docs |
| API Docs (ReDoc) | http://localhost:8000/redoc | Alternative docs |
| Health Check | http://localhost:8000/health | Backend health |

## 📡 API Endpoints Quick Reference

### Production Plans
```bash
# List all
curl http://localhost:8000/api/production-plans

# Create new
curl -X POST http://localhost:8000/api/production-plans \
  -H "Content-Type: application/json" \
  -d '{"name": "New Plan", "created_by": "User", "data": []}'

# Update
curl -X PUT http://localhost:8000/api/production-plans/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Plan"}'

# Delete
curl -X DELETE http://localhost:8000/api/production-plans/1
```

### Configurations
```bash
# List all
curl http://localhost:8000/api/configurations

# Create new
curl -X POST http://localhost:8000/api/configurations \
  -H "Content-Type: application/json" \
  -d '{"name": "New Config", "created_by": "User", "workshop": "GA", "ga_config": {}, "body_config": {}, "calendar_days": []}'
```

### Optimization Jobs
```bash
# List all
curl http://localhost:8000/api/optimization-jobs

# Create new job
curl -X POST http://localhost:8000/api/optimization-jobs \
  -H "Content-Type: application/json" \
  -d '{"plan_id": 1, "config_id": 1, "created_by": "User"}'

# Start job
curl -X POST http://localhost:8000/api/optimization-jobs/20251014_1/start

# Stop job
curl -X POST http://localhost:8000/api/optimization-jobs/20251014_1/stop
```

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check Python virtual environment
cd backend
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Check PostgreSQL
docker-compose ps
```

### Database connection failed

```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Frontend can't connect to backend

```bash
# Check backend is running
curl http://localhost:8000/health

# Check .env file
cat .env
# Should have: VITE_API_URL=http://localhost:8000

# Restart frontend
npm run dev
```

### CORS errors

```bash
# Check CORS settings in backend/app/main.py
# Should include: http://localhost:5173

# Restart backend after changes
cd backend
uvicorn app.main:app --reload --port 8000
```

## 🔄 Development Workflow

### Making Backend Changes

```bash
cd backend
source venv/bin/activate

# Edit files in app/
# Backend auto-reloads with --reload flag

# Test changes
curl http://localhost:8000/api/...
# Or visit http://localhost:8000/docs
```

### Making Frontend Changes

```bash
# Edit files in src/
# Frontend auto-reloads with Vite HMR

# Test changes in browser
# Open http://localhost:5173
```

### Database Schema Changes

```bash
cd backend
source venv/bin/activate

# 1. Update models in app/models.py
# 2. Update schemas in app/schemas.py
# 3. Recreate database (dev only)
docker-compose down -v
docker-compose up -d
python -m app.init_db
```

## 📦 Dependency Management

### Backend (Python)

```bash
cd backend
source venv/bin/activate

# Add new package
pip install package-name
pip freeze > requirements.txt

# Update all packages
pip install --upgrade -r requirements.txt
```

### Frontend (Node.js)

```bash
# Add new package
npm install package-name

# Update all packages
npm update

# Check outdated packages
npm outdated
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
source venv/bin/activate

# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest

# Run with coverage
pytest --cov=app
```

### Frontend Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 📊 Monitoring

### Check Service Status

```bash
# All services
./start-all.sh          # Shows status after starting

# PostgreSQL
docker-compose ps

# Backend
curl http://localhost:8000/health

# Frontend
curl http://localhost:5173
```

### Performance Monitoring

```bash
# Backend logs
tail -f backend.log | grep "ERROR"

# PostgreSQL stats
docker-compose exec postgres psql -U user -d vsf_optimization -c "SELECT * FROM pg_stat_activity;"
```

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/vsf_optimization
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 📁 File Locations

```
/workspace/
├── backend/              Backend code
├── src/                  Frontend code
├── .env                  Frontend config
├── backend/.env          Backend config
├── docker-compose.yml    PostgreSQL config
├── start-all.sh         Start script
└── stop-all.sh          Stop script
```

## ⚡ Quick Tips

1. **Always activate virtual environment** before running Python commands
2. **Use Swagger UI** (http://localhost:8000/docs) for API testing
3. **Check logs** when something doesn't work
4. **Restart services** after configuration changes
5. **Use start-all.sh** for consistent environment

## 🆘 Need Help?

1. Check **SETUP_INSTRUCTIONS.md** for detailed guide
2. Check **INTEGRATION_SUMMARY.md** for architecture overview
3. Visit http://localhost:8000/docs for API documentation
4. Check logs: `tail -f backend.log` or `tail -f frontend.log`
5. Verify services: `docker-compose ps`, `curl http://localhost:8000/health`

---

**Quick Start:** `./start-all.sh` → Open http://localhost:5173  
**Quick Stop:** `./stop-all.sh`
