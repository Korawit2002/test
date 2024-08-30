const express = require('express');
const router = express.Router();

const { createNotification ,getUserNotifications,updateNotificationStatus} = require('../controllers/notification')


router.put('/api/v1/updateNotificationStatus/:notificationId/status', updateNotificationStatus);

/**
 * @swagger
 * /api/v1/createNotification:
 *   post:
 *     summary: สร้างการแจ้งเตือนใหม่
 *     tags: [การจัดการการแจ้งเตือน]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [membership_expiry, id_expiry, license_expiry]
 *                 description: ประเภทของการแจ้งเตือน
 *               title:
 *                 type: object
 *                 required:
 *                   - th
 *                   - en
 *                 properties:
 *                   th:
 *                     type: string
 *                     description: หัวข้อการแจ้งเตือนภาษาไทย
 *                   en:
 *                     type: string
 *                     description: หัวข้อการแจ้งเตือนภาษาอังกฤษ
 *               message:
 *                 type: object
 *                 required:
 *                   - th
 *                   - en
 *                 properties:
 *                   th:
 *                     type: string
 *                     description: ข้อความแจ้งเตือนภาษาไทย
 *                   en:
 *                     type: string
 *                     description: ข้อความแจ้งเตือนภาษาอังกฤษ
 *               documentType:
 *                 type: string
 *                 description: ประเภทของเอกสารที่เกี่ยวข้องกับการแจ้งเตือน
 *     responses:
 *       201:
 *         description: สร้างการแจ้งเตือนสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID ของการแจ้งเตือนที่สร้างขึ้น
 *                     type:
 *                       type: string
 *                       description: ประเภทของการแจ้งเตือน
 *                     title:
 *                       type: object
 *                       properties:
 *                         th: 
 *                           type: string
 *                         en:
 *                           type: string
 *                     message:
 *                       type: object
 *                       properties:
 *                         th:
 *                           type: string
 *                         en:
 *                           type: string
 *                     documentType:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: ข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: รายละเอียดข้อผิดพลาด
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: รายละเอียดข้อผิดพลาด
 */
router.post('/api/v1/createNotification',createNotification);



/**
 * @swagger
 * /api/v1/getUserNotifications:
 *   get:
 *     summary: ดึงข้อมูลการแจ้งเตือนของผู้ใช้
 *     tags: [การจัดการการแจ้งเตือน]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: ชื่อผู้ใช้
 *       - in: query
 *         name: notificationId
 *         schema:
 *           type: string
 *         description: ID ของการแจ้งเตือน (ไม่บังคับ)
 *       - in: query
 *         name: notificationType
 *         schema:
 *           type: string
 *         description: ประเภทของการแจ้งเตือน (ไม่บังคับ)
 *     responses:
 *       200:
 *         description: ดึงข้อมูลการแจ้งเตือนสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID ของ UserNotification
 *                       user_id:
 *                         type: string
 *                         description: ID ของผู้ใช้
 *                       username:
 *                         type: string
 *                         description: ชื่อผู้ใช้
 *                       notification_id:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: ID ของ Notification
 *                           type:
 *                             type: string
 *                             description: ประเภทของการแจ้งเตือน
 *                           title:
 *                             type: object
 *                             properties:
 *                               th:
 *                                 type: string
 *                                 description: หัวข้อภาษาไทย
 *                               en:
 *                                 type: string
 *                                 description: หัวข้อภาษาอังกฤษ
 *                           message:
 *                             type: object
 *                             properties:
 *                               th:
 *                                 type: string
 *                                 description: ข้อความภาษาไทย
 *                               en:
 *                                 type: string
 *                                 description: ข้อความภาษาอังกฤษ
 *                           documentType:
 *                             type: string
 *                             description: ประเภทของเอกสาร
 *                       type:
 *                         type: string
 *                         description: ประเภทของการแจ้งเตือน
 *                       is_read:
 *                         type: boolean
 *                         description: สถานะการอ่าน
 *                       read_at:
 *                         type: string
 *                         format: date-time
 *                         description: เวลาที่อ่าน
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: เวลาที่สร้าง
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: เวลาที่อัปเดตล่าสุด
 *             example:
 *               success: true
 *               data:
 *                 - _id: "60d5ecb54b24e1234567890a"
 *                   user_id: "60d5ecb54b24e1234567890b"
 *                   username: "VET0007"
 *                   notification_id:
 *                     _id: "60d5ecb54b24e1234567890c"
 *                     type: "membership_expiry"
 *                     title:
 *                       th: "แจ้งเตือนการหมดอายุสมาชิก"
 *                       en: "Membership Expiry Notification"
 *                     message:
 *                       th: "สมาชิกของคุณกำลังจะหมดอายุในอีก 30 วัน"
 *                       en: "Your membership will expire in 30 days"
 *                     documentType: "Membership"
 *                   type: "membership_expiry"
 *                   is_read: false
 *                   read_at: null
 *                   created_at: "2023-08-23T12:00:00.000Z"
 *                   updated_at: "2023-08-23T12:00:00.000Z"
 *       400:
 *         description: ข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: รายละเอียดข้อผิดพลาด
 *             example:
 *               success: false
 *               message: "Username is required"
 *       404:
 *         description: ไม่พบผู้ใช้หรือการแจ้งเตือน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: รายละเอียดข้อผิดพลาด
 *             example:
 *               success: false
 *               message: "User not found"
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: รายละเอียดข้อผิดพลาด
 *             example:
 *               success: false
 *               message: "Internal server error"
 */
router.get('/api/v1/getUserNotifications', getUserNotifications);




module.exports = router;