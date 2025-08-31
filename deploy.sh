#!/bin/bash
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh 'commit message'"
  exit 1
fi
echo "Deploying to production..."
git add .
git commit -m "$1"
git push
ssh dorsakel@92.119.124.79 "cd /home/dorsakel/dorsakel && ./deploy.sh"
