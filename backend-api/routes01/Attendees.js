const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {search_attendees,create_attendees,update_attendees,delete_attendees,list_attendees,attendees_by_meeting,attendees_meeting,attendees_meeting_all,updateAttendeeOrder,attendees_by_meeting_new,update_attendees_by_meeting_new,attendees_by_meeting_approved,update_attendees_meeting_approved} = require("../controllers/attendees");



router.get("/api/v1/list_attendees",list_attendees);
/**
 * @swagger
 * /api/v1/list_attendees:
 *   get:
 *     summary: list.
 *     tags: [ผู้เข้าร่วมประชุม]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 10
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       name_en:
 *                         type: string
 *                         example: 
 *                       name_th:
 *                         type: string
 *                         example: กรุงเทพมหานคร
 */


router.post("/api/v1/create_attendees",create_attendees);
/**
 * @swagger
 * /api/v1/create_attendees:
 *   post:
 *     summary: Create a new menu
 *     tags: [ผู้เข้าร่วมประชุม]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meeting_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               title:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               main_stucture:
 *                 type: string
 *               sub_stucture:
 *                 type: string
 *               child_stucture:
 *                 type: string
 *               email:
 *                 type: string
*     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/menuitems'
 *       500:
 *         description: Server error
 */

// router.put("/api/v1/update_attendees",update_attendees);
// /**
//  * @swagger
//  * /api/v1/update_attendees:
//  *   put:
//  *     summary: Update menu
//  *     tags: [ผู้เข้าร่วมประชุม]
//  *     requestBody:
//  *       required: flse
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *              - type_id
//  *              - type_name
//  *             properties:
//  *               type_id:
//  *                 type: integer
//  *               type_name:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: The update menu
//  *         content:
//  *           application/json:
//  *             schema:
//  *              # $ref: '#/components/schemas/menuitems'
//  *       500:
//  *         description: Server error
//  */

 router.delete('/api/v1/delete_attendees/:attendees_id', delete_attendees)
 /**
 * @swagger
 * /api/v1/delete_attendees/{attendees_id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [ผู้เข้าร่วมประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: attendees_id
 *         required: true
 *         description: รหัสเมนู
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1018
*/

router.get('/api/v1/search_attendees/:meeting_id', search_attendees)
/**
* @swagger
* /api/v1/search_attendees/{meeting_id}:
*   get:
*     summary: show menu.
*     tags: [ผู้เข้าร่วมประชุม]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: meeting_id
*         required: true
*         description: รหัสเมนู
*         schema:
*           type: string
*     responses:
*       200:
*         description: A single user.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     menu_id:
*                       type: integer
*                       example: 1018
*/


router.get('/api/v1/attendees_by_meeting/:meeting_id', attendees_by_meeting)
/**
* @swagger
* /api/v1/attendees_by_meeting/{meeting_id}:
*   get:
*     summary: ผู้เข้ารวมประชุมทั้งหมดดึงรายชื่อองค์ประชุมและรายชื่อผู้เข้าร่วมประชุม.
*     tags: [ผู้เข้าร่วมประชุม]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: meeting_id
*         required: true
*         description: รหัสเมนู
*         schema:
*           type: string
*     responses:
*       200:
*         description: A single user.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     menu_id:
*                       type: integer
*                       example: 1018
*/


router.post("/api/v1/attendees_meeting",attendees_meeting);
/**
 * @swagger
 * /api/v1/attendees_meeting:
 *   post:
 *     summary: attendees by meeting
 *     tags: [ผู้เข้าร่วมประชุม]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meeting_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               title:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               main_stucture:
 *                 type: string
 *               sub_stucture:
 *                 type: string
 *               child_stucture:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/menuitems'
 *       500:
 *         description: Server error
 */

router.get('/api/v1/attendees_meeting_all/:meeting_id', attendees_meeting_all);
router.get('/api/v1/attendees_by_meeting_new/:meeting_id', attendees_by_meeting_new);
router.post('/api/v1/update_attendee_order', updateAttendeeOrder);
router.post('/api/v1/update_attendees_by_meeting_new', update_attendees_by_meeting_new);
router.get('/api/v1/attendees_by_meeting_approved/:meeting_id', attendees_by_meeting_approved);
router.post('/api/v1/update_attendees_meeting_approved', update_attendees_meeting_approved);

module.exports = router;