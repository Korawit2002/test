const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {meetings,create_meeting,update_meeting,updateMeeting,delete_meeting,list,detail_meeting,update_status_meeting,update_status_meetingtime,update_status_meeting_five,listmeeting_byuser,three_days_ago,three_days_later,oncoming,list_all} = require("../controllers/meeting");


router.get("/api/v1/list",list);
/**
 * @swagger
 * /api/v1/list:
 *   get:
 *     summary: Menu Items.
 *     tags: [Meeting]
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
router.get("/api/v1/list_all",list_all);

router.post("/api/v1/create_meeting",create_meeting);
/**
 * @swagger
 * /api/v1/create_meeting:
 *   post:
 *     summary: Create a new menu
 *     tags: [Meeting]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - type_id
 *              - meeting_name
 *              - meeting_date
 *              - time_start
 *              - time_end
 *              - company_id
 *             properties:
 *               type_id:
 *                 type: string
 *               meeting_name:
 *                 type: string
 *               meeting_date:
 *                 type: string
 *               time_start:
 *                 type: string
 *               time_end:
 *                 type: string
 *               meeting_room:
 *                 type: string
 *               location:
 *                 type: string
 *               note:
 *                 type: string
 *               conference:
 *                 type: string
 *               url_conference:
 *                 type: string
 *               company_id:
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

router.put("/api/v1/updateMeeting/",updateMeeting);
/**
 * @swagger
 * /api/v1/updateMeeting/:
 *   put:
 *     summary: Update an existing meeting
 *     tags: [Meeting]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - meeting_id
 *             properties:
 *               meeting_id:
 *                 type: integer
 *               type_id:
 *                 type: string
 *               meeting_name:
 *                 type: string
 *               meeting_date:
 *                 type: string
 *               time_start:
 *                 type: string
 *               time_end:
 *                 type: string
 *               meeting_room:
 *                 type: string
 *               location:
 *                 type: string
 *               note:
 *                 type: string
 *               conference:
 *                 type: string
 *               url_conference:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated meeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meeting_id:
 *                   type: string
 *       500:
 *         description: Server error
 */

router.put("/api/v1/update_meeting",update_meeting);
/**
 * @swagger
 * /api/v1/update_meeting:
 *   put:
 *     summary: Update menu
 *     tags: [Meeting]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - type_id
 *              - type_name
 *             properties:
 *               type_id:
 *                 type: integer
 *               type_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The update menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/menuitems'
 *       500:
 *         description: Server error
 */

 router.delete('/api/v1/delete_meeting/:meeting_id', delete_meeting)
 /**
 * @swagger
 * /api/v1/delete_meeting/{id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [Meeting]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
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

router.get('/api/v1/meetings/:id', meetings)
/**
* @swagger
* /api/v1/meetings/{id}:
*   get:
*     summary: show menu.
*     tags: [Meeting]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/

router.get('/api/v1/detail_meeting/:meeting_id', detail_meeting)
/**
* @swagger
* /api/v1/detail_meeting/{meeting_id}:
*   get:
*     summary: รายละเอียดการประชุม
*     tags: [Meeting]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: meeting_id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/
router.put("/api/v1/update_status_meeting",update_status_meeting);
router.put("/api/v1/update_status_meetingtime",update_status_meetingtime);
router.put("/api/v1/update_status_meeting_five",update_status_meeting_five);

// router.get("/api/v1/listmeeting_byuser/:user_id",listmeeting_byuser);

router.get('/api/v1/listmeeting_byuser/:user_id', listmeeting_byuser)
/**
* @swagger
* /api/v1/listmeeting_byuser/{user_id}:
*   get:
*     summary: listmeeting_byuser
*     tags: [Meeting]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: user_id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/




router.get("/api/v1/three_days_ago/:user_id",three_days_ago);
/**
* @swagger
* /api/v1/three_days_ago/{user_id}:
*   get:
*     summary: ย้อนหลังสามวัน
*     tags: [Meeting]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: user_id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/


router.get("/api/v1/three_days_later/:user_id",three_days_later);
/**
* @swagger
* /api/v1/three_days_later/{user_id}:
*   get:
*     summary: สามวันที่จะถึง
*     tags: [Meeting]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: user_id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/

oncoming
router.get("/api/v1/oncoming/:user_id",oncoming);
/**
* @swagger
* /api/v1/oncoming/{user_id}:
*   get:
*     summary: วันปัจจุบัน การประชุมเร็วๆนี้
*     tags: [Meeting]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: user_id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/
module.exports = router;