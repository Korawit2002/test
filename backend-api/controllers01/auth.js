//const crypto = require("crypto");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const secret = "Tlogical2023";
const datetime = require("node-datetime");
const users = require("../models/User");
const users_admin = require("../models/UserAdmin");

//const { token } = require('morgan')


exports.register = async (req, res) => {

 }

 exports.login = async (req, res) => {
    try {
        //code
        // 1. Check User
        const { email, password } = req.body
        //ตัวใหญ่หรือเล็กให้เป็นตัวเล็กให้หมด

       const email_new = email ? email.toLowerCase() : null;
       const status_login = 'Active';

    var user = await users.findOne({$or: [{email: email}, {email: email_new}]})
        if (user) {

            if (user.status_login !== 'Active') {
                // Deny login if status_login is not 'Active'
                return res.status(403)
                .send('ไม่พบข้อมูลผู้ใช้งาน');
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('รหัสผ่านไม่ถูกต้อง')
            }
            // 2. Payload
            var payload = {
                user: {
                    username: user.username,
                    user_id: user.user_id,
                    title:  user.title,
                    name:  user.firstname,
                    lastname: user.lastname,
                    email:  user.email,
                    company_id: user.company_id,
                    position_id : user.position_id,
                    role_id: user.role_id,
                    child_stucture_four_name:user.child_stucture_four_name,
                }
            }
            // 3. Generate
            //return jwt.sign(payload,tokenData["secret_key"],{"expiresIn":"8h"})
            jwt.sign(payload, 'jwtsecret', {"expiresIn":"8h"}, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
            
    


        } else {
            return res.status(400).send('ไม่พบข้อมูลผู้ใช้งาน')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}
 exports.currentUser = async (req, res) => {
    try{
       const user = await users.findOne({username:req.user.username})
       .select('-password')
       .exec();      
       // console.log("currentUser",user);

       res.send(user);

    } catch (err){
         console.log(err)
         res.status(500).send('Server Error')
         
    }
 }


 exports.login_admin = async (req, res) => {
    try {
        //code
        // 1. Check User
        const { email, password } = req.body
        //ตัวใหญ่หรือเล็กให้เป็นตัวเล็กให้หมด

       const email_new = email ? email.toLowerCase() : null;
       const status_login = 'Active';

    const query = {
        $and: [
            { status_login: status_login },
            {
                $or: [
                    { email: email },
                    { email: email_new }
                ]
            }
        ]
    };
    
    const user = await users_admin.findOne(query);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('รหัสผ่านไม่ถูกต้อง')
            }
            // 2. Payload
            var payload = {
                user: {
                    username: user.username,
                    admin_id: user.admin_id,
                    title:  user.title,
                    name:  user.firstname,
                    lastname: user.lastname,
                    email:  user.email,
                    company_id: user.company_id,
                    position_id : user.position_id,
                    child_stucture_four_name:user.child_stucture_four_name
                }
            }
            // 3. Generate
            //return jwt.sign(payload,tokenData["secret_key"],{"expiresIn":"8h"})
            jwt.sign(payload, 'jwtsecret', {"expiresIn":"8h"}, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
            
    


        } else {
            return res.status(400).send('ไม่พบข้อมูลผู้ใช้')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.currentAdmin = async (req, res) => {
    try{
       const user = await users_admin.findOne({username:req.user.username})
       .select('-password')
       .exec();      

       res.send(user);

    } catch (err){
         console.log(err)
         res.status(500).send('Server Error')
         
    }
 }
