#!/bin/bash

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setup complete!"
echo "To run the Flask backend:"
echo "python main.py"
echo ""
echo "The API will be available at: http://localhost:5000"
echo ""
echo "Available endpoints:"
echo "- GET  /                 - Health check"
echo "- GET  /questions        - Get sorting questions"
echo "- POST /predict          - Predict house"
echo "- GET  /houses          - Get house information"
