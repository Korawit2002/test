const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userNotificationSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    username: {
      type: String,
    },
    notification_id: {
      type: Schema.Types.ObjectId,
      ref: 'notification',
    },
    type: {
      type: String
    },
    is_read: {
      type: Boolean,
      default: false
    },
    read_at: {
      type: Date,
      default: null
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  
  // ถ้าคุณต้องการสร้าง index ที่ไม่ใช่ unique index สามารถทำได้ดังนี้
  userNotificationSchema.index({ user_id: 1, notification_id: 1 });
  
  const UserNotification = mongoose.model('user_notifications', userNotificationSchema, 'user_notifications');
  
  module.exports = UserNotification;