# Deployment Setup Guide

This repository uses GitHub Actions for automatic deployment to your server.

## Already Configured

The CI/CD pipeline is already set up and ready to use! Just push to `master` branch.

## How It Works

When you push to the `master` branch:
1. GitHub Actions connects to your server via SSH
2. Pulls the latest code from the repository
3. Installs/updates npm dependencies
4. Restarts the PM2 process

## Monitoring

To check deployment status:
- **GitHub**: Go to the Actions tab in your repository
- **Server**: Run `pm2 logs elevenlabs-proxy`

## Quick Commands

```bash
# Check PM2 status
pm2 list

# View logs
pm2 logs elevenlabs-proxy

# Manual restart
pm2 restart elevenlabs-proxy

# Save PM2 config
pm2 save
```

## Troubleshooting

If deployment fails:
1. Check GitHub Actions logs in the Actions tab
2. SSH into server and check: `cd ~/elevenlabs-proxy-server && git status`
3. Check PM2 logs: `pm2 logs elevenlabs-proxy --err`
4. Verify server has enough memory: `free -h`

## Manual Deployment

If you need to deploy manually:

```bash
ssh ps "cd ~/elevenlabs-proxy-server && git pull && npm install && pm2 restart elevenlabs-proxy"
```
