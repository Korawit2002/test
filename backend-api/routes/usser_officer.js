const express = require('express');
const router = express.Router();
const { addOfficer,create_tef_officer } = require('../controllers/usser_officer');
const { login_officer } = require('../controllers/auth');
/**
 * @swagger
 * /api/v1/addOfficer:
 *   post:
 *     summary:เพิ่มรหัสการใช้งานของผู้ใช้ officer
 *     tags: [Officers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - e_mail
 *               - password
 *               - name
 *               - type_id
 *               - status_user
 *             properties:
 *               username:
 *                 type: string
 *               e_mail:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               type_id:
 *                 type: string
 *                 format: uuid
 *               status_user:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       201:
 *         description: Officer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 officer:
 *                   $ref: '#/components/schemas/Officer'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/api/v1/addOfficer', addOfficer);

/**
 * @swagger
 * /api/v1/create_tef_officer:
 *   post:
 *     summary: สร้างข้อมูล TEF Officer ใหม่
 *     tags: [TEF Officers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emaill
 *             properties:
 *               user_type: 
 *                 type: string
 *               tef_rank:
 *                 type: string
 *               first_name_th:
 *                 type: string
 *               last_name_th:
 *                 type: string
 *               first_name_en:
 *                 type: string
 *               last_name_en:
 *                 type: string
 *               gender:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               emaill:
 *                 type: string
 *               address:
 *                 type: string
 *               subdistrict:
 *                 type: string
 *               district:
 *                 type: string
 *               province:
 *                 type: string
 *               postcode:
 *                 type: string
 *     responses:
 *       201:
 *         description: สร้าง TEF Officer สำเร็จ
 *       400:
 *         description: Email ซ้ำหรือข้อมูลไม่ถูกต้อง
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 */
router.post('/api/v1/create_tef_officer', create_tef_officer);

module.exports = router;