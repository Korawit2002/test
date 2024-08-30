
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

exports.updateRenewScheduler = () => {
    // ตั้งเวลาสำหรับวันที่ 1 ธันวาคม เวลา 00:00 (Expiring Soon)0 0 1 12 *
    cron.schedule('0 12 26 8 *', async () => {
      console.log('เริ่มการอัปเดตสถานะ Expiring Soon (ทุกคน)');
      try {
        await exports.updateAllToExpiringSoon();
        console.log('อัปเดตสถานะ Expiring Soon (ทุกคน) เสร็จสิ้น');
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดต Expiring Soon (ทุกคน):', error);
      }
    }, {
      scheduled: true,
      timezone: "Asia/Bangkok"
    });
  
    // ตั้งเวลาสำหรับการเช็คและอัปเดต Expiring Soon ตามเงื่อนไขพิเศษ
    cron.schedule('0 1-23 1-31 12 *', async () => {
      console.log('เริ่มการตรวจสอบและอัปเดตสถานะ Expiring Soon (ตามเงื่อนไขพิเศษ)');
      try {
        await exports.updateToExpiringSoonSpecial();
        console.log('อัปเดตสถานะ Expiring Soon (ตามเงื่อนไขพิเศษ) เสร็จสิ้น');
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดต Expiring Soon (ตามเงื่อนไขพิเศษ):', error);
      }
    }, {
      scheduled: true,
      timezone: "Asia/Bangkok"
    });
    
    // ตั้งเวลาสำหรับวันที่ 1 มกราคม เวลา 00:00 (Inactive)
    cron.schedule('0 0 1 1 *', async () => {
      console.log('เริ่มการอัปเดตสถานะ Inactive');
      try {
        await exports.updateToInactive();
        console.log('อัปเดตสถานะ Inactive เสร็จสิ้น');
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดต Inactive:', error);
      }
    }, {
      scheduled: true,
      timezone: "Asia/Bangkok"
    });
  
    console.log('ตั้งเวลาอัปเดตสถานะเรียบร้อยแล้ว');
  };
  
  exports.updateToExpiringSoonSpecial = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const startTime = new Date(currentYear, 11, 1, 1, 30); // 1 ธันวาคม 01:30 น.
    const endTime = new Date(currentYear, 11, 31, 23, 59); // 31 ธันวาคม 23:59 น.
    try {
      const result = await Veterinarian.updateMany(
        {
          created_at: { $gte: startTime, $lte: endTime },
          status_renew: { $ne: 'Expiring Soon' }
        },
        { $set: { status_renew: 'Expiring Soon' } }
      );
      console.log(`อัปเดตสถานะ Expiring Soon (พิเศษ) สำหรับ ${result.modifiedCount} รายการ`);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดต Expiring Soon (พิเศษ):', error);
      throw error;
    }
  };


  exports.updateAllToExpiringSoon = async () => {
    try {
      const result = await Veterinarian.updateMany(
        {}, // อัพเดตทุกรายการ
        { 
          $set: { 
            status_renew: 'Expiring Soon',
            check_renew: "0"
          }
        }
      );
      console.log(`อัปเดตสถานะ Expiring Soon สำหรับ ${result.modifiedCount} รายการ`);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดต Expiring Soon:', error);
      throw error;
    }
  };


  exports.updateToInactive = async () => {
    try {
      const result = await Veterinarian.updateMany(
        { status_renew: 'Expiring Soon' },
        { $set: { status_renew: 'Inactive' } }
      );
      console.log(`อัปเดตสถานะ Inactive สำหรับ ${result.modifiedCount} รายการ`);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดต Inactive:', error);
      throw error;
    }
  };


  