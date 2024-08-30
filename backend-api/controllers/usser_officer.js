const bcrypt = require('bcryptjs');
const UserOfficer = require('../models/user_officer');
const TefOfficer = require('../models/tef_officer');

exports.addOfficer = async (req, res) => {
  try {
    const { username, e_mail, password, name, type_id, status_user } = req.body;

    // Check if username or email already exists
    const existingOfficer = await UserOfficer.findOne({ $or: [{ username }, { e_mail }] });
    if (existingOfficer) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new officer
    const newOfficer = new UserOfficer({
      username,
      e_mail,
      password: hashedPassword,
      name,
      type_id,
      status_user
    });

    // Save officer to database
    const savedOfficer = await newOfficer.save();

    // Remove password from response
    savedOfficer.password = undefined;

    res.status(201).json({
      message: 'Officer created successfully',
      officer: savedOfficer
    });

  } catch (error) {
    console.error('Error adding officer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create_tef_officer = async (req, res) => {
  try {
    const {
      user_type,
      tef_rank,
      first_name_th,
      last_name_th,
      first_name_en,
      last_name_en,
      gender,
      date_of_birth,
      phone_number,
      emaill,
      address,
      subdistrict,
      district,
      province,
      postcode
    } = req.body;

    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingOfficer = await TefOfficer.findOne({ emaill });
    if (existingOfficer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // สร้าง TEF Officer ใหม่
    const newTefOfficer = new TefOfficer({
      user_type,
      tef_rank,
      first_name_th,
      last_name_th,
      first_name_en,
      last_name_en,
      gender,
      date_of_birth,
      phone_number,
      emaill,
      address,
      subdistrict,
      district,
      province,
      postcode
    });

    // บันทึกข้อมูลลงฐานข้อมูล
    const savedTefOfficer = await newTefOfficer.save();

    res.status(201).json({
      message: 'TEF Officer created successfully',
      officer: savedTefOfficer
    });

  } catch (error) {
    console.error('Error creating TEF Officer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};