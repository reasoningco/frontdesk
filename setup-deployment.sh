#!/bin/bash

# GitHub Actions Deployment Setup Helper Script

echo "GitHub Actions Deployment Setup"
echo "=================================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed."
    echo "   Install it with: brew install gh"
    echo "   Then run: gh auth login"
    echo ""
fi

echo "This script will help you set up automatic deployment."
echo ""
echo "You need to add these secrets to your GitHub repository:"
echo ""
echo "1. SSH_HOST - Your server IP or hostname"
echo "2. SSH_USERNAME - Your SSH username (probably 'root')"
echo "3. SSH_PRIVATE_KEY - Your SSH private key"
echo "4. SSH_PORT - Your SSH port (default: 22)"
echo ""

read -p "Do you want to continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
fi

echo ""
echo "Please provide the following information:"
echo ""

read -p "SSH Host (IP or hostname): " SSH_HOST
read -p "SSH Username [root]: " SSH_USERNAME
SSH_USERNAME=${SSH_USERNAME:-root}
read -p "SSH Port [22]: " SSH_PORT
SSH_PORT=${SSH_PORT:-22}

echo ""
echo "SSH Private Key:"
echo "   Using: ~/.ssh/id_rsa"
echo ""

if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Private key not found at ~/.ssh/id_rsa"
    echo "   Please specify the path to your private key:"
    read -p "Private key path: " KEY_PATH
else
    KEY_PATH=~/.ssh/id_rsa
fi

if [ ! -f "$KEY_PATH" ]; then
    echo "Private key not found at $KEY_PATH"
    exit 1
fi

echo ""
echo "Configuration:"
echo "   Host: $SSH_HOST"
echo "   Username: $SSH_USERNAME"
echo "   Port: $SSH_PORT"
echo "   Key: $KEY_PATH"
echo ""

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    read -p "Do you want to add these secrets to GitHub now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "Adding secrets to GitHub..."
        
        gh secret set SSH_HOST -b "$SSH_HOST"
        gh secret set SSH_USERNAME -b "$SSH_USERNAME"
        gh secret set SSH_PORT -b "$SSH_PORT"
        cat "$KEY_PATH" | gh secret set SSH_PRIVATE_KEY
        
        echo ""
        echo "Secrets added successfully!"
        echo ""
        echo "Setup complete! Push to main branch to trigger deployment."
    fi
else
    echo "Manual Setup Instructions:"
    echo ""
    echo "1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
    echo "2. Add these secrets:"
    echo ""
    echo "   SSH_HOST: $SSH_HOST"
    echo "   SSH_USERNAME: $SSH_USERNAME"
    echo "   SSH_PORT: $SSH_PORT"
    echo "   SSH_PRIVATE_KEY:"
    echo ""
    cat "$KEY_PATH"
    echo ""
fi

echo ""
echo "For more details, see DEPLOYMENT.md"
