#!/bin/bash

# Git Push Script for Ayham Account
# IsBul-Job-Platform Repository

echo "=================================="
echo "Git Push - Ayham Account"
echo "Repository: IsBul-Job-Platform"
echo "=================================="
echo ""

# Configure git user
git config user.name "Ayham1najeb"
git config user.email "najebayham@gmail.com"

# Set remote URL to use SSH
git remote set-url origin git@github-ayham:Ayham1najeb/IsBul-Job-Platform.git

# Show current status
echo "Current changes:"
git status --short
echo ""

# Ask for commit message
echo "Enter commit message:"
read -r commit_message

# Check if message is empty
if [ -z "$commit_message" ]; then
    echo "❌ Commit message cannot be empty!"
    exit 1
fi

echo ""
echo "Adding all changes..."
git add .

echo "Creating commit..."
git commit -m "$commit_message"

echo ""
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Changes pushed successfully."
echo "Repository: https://github.com/Ayham1najeb/IsBul-Job-Platform"
