const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {search_quorum,create_quorum,update_quorum,delete_quorum,list_quorum,update_status_response,update_status_endorse,update_status_response1,updateQuorumOrder,update_status_response_root} = require("../controllers/quorum");


router.get("/api/v1/list_quorum",list_quorum);
/**
 * @swagger
 * /api/v1/list_quorum:
 *   get:
 *     summary: list.
 *     tags: [องค์ประชุม]
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


router.post("/api/v1/create_quorum",create_quorum);
/**
 * @swagger
 * /api/v1/create_quorum:
 *   post:
 *     summary: Create a new menu
 *     tags: [องค์ประชุม]
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
 *               position_id:
 *                 type: string
*               position_name:
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

// router.put("/api/v1/update_quorum",update_quorum);
// /**
//  * @swagger
//  * /api/v1/update_quorum:
//  *   put:
//  *     summary: Update menu
//  *     tags: [องค์ประชุม]
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

 router.delete('/api/v1/delete_quorum/:quorum_id', delete_quorum)
 /**
 * @swagger
 * /api/v1/delete_quorum/{quorum_id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [องค์ประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: quorum_id
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

router.get('/api/v1/search_quorum/:meeting_id', search_quorum)
/**
* @swagger
* /api/v1/search_quorum/{meeting_id}:
*   get:
*     summary: show menu.
*     tags: [องค์ประชุม]
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
router.put("/api/v1/update_status_response",update_status_response);
router.put("/api/v1/update_status_response_root",update_status_response_root);

router.put("/api/v1/update_status_response1",update_status_response1);


router.put("/api/v1/update_status_endorse",update_status_endorse);

router.post('/api/v1/update_quorum_order', updateQuorumOrder);

module.exports = router;