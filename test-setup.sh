#!/bin/bash

# VSF Optimization - Setup Verification Script
# This script checks if all components are properly set up

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        VSF Optimization - Setup Verification               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

ERRORS=0

# Check if Docker is installed
echo "🔍 Checking Docker..."
if command -v docker &> /dev/null; then
    echo "   ✅ Docker installed: $(docker --version)"
else
    echo "   ❌ Docker not found - Please install Docker"
    ERRORS=$((ERRORS+1))
fi

# Check if Docker Compose is installed
echo "🔍 Checking Docker Compose..."
if command -v docker-compose &> /dev/null; then
    echo "   ✅ Docker Compose installed: $(docker-compose --version)"
else
    echo "   ❌ Docker Compose not found - Please install Docker Compose"
    ERRORS=$((ERRORS+1))
fi

# Check if Python is installed
echo "🔍 Checking Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "   ✅ Python installed: $PYTHON_VERSION"
    
    # Check Python version (should be 3.9+)
    PYTHON_MAJOR=$(python3 -c 'import sys; print(sys.version_info.major)')
    PYTHON_MINOR=$(python3 -c 'import sys; print(sys.version_info.minor)')
    
    if [ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -ge 9 ]; then
        echo "   ✅ Python version is 3.9 or higher"
    else
        echo "   ⚠️  Python 3.9+ recommended, you have $PYTHON_VERSION"
    fi
else
    echo "   ❌ Python3 not found - Please install Python 3.9+"
    ERRORS=$((ERRORS+1))
fi

# Check if Node.js is installed
echo "🔍 Checking Node.js..."
if command -v node &> /dev/null; then
    echo "   ✅ Node.js installed: $(node --version)"
else
    echo "   ❌ Node.js not found - Please install Node.js 16+"
    ERRORS=$((ERRORS+1))
fi

# Check if npm is installed
echo "🔍 Checking npm..."
if command -v npm &> /dev/null; then
    echo "   ✅ npm installed: $(npm --version)"
else
    echo "   ❌ npm not found - Please install npm"
    ERRORS=$((ERRORS+1))
fi

# Check if backend directory exists
echo "🔍 Checking backend directory..."
if [ -d "backend" ]; then
    echo "   ✅ Backend directory exists"
    
    # Check if requirements.txt exists
    if [ -f "backend/requirements.txt" ]; then
        echo "   ✅ requirements.txt found"
    else
        echo "   ❌ requirements.txt not found"
        ERRORS=$((ERRORS+1))
    fi
    
    # Check if app directory exists
    if [ -d "backend/app" ]; then
        echo "   ✅ Backend app directory exists"
    else
        echo "   ❌ Backend app directory not found"
        ERRORS=$((ERRORS+1))
    fi
else
    echo "   ❌ Backend directory not found"
    ERRORS=$((ERRORS+1))
fi

# Check if frontend files exist
echo "🔍 Checking frontend files..."
if [ -f "package.json" ]; then
    echo "   ✅ package.json found"
else
    echo "   ❌ package.json not found"
    ERRORS=$((ERRORS+1))
fi

if [ -d "src" ]; then
    echo "   ✅ src directory exists"
else
    echo "   ❌ src directory not found"
    ERRORS=$((ERRORS+1))
fi

# Check if docker-compose.yml exists
echo "🔍 Checking Docker Compose configuration..."
if [ -f "docker-compose.yml" ]; then
    echo "   ✅ docker-compose.yml found"
else
    echo "   ❌ docker-compose.yml not found"
    ERRORS=$((ERRORS+1))
fi

# Check if environment files exist
echo "🔍 Checking environment files..."
if [ -f "backend/.env" ]; then
    echo "   ✅ backend/.env found"
else
    echo "   ⚠️  backend/.env not found (will be created from .env.example)"
fi

if [ -f ".env" ]; then
    echo "   ✅ frontend .env found"
else
    echo "   ⚠️  frontend .env not found (will be created from .env.example)"
fi

# Check if scripts are executable
echo "🔍 Checking scripts..."
if [ -x "start-all.sh" ]; then
    echo "   ✅ start-all.sh is executable"
else
    echo "   ⚠️  start-all.sh not executable (run: chmod +x start-all.sh)"
fi

if [ -x "stop-all.sh" ]; then
    echo "   ✅ stop-all.sh is executable"
else
    echo "   ⚠️  stop-all.sh not executable (run: chmod +x stop-all.sh)"
fi

echo ""
echo "════════════════════════════════════════════════════════════"

if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed! Your setup looks good."
    echo ""
    echo "Next steps:"
    echo "  1. Run: ./start-all.sh"
    echo "  2. Open: http://localhost:5173"
    echo "  3. Check API: http://localhost:8000/docs"
else
    echo "❌ Setup incomplete: $ERRORS error(s) found"
    echo ""
    echo "Please fix the errors above and run this script again."
    echo "See SETUP_INSTRUCTIONS.md for detailed setup guide."
fi

echo "════════════════════════════════════════════════════════════"
