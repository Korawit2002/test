const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const cron = require('node-cron');
const express = require('express');
const router = express.Router();

// Define the backup controller
const backupController = {};

// Environment variables for database name
const DB_NAME = process.env.DB_NAME;

// Generate a date string for the directory name
function getDateString() {
    const now = new Date();
    return now.toISOString().slice(0, 10); // Formats the date as "YYYY-MM-DD"
}

// Path to the 'public' directory that should be included in the backup
const PUBLIC_DIR = path.join(__dirname, '../public');

// Function to perform MongoDB backup
async function backupMongoDB() {
    const dateString = getDateString();
    const backupBaseDir = path.join(os.homedir(), 'Documents', 'backup-emeeting', `backup-${dateString}`);
    const backupMongoDir = path.join(backupBaseDir, 'db'); // Directory for MongoDB dump
    const backupPublicDir = path.join(backupBaseDir, 'public'); // Directory for public folder

    // Ensure the backup directories exist
    fs.ensureDirSync(backupMongoDir);
    fs.ensureDirSync(backupPublicDir);

    console.log(`Initiating backup for database: ${DB_NAME} to directory: ${backupMongoDir}`);

    try {
        await performBackup(backupMongoDir);
        console.log(`MongoDB backup completed successfully.`);
        console.log(`Copying entire public directory to: ${backupPublicDir}`);
        await fs.copy(PUBLIC_DIR, backupPublicDir, { overwrite: true });
        console.log(`Public directory copied successfully to: ${backupPublicDir} on date: ${dateString}.`);
    } catch (error) {
        console.error(`Backup failed: ${error.message}`);
    }
}

function performBackup(backupDir) {
    return new Promise((resolve, reject) => {
        const child = spawn('mongodump', [
            `--db=${DB_NAME}`,
            '--gzip',
            '-o',
            backupDir
        ]);

        child.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Backup process failed with code ${code}`));
            }
        });

        child.on('error', reject);
    });
}

// Schedule backups to run daily at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running a daily backup at midnight');
    await backupMongoDB();
}, {
    scheduled: true,
    timezone: "Asia/Bangkok"
});

// Export the controller as needed
module.exports = backupController;