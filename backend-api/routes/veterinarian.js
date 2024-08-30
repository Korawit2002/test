// routes/veterinarianRoutes.js
const express = require('express');
const router = express.Router();
const veterinarian = require('../controllers/veterinarian');
const upload = require('../middleware/vet_upload');
const { updateVetInfoAndSendEmail,update_Deny_SendEmail,searchVeterinarians,updatePassword,updateStatusRenew,approvalVetRenew } = require('../controllers/veterinarian');

router.post('/api/v1/send-approval-email', updateVetInfoAndSendEmail);

router.post('/api/v1/deny', update_Deny_SendEmail);

router.get('/api/v1/search', searchVeterinarians);

router.post('/api/v1/approvalVetRenew', approvalVetRenew);


// router.post('/api/v1/send-approval-email', send_approval_email);
//router.post('/approve', veterinarianController.updateVetInfoAndSendEmail);

/**
 * @swagger
 * /api/v1/veterinarians:
 *   post:
 *     summary: เพิ่มข้อมูลสัตวแพทย์
 *     tags: [การจัดการข้อมูลสัตวแพทย์]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               vet_id:
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
 *               email:
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
 *               vet_school:
 *                 type: string
 *               country:
 *                 type: string
 *               year_of_graduation:
 *                 type: string
 *               approve_status:
 *                 type: string
 *               vet_status:
 *                 type: string
 *               passport:
 *                 type: file
 *               photo:
 *                 type: file
 *               license:
 *                 type: file
 *     responses:
 *       201:
 *         description: สร้างข้อมูลสัตวแพทย์สำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน
 */
router.post("/api/v1/veterinarians", upload, veterinarian.createVeterinarian);

/**
 * @swagger
 * /api/v1/get_all_vet:
 *   get:
 *     summary: ดึงข้อมูลสัตวแพทย์ทั้งหมด
 *     tags: [การจัดการข้อมูลสัตวแพทย์]
 *     responses:
 *       200:
 *         description: สำเร็จในการดึงข้อมูลสัตวแพทย์
 *       400:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูลสัตวแพทย์
 */
router.get('/api/v1/get_all_vet', veterinarian.getAllVeterinarians);

/**
 * @swagger
 * /api/v1/get_vet_by_id/{id}:
 *   get:
 *     summary: ดึงข้อมูลสัตวแพทย์ตาม ID
 *     tags: [การจัดการข้อมูลสัตวแพทย์]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของสัตวแพทย์
 *     responses:
 *       200:
 *         description: สำเร็จในการดึงข้อมูลสัตวแพทย์
 *       400:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูลสัตวแพทย์
 *       404:
 *         description: ไม่พบข้อมูลสัตวแพทย์
 */
router.get('/api/v1/get_vet_by_id/:id', veterinarian.getVetById);

/**
 * @swagger
 * /api/v1/get_by_vet_id/{id}:
 *   get:
 *     summary: ดึงข้อมูลสัตวแพทย์ตาม VET_ID
 *     tags: [การจัดการข้อมูลสัตวแพทย์]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: VET_ID ของสัตวแพทย์ ตัวอย่าง VET0001,VET0002
 *     responses:
 *       200:
 *         description: สำเร็จในการดึงข้อมูลสัตวแพทย์
 *       400:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูลสัตวแพทย์
 *       404:
 *         description: ไม่พบข้อมูลสัตวแพทย์
 */
router.get('/api/v1/get_by_vet_id/:id', veterinarian.get_vet_by_vet_id);

/**
 * @swagger
 * /api/v1/update-password:
 *   post:
 *     summary: อัพเดตรหัสผ่านของสัตวแพทย์
 *     tags: [การจัดการข้อมูลสัตวแพทย์]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - vet_id
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: รหัสผ่านปัจจุบันของสัตวแพทย์
 *               newPassword:
 *                 type: string
 *                 description: รหัสผ่านใหม่ที่ต้องการตั้ง
 *               vet_id:
 *                 type: string
 *                 description: รหัสสัตวแพทย์ (VET_ID) ซึ่งใช้เป็น username ในการค้นหาผู้ใช้
 *     responses:
 *       200:
 *         description: อัพเดตรหัสผ่านสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง หรือรหัสผ่านเก่าไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Old password is incorrect
 *       404:
 *         description: ไม่พบผู้ใช้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating password
 */
router.post('/api/v1/update-password', updatePassword);



/**
 * @swagger
 * /api/v1/update_status_Renew:
 *   put:
 *     summary: อัพเดตสถานะการต่ออายุของสัตวแพทย์เป็น Active
 *     tags: [การจัดการข้อมูลสัตวแพทย์]
 *     description: อัพเดตฟิลด์ status_renew ของสัตวแพทย์เป็น "Active" โดยใช้ vet_id ในการค้นหา
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vet_id
 *             properties:
 *               vet_id:
 *                 type: string
 *                 description: รหัสประจำตัวสัตวแพทย์
 *     responses:
 *       200:
 *         description: อัพเดตสถานะสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Status updated successfully to Active
 *                 data:
 *                   type: object
 *                   properties:
 *                     vet_id:
 *                       type: string
 *                       example: VET123
 *                     status_renew:
 *                       type: string
 *                       example: Active
 *       404:
 *         description: ไม่พบข้อมูลสัตวแพทย์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Veterinarian not found
 *       500:
 *         description: เกิดข้อผิดพลาดในการอัพเดตสถานะ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating status
 */
router.put('/api/v1/update_status_Renew', updateStatusRenew);


module.exports = router;