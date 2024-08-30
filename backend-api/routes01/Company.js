const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {create_company,update_company,delete_company,list_company} = require("../controllers/company");


router.get("/api/v1/list_company",list_company);
/**
 * @swagger
 * /api/v1/list_company:
 *   get:
 *     summary: ข้อมูลบริษัท.
 *     tags: [Company]
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


router.post("/api/v1/create_company",create_company);
/**
 * @swagger
 * /api/v1/create_company:
 *   post:
 *     summary: Create a new menu
 *     tags: [Company]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - company_name
 *             properties:
 *               company_name:
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

router.put("/api/v1/update_company",update_company);
/**
 * @swagger
 * /api/v1/update_company:
 *   put:
 *     summary: Update menu
 *     tags: [Company]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - company_id
 *              - company_name
 *             properties:
 *               company_id:
 *                 type: integer
 *               company_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The update menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/company'
 *       500:
 *         description: Server error
 */

 router.delete('/api/v1/delete_company/:id', delete_company)
 /**
 * @swagger
 * /api/v1/delete_company/{id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [Company]
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

module.exports = router;