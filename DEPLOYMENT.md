# Deployment Guide

## Server Information

- **VPS IP:** 77.37.62.110
- **User:** root
- **Deployment Path:** /home/asharifilab/htdocs/asharifilab.com/
- **Website URL:** https://asharifilab.com

## Prerequisites

- SSH access to the VPS
- SCP (Secure Copy) available on local machine
- Node.js and PM2 installed on the VPS
- All local changes committed and tested

## Deployment Steps

### 1. Transfer Files to VPS

Use SCP to copy updated files to the server:

```bash
scp -r views public routes app.js package.json root@77.37.62.110:/home/asharifilab/htdocs/asharifilab.com/
```

**Note:** Enter the root password when prompted.

### 2. Restart the Application

After file transfer completes, restart the Node.js application using PM2:

```bash
ssh root@77.37.62.110 "cd /home/asharifilab/htdocs/asharifilab.com && pm2 restart all"
```

Or restart only the asharifi-website process:

```bash
ssh root@77.37.62.110 "cd /home/asharifilab/htdocs/asharifilab.com && pm2 restart asharifi-website"
```

### 3. Verify Deployment

Visit https://asharifilab.com to verify the changes are live.

## Files Transferred

The SCP command transfers:
- **views/** - All EJS templates
- **public/** - CSS, JavaScript, images, videos, PDFs, logos
- **routes/** - Express routes
- **app.js** - Main application file
- **package.json** - Dependencies

## Installing Dependencies (if needed)

If package.json dependencies changed, install them on the server:

```bash
ssh root@77.37.62.110 "cd /home/asharifilab/htdocs/asharifilab.com && npm install"
```

Then restart:

```bash
ssh root@77.37.62.110 "cd /home/asharifilab/htdocs/asharifilab.com && pm2 restart asharifi-website"
```

## PM2 Commands Reference

View all running applications:
```bash
ssh root@77.37.62.110 "pm2 list"
```

View logs:
```bash
ssh root@77.37.62.110 "pm2 logs asharifi-website"
```

Stop the application:
```bash
ssh root@77.37.62.110 "pm2 stop asharifi-website"
```

Start the application:
```bash
ssh root@77.37.62.110 "pm2 start asharifi-website"
```

## Troubleshooting

**If the website doesn't load:**
1. Check PM2 status: `ssh root@77.37.62.110 "pm2 list"`
2. Check logs: `ssh root@77.37.62.110 "pm2 logs asharifi-website --lines 50"`
3. Verify file permissions: `ssh root@77.37.62.110 "ls -la /home/asharifilab/htdocs/asharifilab.com"`

**If files don't transfer:**
- Verify SSH connection: `ssh root@77.37.62.110 "pwd"`
- Check available disk space: `ssh root@77.37.62.110 "df -h"`

## Quick Deploy Script

For convenience, you can use this one-liner to deploy and restart:

```bash
scp -r views public routes app.js package.json root@77.37.62.110:/home/asharifilab/htdocs/asharifilab.com/ && ssh root@77.37.62.110 "cd /home/asharifilab/htdocs/asharifilab.com && pm2 restart asharifi-website"
```

## Notes

- The server runs multiple PM2 processes. Use `pm2 restart asharifi-website` to restart only the website.
- Large video files may take several minutes to transfer (typically 3-4 MB/s).
- Always test locally before deploying to production.
- The `node_modules` directory is not transferred via SCP. Run `npm install` on the server if dependencies change.

## Last Deployment

- **Date:** March 10, 2026
- **Changes:** Updated position to Postdoctoral Associate at Purdue University, compact professional design, university logos in timeline, reduced fonts across all pages
