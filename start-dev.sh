#!/bin/bash
echo "🚀 Starting Dorsakel Development Environment"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready &> /dev/null; then
    echo "🔄 Starting PostgreSQL..."
    brew services start postgresql@15
fi

# Check if Redis is running
if ! redis-cli ping &> /dev/null; then
    echo "🔄 Starting Redis..."
    brew services start redis
fi

echo "✅ All services are running"
echo "🔄 Starting development servers..."

# Run both frontend and backend
npm run dev
