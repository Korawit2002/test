
const User = require('../models/user');
const cron = require('node-cron');
const UserNotification = require('../models/user_notification');
const Notification = require('../models/notification')

exports.createNotification = async (req, res) => {
  try {
    const { type, title, message, documentType } = req.body;
    // สร้าง notification ใหม่
    const newNotification = new Notification({
      type,
      title,
      message,
      documentType
    });

    // บันทึกลงฐานข้อมูล
    const savedNotification = await newNotification.save();

    // ส่งการตอบกลับ
    res.status(201).json({
      success: true,
      data: savedNotification
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.createUserNotifications = async () => {
  try {
    const users = await User.find({}, 'username');
    
    const notificationData = {
      _id: "66c80334ffa06059a1f9fec4",
      type: "membership_expiry"
    };

    const userNotifications = users.map(user => ({
      user_id: user._id,
      username: user.username,
      notification_id: notificationData._id,
      type: notificationData.type,
      is_read: false,
      read_at: null
    }));

    await UserNotification.insertMany(userNotifications, { ordered: false });

    console.log('User notifications created successfully');
    return userNotifications;
  } catch (err) {
    console.error('Error creating user notifications:', err);
    throw err;
  }
};



//สำหรับเทส
exports.scheduleUserNotifications = () => {
  // ตั้งเวลาสำหรับเทส
  cron.schedule('32 16 23 8 *', async () => {
    console.log('เริ่มการสร้าง User Notifications');
    try {
      await exports.createUserNotifications();
      console.log('สร้าง User Notifications เสร็จสิ้น');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้าง User Notifications:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Bangkok"
  });
  console.log('ตั้งเวลาสร้าง User Notifications เรียบร้อยแล้ว');
};


// exports.scheduleUserNotifications = () => {
//   // ตั้งเวลาสำหรับวันที่ 1 ธันวาคม เวลา 00:00
//   cron.schedule('0 0 1 12 *', async () => {
//     console.log('เริ่มการสร้าง User Notifications');
//     try {
//       await exports.createUserNotifications();
//       console.log('สร้าง User Notifications เสร็จสิ้น');
//     } catch (error) {
//       console.error('เกิดข้อผิดพลาดในการสร้าง User Notifications:', error);
//     }
//   }, {
//     scheduled: true,
//     timezone: "Asia/Bangkok"
//   });
//   console.log('ตั้งเวลาสร้าง User Notifications เรียบร้อยแล้ว');
// };


exports.getUserNotifications = async (req, res) => {
  try {
    const { username, notificationId, notificationType } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let query = { user_id: user._id };
    if (notificationId) query.notification_id = notificationId;
    if (notificationType) query.type = notificationType;

    const notifications = await UserNotification.find(query)
      .populate('notification_id') // เพิ่มการ populate ข้อมูลจาก Notification
      .sort({ created_at: -1 })
      .limit(10);

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error in getUserNotifications:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateNotificationStatus = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { isRead } = req.body;

    if (!notificationId) {
      return res.status(400).json({ success: false, message: "Notification ID is required" });
    }

    const updatedNotification = await UserNotification.findByIdAndUpdate(
      notificationId,
      { 
        is_read: isRead,
        read_at: isRead ? new Date() : null
      },
      { new: true }
    ).populate('notification_id');

    if (!updatedNotification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, data: updatedNotification });
  } catch (error) {
    console.error('Error in updateNotificationStatus:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.C_User_Notifications_welcome = async () => {
  try {
    const users = await User.find({}, 'username');
    
    const notificationData = {
      _id: "66c8605c36bdb2474e7f38b3",
      type: "welcome"
    };

    const userNotifications = users.map(user => ({
      user_id: user._id,
      username: user.username,
      notification_id: notificationData._id,
      type: notificationData.type,
      is_read: false,
      read_at: null
    }));

    await UserNotification.insertMany(userNotifications, { ordered: false });

    console.log('User notifications created successfully');
    return userNotifications;
  } catch (err) {
    console.error('Error creating user notifications:', err);
    throw err;
  }
};
