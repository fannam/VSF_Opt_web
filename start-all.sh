#!/bin/bash

# VSF Optimization - Complete System Startup Script
# This script starts PostgreSQL, Backend, and Frontend

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     VSF Optimization System - Complete Startup             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Start PostgreSQL
echo "1️⃣  Starting PostgreSQL database..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check PostgreSQL health
until docker-compose exec -T postgres pg_isready -U user -d vsf_optimization &> /dev/null; do
    echo "   Waiting for PostgreSQL..."
    sleep 2
done
echo "✅ PostgreSQL is ready!"
echo ""

# Setup and start backend
echo "2️⃣  Setting up FastAPI backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "   Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "   Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "   Creating .env file..."
    cp .env.example .env
fi

# Initialize database
echo "   Initializing database with sample data..."
python -m app.init_db

echo "✅ Backend setup complete!"
echo ""

# Start backend in background
echo "3️⃣  Starting FastAPI backend server..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

# Go back to root directory
cd ..

# Setup and start frontend
echo "4️⃣  Setting up React frontend..."

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "   Creating .env file..."
    cp .env.example .env
fi

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "   Installing Node.js dependencies..."
    npm install
fi

echo "✅ Frontend setup complete!"
echo ""

# Start frontend
echo "5️⃣  Starting React development server..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

# Wait a moment for services to start
sleep 3

# Display status
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    🎉 ALL SERVICES RUNNING!                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Services Status:"
echo "   ✅ PostgreSQL:  docker-compose ps"
echo "   ✅ Backend:     http://localhost:8000"
echo "   ✅ Frontend:    http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "   • API Docs:     http://localhost:8000/docs"
echo "   • ReDoc:        http://localhost:8000/redoc"
echo ""
echo "📝 Logs:"
echo "   • Backend:      tail -f backend.log"
echo "   • Frontend:     tail -f frontend.log"
echo "   • PostgreSQL:   docker-compose logs -f postgres"
echo ""
echo "🛑 To stop all services:"
echo "   • Frontend:     kill $FRONTEND_PID"
echo "   • Backend:      kill $BACKEND_PID"
echo "   • PostgreSQL:   docker-compose down"
echo ""
echo "💡 Press Ctrl+C to stop monitoring..."
echo ""

# Save PIDs to file for easy cleanup
echo "BACKEND_PID=$BACKEND_PID" > .pids
echo "FRONTEND_PID=$FRONTEND_PID" >> .pids

# Monitor logs (Ctrl+C to exit)
trap "echo ''; echo '⚠️  Monitoring stopped. Services still running.'; echo 'Run ./stop-all.sh to stop all services.'; exit 0" INT

echo "📊 Monitoring backend logs (Ctrl+C to stop monitoring)..."
tail -f backend.log
