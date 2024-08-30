const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = "Tlogical 2022";
const datetime = require("node-datetime");
const Partners = require("../models/Partners");
const connectEmail = require('../config/email');

// const nodemailer = require("nodemailer");
// const connectEmail = nodemailer.createTransport({
//     host: "smtp.office365.com", // hostname
//     secureConnection: false, // use SSL
//     port: 587, // port for secure SMTP
//     auth: {
//       user: "allsolution@tlogical.com",
//       pass: "IIcyl836",
//     },
//     tls: {
//       ciphers: "SSLv3",
//     },
//   });
exports.confirm_customer = async (req, res) => {
  const pseudo_code = req.params.id;
  const dt = datetime.create();
  const update_date = dt.format("Y-m-d H:M:S");
  const status_user = "ไม่อนุมัติ";

  const update_partners = await Partners.findOneAndUpdate(
    { pseudo_code: pseudo_code },
    { status_user: status_user,update_date:update_date },
    { new: true }
  );
    //console.log("update_partners",update_partners);
    const datashow = await Partners.find({pseudo_code:pseudo_code}).exec();
    const username = datashow[0].user_customer.username;
    

      var mailOptions = {
        from: "allsolution@tlogical.com",
        to: username,
        subject: "การสมัครเป็นคู่ค้าธุรกิจกับ BUMRUNGTHAI ถูกปฏิเสธ",
        text: "ขอบคุณที่สมัครเป็นคู่ค้าธุรกิจกับ BUMRUNGTHAI บัญชีของคุณถูกปฏิเสธ กรุณาทำการสมัครใหม่อีกครั้งที่  https://www.bumrungthai.com/ หรือโทร 02-000-0000 เพื่อสอบถามข้อมูลเพิ่มเติม",
        //text: "บัญชีของคุณได้รับการยืนยันแล้ว",
        // text: "โดยคุณสามารถเข้าสู่ระบบเพื่อทำการสั่งซื้อสินค้าได้ที",
        // text: "www.allsolution.kingmarinefoods.co.th"
      };
      connectEmail.sendMail(mailOptions, function (error, info) {
        if (error) {
             console.log(error);
             res.send(error);
        } else {
                  console.log("Email sent: " + info.response);
                  res.send('ok');
          }
     });

     
};