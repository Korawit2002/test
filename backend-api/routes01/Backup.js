const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backup');

// POST request to /api/backup
router.post('/api/v1/backup', (req, res) => {
    // backupController.backupMongoDB();
    // res.json({ message: "Backup initiated successfully"});
    backupController.backupMongoDB((error) => {
        if (error) {
            console.error('Backup failed:', error.message);
            res.status(500).json({ success: false, message: 'Backup failed', error: error.message });
        } else {
            console.log('Backup initiated successfully');
            res.status(200).json({ success: true, message: 'Backup initiated successfully' });
        }
    });
});

// router.post("/api/v1/backup",createBackup);
/**
 * @swagger
 * /api/v1/backup:
 *   post:
 *     summary: Create a backup
 *     description: Request to create a system backup
 *     responses:
 *       200:
 *         description: Backup created successfully
 *       500:
 *         description: Error creating backup
 */
// router.post('/backup', createBackup);

module.exports = router;