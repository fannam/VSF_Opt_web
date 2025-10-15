# VSF Optimization System

Industrial optimization web application for production planning and scheduling with PostgreSQL database and FastAPI backend.

## 🎯 Features

- **Production Planning (KHSX)** - Manage and track production plans
- **Configuration Management** - Set up optimization parameters for different workshops (GA, Body, Paint)
- **Optimization Jobs** - Create and run optimization jobs with real-time status tracking
- **Results Visualization** - View optimization results with interactive charts and dashboards
- **RESTful API** - Complete backend API for all operations
- **Persistent Storage** - PostgreSQL database for reliable data storage

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  React Frontend │ ◄────── │  FastAPI Backend │ ◄────── │   PostgreSQL    │
│   (Vite + React)│         │   (Python 3.9+)  │         │   (Database)    │
│   Port: 5173    │         │   Port: 8000     │         │   Port: 5432    │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

### Technology Stack

**Frontend:**
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Recharts (Data visualization)
- Lucide React (Icons)

**Backend:**
- FastAPI (Web framework)
- SQLAlchemy (ORM)
- PostgreSQL (Database)
- Pydantic (Data validation)
- Uvicorn (ASGI server)

**Infrastructure:**
- Docker & Docker Compose
- Python 3.9+
- Node.js 16+

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd /workspace
   ```

2. **Start all services**
   ```bash
   # Make scripts executable (first time only)
   chmod +x start-all.sh stop-all.sh

   # Start everything (PostgreSQL, Backend, Frontend)
   ./start-all.sh
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Manual Setup

If you prefer to start services individually:

```bash
# 1. Start PostgreSQL
docker-compose up -d

# 2. Setup and start backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python -m app.init_db
uvicorn app.main:app --reload --port 8000

# 3. Setup and start frontend (in new terminal)
cd /workspace
npm install
cp .env.example .env
npm run dev
```

## 📁 Project Structure

```
/workspace/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # FastAPI application
│   │   ├── database.py        # Database configuration
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── init_db.py         # Database initialization
│   │   └── routers/           # API endpoints
│   ├── requirements.txt       # Python dependencies
│   └── README.md             # Backend documentation
├── src/                       # React Frontend
│   ├── components/           # React components
│   │   ├── Dashboard.jsx
│   │   ├── Input.jsx
│   │   ├── Config.jsx
│   │   ├── Optimize.jsx
│   │   └── Results.jsx
│   ├── services/
│   │   └── api.js            # Backend API client
│   └── App.jsx               # Main application
├── docker-compose.yml        # PostgreSQL container
├── start-all.sh             # Start all services
├── stop-all.sh              # Stop all services
└── SETUP_INSTRUCTIONS.md    # Detailed setup guide
```

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/vsf_optimization
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=vsf_optimization
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### Frontend Environment Variables

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:8000
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs (Interactive API testing)
- **ReDoc**: http://localhost:8000/redoc (Alternative documentation)

### Main Endpoints

#### Production Plans
- `GET /api/production-plans` - List all production plans
- `POST /api/production-plans` - Create new plan
- `GET /api/production-plans/{id}` - Get specific plan
- `PUT /api/production-plans/{id}` - Update plan
- `DELETE /api/production-plans/{id}` - Delete plan

#### Configurations
- `GET /api/configurations` - List all configurations
- `POST /api/configurations` - Create new configuration
- `GET /api/configurations/{id}` - Get specific configuration
- `PUT /api/configurations/{id}` - Update configuration
- `DELETE /api/configurations/{id}` - Delete configuration

#### Optimization Jobs
- `GET /api/optimization-jobs` - List all jobs
- `POST /api/optimization-jobs` - Create new job
- `POST /api/optimization-jobs/{job_id}/start` - Start optimization
- `POST /api/optimization-jobs/{job_id}/stop` - Stop optimization
- `POST /api/optimization-jobs/{job_id}/complete` - Complete with results

## 🛠️ Development

### Running Services

```bash
# Start all services
./start-all.sh

# Or start individually:

# PostgreSQL
docker-compose up -d

# Backend (in backend/)
source venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Frontend
npm run dev
```

### Stopping Services

```bash
# Stop all services
./stop-all.sh

# Or stop individually:
# Frontend: Ctrl+C in terminal
# Backend: Ctrl+C in terminal
# PostgreSQL: docker-compose down
```

### Database Management

```bash
# Initialize database with sample data
cd backend
python -m app.init_db

# Access PostgreSQL directly
docker-compose exec postgres psql -U user -d vsf_optimization

# View database logs
docker-compose logs -f postgres
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
npm test
```

## 📊 Database Schema

### Tables

**ProductionPlan**
- Stores production planning data (KHSX - Kế hoạch sản xuất)
- Contains production items with dates, models, colors, quantities

**Configuration**
- Workshop-specific optimization configurations
- GA (General Assembly), Body, Paint parameters
- Calendar and working day settings

**OptimizationJob**
- Links production plans with configurations
- Tracks optimization status and results
- Stores job history and analytics data

### Relationships

```
ProductionPlan (1) ──────────── (*) OptimizationJob
                                      │
Configuration (1) ──────────────────┘
```

## 🐛 Troubleshooting

### Backend Issues

**Database connection errors:**
```bash
# Check if PostgreSQL is running
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

**Module not found errors:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**API connection errors:**
- Verify `VITE_API_URL` in `.env` is correct
- Check if backend is running on port 8000
- Look for CORS errors in browser console

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation

- **SETUP_INSTRUCTIONS.md** - Detailed setup guide
- **INTEGRATION_SUMMARY.md** - Integration overview
- **backend/README.md** - Backend-specific documentation

## 🚢 Deployment

### Production Checklist

- [ ] Set up production PostgreSQL database
- [ ] Configure environment variables for production
- [ ] Build frontend for production: `npm run build`
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure SSL certificates
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Build for Production

```bash
# Frontend
npm run build

# Backend
# Use production ASGI server like Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

See LICENSE file for details.

## 🙏 Acknowledgments

Built for VSF Industrial Optimization System

## 📞 Support

For issues and questions:
- Check the documentation in `SETUP_INSTRUCTIONS.md`
- Review API docs at http://localhost:8000/docs
- Check logs: `tail -f backend.log` or `tail -f frontend.log`

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-15
