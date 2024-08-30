// authRoutes.js
const express = require('express');
const router = express.Router();
const { login, currentUser, authMiddleware,verifyToken,login_officer } = require('../controllers/auth');

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: ล็อกอินผู้ใช้
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: ชื่อผู้ใช้
 *               password:
 *                 type: string
 *                 description: รหัสผ่าน
 *     responses:
 *       200:
 *         description: ล็อกอินสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token สำหรับการยืนยันตัวตน (หมดอายุใน 30 นาที)
 *                 payload:
 *                   type: object
 *                   description: ข้อมูลผู้ใช้
 *       400:
 *         description: ข้อมูลไม่ถูกต้องหรือไม่พบผู้ใช้
 *       403:
 *         description: บัญชีผู้ใช้ไม่ได้เปิดใช้งาน
 *       500:
 *         description: Server Error
 */
router.post('/api/v1/login', login);

router.post('/api/v1/login_officer', login_officer);


//login_officer
router.get('/api/v1/verify-token', verifyToken);








module.exports = router;