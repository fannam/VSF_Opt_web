#!/bin/bash

# VSF Optimization - Stop All Services Script

echo "🛑 Stopping all VSF Optimization services..."
echo ""

# Read PIDs from file if it exists
if [ -f ".pids" ]; then
    source .pids
    
    # Stop frontend
    if [ ! -z "$FRONTEND_PID" ]; then
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            echo "   Stopping frontend (PID: $FRONTEND_PID)..."
            kill $FRONTEND_PID 2>/dev/null || true
        fi
    fi
    
    # Stop backend
    if [ ! -z "$BACKEND_PID" ]; then
        if kill -0 $BACKEND_PID 2>/dev/null; then
            echo "   Stopping backend (PID: $BACKEND_PID)..."
            kill $BACKEND_PID 2>/dev/null || true
        fi
    fi
    
    rm .pids
else
    # Try to find and kill processes by port
    echo "   Stopping frontend (port 5173)..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null || true
    
    echo "   Stopping backend (port 8000)..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null || true
fi

# Stop PostgreSQL
echo "   Stopping PostgreSQL..."
docker-compose down

echo ""
echo "✅ All services stopped!"
echo ""
echo "💡 To start again, run: ./start-all.sh"
