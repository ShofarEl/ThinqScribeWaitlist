#!/bin/bash
echo "Installing dependencies..."
npm install

echo "Making react-scripts executable..."
chmod +x ./node_modules/.bin/react-scripts

echo "Building project..."
CI=false GENERATE_SOURCEMAP=false npx react-scripts build 