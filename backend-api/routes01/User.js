const express = require("express");
const router = express.Router();

const {create_user,update_user,delete_user,list_user,details_user,list_user_currentquorums,list_user_quorum,meeting_organizer, change_password,list_user_byid,create_user_new} = require("../controllers/user");

router.get("/api/v1/details_user", details_user);
/**
 * @swagger
 * /api/v1/details_user:
 *   get:
 *     summary: details user.
 *     tags: [Users]
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
router.get("/api/v1/list_user", list_user);
/**
 * @swagger
 * /api/v1/list_user:
 *   get:
 *     summary: ใช้สำหรับดึงข้อมูลรายชื่อผู้เข้าร่วมประชุม/องค์ประชุม.
 *     tags: [Users]
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

router.post("/api/v1/create_user",create_user);
/**
 * @swagger
 * /api/v1/create_user:
 *   post:
 *     summary: Create a new users
 *     tags: [Users]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title
 *              - firstname
 *              - lastname
 *              - email
 *              - main_stucture_id
 *              - username
 *              - company_id
 *              - position_meeting
 *              - role_id
 *             properties:
 *               title:
 *                 type: string
 *               firstname:
 *                  type: string
 *               lastname:
 *                 type: string
 *               email:
 *                  type: string
 *               main_stucture_id:
 *                 type: string
 *               main_stucture_name:
 *                 type: string 
 *               sub_stucture_id:
 *                  type: string
 *               sub_stucture_name:
 *                  type: string 
 *               child_stucture_id:
 *                  type: string
 *               child_stucture_name:
 *                  type: string
 *               child_stucture_four_id:
 *                  type: string
 *               child_stucture_four_name:
 *                  type: string
 *               username:
 *                  type : string
 *               company_id:
 *                  type : string 
 *               position_meeting:
 *                  type : string 
 *               position_meeting_name:
 *                  type : string
 *               role_id:
 *                  type : string 
 *     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/user'
 *       500:
 *         description: Server error
 */
router.put("/api/v1/update_user",update_user);
/**
 * @swagger
 * /api/v1/update_user:
 *   put:
 *     summary: Update menu
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - menu_id
 *              - title
 *             properties:
 *               menu_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               meta_title:
 *                 type: string
 *               meta_description:
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

 router.delete('/api/v1/delete_user/:user_id', delete_user)
 /**
 * @swagger
 * /api/v1/delete_user/{user_id}:
 *   delete:
 *     summary: Delete user.
 *     tags: [Users]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: รหัส
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


router.get('/api/v1/list_user_byid/:id', list_user_byid)
/**
* @swagger
* /api/v1/list_user_byid/{id}:
*   get:
*     summary: List User By Id.
*     tags: [Users]
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


router.post("/api/v1/list_user_currentquorums",list_user_currentquorums);
/**
 * @swagger
 * /api/v1/list_user_currentquorums:
 *   post:
 *     summary: ใช้สำหรับองค์ประชุมปัจจุบัน
 *     tags: [Users]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/user'
 *       500:
 *         description: Server error
 */


router.post("/api/v1/list_user_quorum",list_user_quorum);
/**
 * @swagger
 * /api/v1/list_user_quorum:
 *   post:
 *     summary: ใช้สำหรับรายชื่อองค์ประชุม
 *     tags: [Users]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/user'
 *       500:
 *         description: Server error
 */

//meeting_organizer ผู้จัดการประชุม


router.get("/api/v1/meeting_organizer", meeting_organizer);
/**
 * @swagger
 * /api/v1/meeting_organizer:
 *   get:
 *     summary: meeting organizer ข้อมูลผู้จัดการประชุม.
 *     tags: [Users]
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

router.put("/api/v1/change_password", change_password);
/**
 * @swagger
 * /api/v1/change_password:
 *   put:
 *     summary: Change a user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - new_password
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user whose password is to be changed.
 *               new_password:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request - missing parameters
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.post("/api/v1/create_user_new",create_user_new);


module.exports = router;