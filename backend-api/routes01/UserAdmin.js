const express = require("express");
const router = express.Router();

const {create_admin,update_admin,delete_admin,list_admin,details_admin,change_password_admin,list_admin_byid} = require("../controllers/user_admin");

router.get("/api/v1/details_admin", details_admin);
/**
 * @swagger
 * /api/v1/details_admin:
 *   get:
 *     summary: details user.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of Admin.
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
router.get("/api/v1/list_admin", list_admin);
/**
 * @swagger
 * /api/v1/list_admin:
 *   get:
 *     summary: ใช้สำหรับดึงข้อมูลรายชื่อผู้เข้าร่วมประชุม/องค์ประชุม.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of Admin.
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

router.post("/api/v1/create_admin",create_admin);
/**
 * @swagger
 * /api/v1/create_admin:
 *   post:
 *     summary: Create a new Admin
 *     tags: [Admin]
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
router.put("/api/v1/update_admin",update_admin);
/**
 * @swagger
 * /api/v1/update_admin:
 *   put:
 *     summary: Update menu
 *     tags: [Admin]
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

 router.delete('/api/v1/delete_admin/:admin_id', delete_admin)
 /**
 * @swagger
 * /api/v1/delete_admin/{admin_id}:
 *   delete:
 *     summary: Delete user.
 *     tags: [Admin]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: admin_id
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


router.get('/api/v1/list_admin_byid/:id', list_admin_byid)
/**
* @swagger
* /api/v1/list_admin_byid/{id}:
*   get:
*     summary: List User By Id.
*     tags: [Admin]
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


router.put("/api/v1/change_password_admin", change_password_admin);
/**
 * @swagger
 * /api/v1/change_password_admin:
 *   put:
 *     summary: Change a user's password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - admin_id
 *               - new_password
 *             properties:
 *               admin_id:
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

module.exports = router;