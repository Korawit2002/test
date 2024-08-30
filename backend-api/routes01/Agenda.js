const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const 
{
    search_agenda,
    create_agenda,
    update_agenda,
    delete_agenda,
    list_agenda,
    listAgenda,
    search_sub_agenda,
    create_sub_agenda,
    update_sub_agenda,
    delete_sub_agenda,
    list_sub_agenda,
    list_sub_agenda_bymeeting,
    updateSubAgendaOrder,
    delete_subagenda,
    list_sub_agenda_one
} = require("../controllers/agenda");

//วาระหลัก

router.post("/api/v1/create_sub_agenda",create_sub_agenda);

router.get("/api/v1/list_agenda",list_agenda);
/**
 * @swagger
 * /api/v1/list_agenda:
 *   get:
 *     summary: list.
 *     tags: [การจัดการวาระการประชุม]
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


router.post("/api/v1/create_agenda",create_agenda);
/**
 * @swagger
 * /api/v1/create_agenda:
 *   post:
 *     summary: เพิ่มข้อมูลวาระหลัก
 *     tags: [การจัดการวาระการประชุม]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - meeting_id
 *              - main_agenda_name
 *              - secret
 *             properties:
 *               meeting_id:
 *                 type: string
 *               main_agenda_no:
 *                 type: string
 *               main_agenda_name:
 *                 type: string
 *               secret:
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

router.put("/api/v1/update_agenda",update_agenda);
/**
 * @swagger
 * /api/v1/update_agenda:
 *   put:
 *     summary: แก้ไขข้อมูลวาระหลัก 
 *     tags: [การจัดการวาระการประชุม]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - main_agenda_id
 *              - main_agenda_name
 *              - secret 
 *             properties:
 *               main_agenda_id:
 *                 type: integer
 *               main_agenda_no:
 *                 type: string
 *               main_agenda_name:
 *                 type: string
 *               secret:
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

router.delete('/api/v1/delete_agenda/:id', delete_agenda)
 /**
 * @swagger
 * /api/v1/delete_agenda/{id}:
 *   delete:
 *     summary: ลบข้อมูลวาระหลัก
 *     tags: [การจัดการวาระการประชุม]
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

router.get('/api/v1/search_agenda/:id', search_agenda)
 /**
 * @swagger
 * /api/v1/search_agenda/{id}:
 *   get:
 *     summary: search.
 *     tags: [การจัดการวาระการประชุม]
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

 router.get('/api/v1/listAgenda/:meeting_id', listAgenda)
 /**
 * @swagger
 * /api/v1/listAgenda/{meeting_id}:
 *   get:
 *     summary: โชว์ข้อมูลตาม หัวข้อวาระการประชุมหลัีก.
 *     tags: [การจัดการวาระการประชุม]
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
 *                     meeting_id:
 *                       type: integer
 *                       example: 1018
 */

 router.get('/api/v1/list_sub_agenda/:main_agenda_id', list_sub_agenda);
/**
 * @swagger
 * /api/v1/list_sub_agenda/{main_agenda_id}:
 *   get:
 *     summary: โชว์ข้อมูลตาม หัวข้อวาระการประชุมหลัีก.
 *     tags: [การจัดการวาระการประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: main_agenda_id
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
 *                     meeting_id:
 *                       type: integer
 *                       example: 1018
 */
router.get('/api/v1/list_sub_agenda_one/:main_agenda_id', list_sub_agenda_one);
/**
 * @swagger
 * /api/v1/list_sub_agenda_one/{main_agenda_id}:
 *   get:
 *     summary: list_sub_agenda_one.
 *     tags: [การจัดการวาระการประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: main_agenda_id
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
 *                     meeting_id:
 *                       type: integer
 *                       example: 1018
 */

router.get('/api/v1/list_sub_agenda_bymeeting/:meeting_id', list_sub_agenda_bymeeting);
/**
 * @swagger
 * /api/v1/list_sub_agenda_bymeeting/{meeting_id}:
 *   get:
 *     summary: โชว์ข้อมูลตาม หัวข้อวาระการประชุมหลัีก.
 *     tags: [การจัดการวาระการประชุม]
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
 *                     meeting_id:
 *                       type: integer
 *                       example: 1018
 */
 
router.post('/api/v1/updateSubAgendaOrder', updateSubAgendaOrder);

router.delete('/api/v1/delete_subagenda/:id', delete_subagenda);
/**
 * @swagger
 * /api/v1/delete_subagenda/{id}:
 *   delete:
 *     summary: ลบข้อมูลวาระหลัก
 *     tags: [การจัดการวาระการประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
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
 *                     id:
 *                       type: integer
 *                       example: 1018
*/

module.exports = router;