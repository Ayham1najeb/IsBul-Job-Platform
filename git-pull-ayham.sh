#!/bin/bash

# Git Pull Script for Ayham Account
# IsBul-Job-Platform Repository

echo "=================================="
echo "Git Pull - Ayham Account"
echo "Repository: IsBul-Job-Platform"
echo "=================================="
echo ""

# Configure git user
git config user.name "Ayham1najeb"
git config user.email "najebayham@gmail.com"

# Set remote URL to use SSH
git remote set-url origin git@github-ayham:Ayham1najeb/IsBul-Job-Platform.git

# Show current branch
echo "Current branch:"
git branch --show-current
echo ""

# Fetch latest changes from remote
echo "Fetching latest changes from GitHub..."
git fetch origin

# Show status
echo ""
echo "Current status:"
git status
echo ""

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Warning: You have uncommitted changes!"
    echo "Do you want to stash them before pulling? (y/n)"
    read -r stash_choice
    
    if [ "$stash_choice" = "y" ]; then
        echo "Stashing changes..."
        git stash
        echo "✅ Changes stashed"
    fi
fi

# Pull latest changes
echo ""
echo "Pulling latest changes..."
git pull origin main

# Show if stash exists
if git stash list | grep -q "stash@"; then
    echo ""
    echo "📦 You have stashed changes. To restore them, run:"
    echo "   git stash pop"
fi

echo ""
echo "✅ Done! Repository updated to latest version."
echo "Repository: https://github.com/Ayham1najeb/IsBul-Job-Platform"
