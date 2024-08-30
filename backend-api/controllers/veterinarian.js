
const Veterinarian = require('../models/veterinarian');
const { PassportVet, PhotoVet, LicenseVet } = require('../models/veterinarian_upload');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const connectEmail = require("../config/email");
const User = require('../models/user');
const resetTokens = {};
const cron = require('node-cron');
const URL = process.env.STAFF_API_URL;
const { C_User_Notifications_welcome } = require('./notification');



exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, vet_id } = req.body;
    console.log('Received request:', { vet_id, oldPassword: oldPassword, newPassword: newPassword });

    // ใช้ vet_id เป็น username ในการค้นหา user
    const user = await User.findOne({ username: vet_id });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Old password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    console.log('New password hashed');

    user.password = hashedNewPassword;
    await user.save();
    console.log('User saved');

    res.status(200).json({ status: 'success', message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while updating password' });
  }
};
exports.createVeterinarian = async (req, res) => {
  try {
    // สร้างอ็อบเจ็กต์ Veterinarian ใหม่
    const newVet = new Veterinarian(req.body);

    // บันทึกข้อมูลสัตวแพทย์
    await newVet.save();
    console.log(newVet._id)

    // อาร์เรย์สำหรับเก็บ promises ของการบันทึกไฟล์
    const fileUploadPromises = [];

    // จัดการกับการอัปโหลดไฟล์ (ถ้ามี)
    if (req.files) {
      if (req.files.passport) {
        const passportVet = new PassportVet({
          filename: req.files.passport[0].filename,
          filepath: req.files.passport[0].path,
          refprimary_id: newVet._id
        });
        fileUploadPromises.push(passportVet.save());
      }
      if (req.files.photo) {
        const photoVet = new PhotoVet({
          filename: req.files.photo[0].filename,
          filepath: req.files.photo[0].path,
          refprimary_id: newVet._id
        });
        fileUploadPromises.push(photoVet.save());
      }
      if (req.files.license) {
        const licenseVet = new LicenseVet({
          filename: req.files.license[0].filename,
          filepath: req.files.license[0].path,
          refprimary_id: newVet._id
        });
        fileUploadPromises.push(licenseVet.save());
      }
    }

    // รอให้การบันทึกไฟล์ทั้งหมดเสร็จสิ้น
    await Promise.all(fileUploadPromises);

    // ส่งการตอบกลับ
    res.status(201).json({ 
      message: 'Veterinarian created successfully', 
      vet: newVet,
      filesUploaded: req.files ? Object.keys(req.files).length : 0
    });

  } catch (error) {
    console.error('Error in createVeterinarian:', error);
    
    // ตรวจสอบประเภทของข้อผิดพลาดและส่งการตอบกลับที่เหมาะสม
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', error: error.message });
    }
    
    res.status(500).json({ message: 'Error creating veterinarian', error: error.message });
  }
};
exports.getAllVeterinarians = async (req, res) => {
  try {
    const { search, startDate, endDate } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { vet_id: { $regex: search, $options: 'i' } },
          { first_name_th: { $regex: search, $options: 'i' } },
          { last_name_th: { $regex: search, $options: 'i' } },
          { approve_status: { $regex: search, $options: 'i' } },
          { vet_status: { $regex: search, $options: 'i' } }
        ]
      };
    }

    if (startDate && endDate) {
      query.created_at = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const vets = await Veterinarian.find(query).sort({ updated_at: -1 });//
    res.status(200).json(vets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching veterinarians', error: error.message });
  }
};
exports.getVetById = async (req, res) => {
  try {
    const { id } = req.params;
    const vet = await Veterinarian.findById(id);
    
    if (!vet) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลสัตวแพทย์' });
    }
    
    const license = await LicenseVet.findOne({ refprimary_id: id });
    const passport = await PassportVet.findOne({ refprimary_id: id });
    const photo = await PhotoVet.findOne({ refprimary_id: id });
    
    const vetData = {
      ...vet.toObject(),
      license,
      passport,
      photo
    };
    
    res.status(200).json(vetData);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Error fetching veterinarian', 
        error: `Cast to ObjectId failed for value "${req.params.id}" (type string) at path "_id" for model "veterinarian"`
      });
    }
    res.status(400).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสัตวแพทย์', error: error.message });
  }
};
exports.get_vet_by_vet_id = async (req, res) => {
  try {
    const { id } = req.params;
    const vet = await Veterinarian.findOne({ vet_id: id });
    
    if (!vet) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลสัตวแพทย์' });
    }
    
    const license = await LicenseVet.findOne({ refprimary_id: vet._id });
    const passport = await PassportVet.findOne({ refprimary_id: vet._id });
    const photo = await PhotoVet.findOne({ refprimary_id: vet._id });
    
    const vetData = {
      ...vet.toObject(),
      license,
      passport,
      photo
    };
    
    res.status(200).json(vetData);
  } catch (error) {
    res.status(400).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสัตวแพทย์', error: error.message });
  }
};

