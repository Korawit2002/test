const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  title: {
    th: { type: String, required: true },
    en: { type: String, required: true }
  },
  message: {
    th: { type: String, required: true },
    en: { type: String, required: true }
  },
  documentType: {
    type: String,
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('notification', notificationSchema, "notification");

module.exports = Notification;


// อธิบายโครงสร้าง:
// type: ประเภทของการแจ้งเตือน     enum: ['membership_expiry', 'id_expiry', 'license_expiry']
// title: หัวข้อการแจ้งเตือน (แยกเป็นภาษาไทยและอังกฤษ)
// message: ข้อความแจ้งเตือน (แยกเป็นภาษาไทยและอังกฤษ)
// documentType: ประเภทของเอกสารที่กำลังจะหมดอายุ
// timestamps: Mongoose จะเพิ่มฟิลด์ createdAt และ updatedAt ให้อัตโนมัติ