exports.updateVetInfoAndSendEmail = async (req, res) => {
  try {
    const { id, email, username, applicationDate } = req.body;
    console.log("Updating vet with ID:", id);

    const vets = await Veterinarian.find({ vet_id: { $exists: true } }).sort({ created_at: -1 });

    // if (vets.length === 0) {
    //   return res.status(404).json({ message: "ไม่พบข้อมูลสัตวแพทย์ที่มี vet_id" });
    // }

    const latestVetId = vets.reduce((max, vet) => {
      return vet.vet_id > max ? vet.vet_id : max;
    }, "VET0000");

    const generateNewVetId = (latestVetId) => {
      const numPart = parseInt(latestVetId.slice(3)) + 1;
      return `VET${numPart.toString().padStart(4, '0')}`;
    };

    const newVetId = generateNewVetId(latestVetId);
    console.log("newVetId", newVetId);

    const updatedVet = await Veterinarian.findByIdAndUpdate(
      id,
      {
        vet_id: newVetId,
        vet_status: "Account activate",
        status_renew: "Active"
      },
      { new: true }
    );

    if (!updatedVet) {
      return res.status(404).json({ message: "ไม่พบข้อมูลสัตวแพทย์ที่ต้องการอัปเดต" });

    }

    // สร้างผู้ใช้ใหม่
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('TEF12345', saltRounds);

    const newUser = new User({
      username: newVetId,
      password: hashedPassword,
      type_id: id,
      status_user: 'Active',
      e_mail: email,
      name: username,

    });

    await newUser.save();
    await C_User_Notifications_welcome();

    // ส่วนของการส่งอีเมล
    const mailOptions = {
      from: "allsolution@tlogical.com",
      to: email, 
      subject: "Your Thailand Equestrian Federation Membership Approved",
      text: `Dear Dr. ${username},

      We are pleased to inform you that your membership application with the Thailand Equestrian Federation has been successfully approved. Thank you for choosing to join us!

      Your membership details are as follows:

      Username: ${username}
      Member number: ${newVetId}
      Password: TEF12345
      Application date: ${applicationDate}

      Next steps:
      1. Login: Please use your username and password to log in at [Login link] to get started with your member account.
      2. Update personal information: Once logged in, please update your personal information and set a new password for security.
      3. Explore Benefits: Review the benefits and information that members can access.

      Contact information: If you have any questions or encounter any problems, our member services can be contacted at: Email: TEF@tlogical.com Telephone: 0000000000

      Thank you for joining the Thailand Equestrian Federation. We look forward to seeing you at various club events soon!
      `,
    };

    const info = await connectEmail.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({ 
      message: "Veterinarian info updated and approval email sent successfully", 
      updatedVet: updatedVet, 
      emailInfo: info.response 
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลและส่งอีเมล", error: error.toString() });
  }
};

exports.update_Deny_SendEmail = async (req, res) => {
  try {
    const { id, email, username, vet_reason } = req.body;
    console.log("Updating vet with ID:", id);

    const updatedVet = await Veterinarian.findByIdAndUpdate(
      id,
      {
        vet_status: "Deny",
        vet_reason: vet_reason
      },
      { new: true }
    );

    if (!updatedVet) {
      return res.status(404).json({ message: "ไม่พบข้อมูลสัตวแพทย์ที่ต้องการอัปเดต" });
    }

    // ส่วนของการส่งอีเมล
    const mailOptions = {
      from: "allsolution@tlogical.com",
      to: email, 
      subject: "Thailand Equestrian Federation Membership Application Status",
      text: `Dear Dr. ${username},

      Thank you for your interest in joining the Thailand Equestrian Federation. We appreciate the time and effort you put into your application.
      After careful consideration, we regret to inform you that we are unable to approve your membership application at this time.
      
      Reason for denial:
      ${vet_reason} 

      We appreciate your understanding and wish you the best in your equestrian endeavors.
      
      Sincerely,
      Membership Committee
      Thailand Equestrian Federation
      `
    };

    const info = await connectEmail.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({ 
      message: "Veterinarian info updated and denial email sent successfully", 
      updatedVet: updatedVet, 
      emailInfo: info.response 
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลและส่งอีเมล", error: error.toString() });
  }
};
exports.searchVeterinarians = async (req, res) => {
  try {
    const { 
      searchTerm, 
      startDate, 
      endDate, 
      approve_status, 
      vet_status,  
    } = req.query;
    
    const searchParams = { 
      searchTerm, 
      startDate, 
      endDate, 
      approve_status, 
      vet_status 
    };

    const { veterinarians, totalCount } = await Veterinarian.searchVeterinarians(
      searchParams,
      parseInt(page),
      parseInt(limit)
    );

    res.json({
      data: veterinarians,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error('Error in searchVeterinarians:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const formatResponse = (status, message, data = null) => {
  return { status, message, data };
};

exports.updateStatusRenew = async (req, res) => {
  try {
    const { vet_id } = req.body;
    // const newStatus = 'Active';
    // console.log('Received request:', { vet_id, newStatus });

    // ใช้ findOneAndUpdate แทนฟังก์ชัน updateStatusRenew
    const veterinarian = await Veterinarian.findOneAndUpdate(
      { vet_id: vet_id },
      { 
        approve_status: "Renew",
        vet_status: "Waiting for approval",
        updated_at: Date.now(),
        check_renew:"1"
      },
      { new: true }
    );

    if (!veterinarian) {
      return res.status(404).json(formatResponse('error', 'Veterinarian not found'));
    }

    res.status(200).json(formatResponse('success', 'Status updated successfully to Active', veterinarian));
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json(formatResponse('error', 'An error occurred while updating status'));
  }
};

exports.approvalVetRenew = async (req, res) => {
  try {
    const { id, email, username } = req.body;
    console.log("Updating vet with ID:", id);

    const vets = await Veterinarian.find({ vet_id: { $exists: true } }).sort({ created_at: -1 });

    if (vets.length === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลสัตวแพทย์ที่มี vet_id" });
    }

    const updatedVet = await Veterinarian.findByIdAndUpdate(
      id,
      {
        vet_status: "Account activate",
        status_renew: "Active",
        check_renew:"0"

      },
      { new: true }
    );

    // ส่วนของการส่งอีเมล
    const mailOptions = {
      from: "allsolution@tlogical.com",
      to: email, 
      subject: "Thank You for Renewing Your TEF Membership",
      text: `Dear Dr. ${username},
       Dear Dr. ${username}
       Thank you very much for renewing your contract with the Thailand Equestrian Federation (TEF).
       Your decision to renew your contract with us demonstrates your trust and confidence in our association.
       We deeply appreciate your continued support and assure you that we will work hard to provide you with the best possible experience.
       As a renewing member, you will continue to enjoy all the benefits, including:
             - Access to and management of participation in upcoming competitions
             - Submission of various requests through our portal
             - Continuous receipt of important news and announcements from the association
       
       If you have any questions or need any assistance, please don't hesitate to contact us.
       We are always happy to serve you.
       
       Thank you again for choosing to stay with us. We look forward to supporting your journey in the equestrian world in the future.
       
       With respect and gratitude,
       TEF Team
      `,
    };

    const info = await connectEmail.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({ 
      message: "Veterinarian info updated and approval email sent successfully", 
      updatedVet: updatedVet, 
      emailInfo: info.response 
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลและส่งอีเมล", error: error.toString() });
  }
};