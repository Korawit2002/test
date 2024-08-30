const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const connectEmail = require("../config/email");
const User = require("../models/user"); // เพิ่มการ import โมเดล User

const URL = process.env.STAFF_API_URL_USERS;

exports.send_email_forgot_password = async (req, res) => {
  const { e_mail } = req.body;

  try {
    const user = await User.findOne({ e_mail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const expiryTime = Date.now() + 10 * 60 * 1000; // หมดอายุใน 10 นาที

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expiryTime;
    await user.save();
    
    const resetUrl = `${URL}forgot/reset?token=${resetToken}&expiry=${expiryTime}`;
    
    const mailOptions = {
      from: "allsolution@tlogical.com",
      to: e_mail,
      subject: "Password Reset Request - Thailand Equestrian Federation",
      html: `
        <p>Dear ${user.name},</p>
        <p>We received a request to reset your password. To proceed, please click the link below.</p>
        <p>This link is valid for 10 minutes, so please be sure to reset your password promptly.</p>

        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Reset Password</a>

        <p>If you did not request this, please ignore this email, and your account will remain secure.</p>
        <p>For any questions or assistance, feel free to contact us.</p>

        <br/>
        <br/>
        <p>Best regards,</p>
        <p>TEF Team</p>
      `,
    };

    await connectEmail.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email", error: error.toString() });
  }
};

// เพิ่มฟังก์ชันใหม่สำหรับตรวจสอบความถูกต้องของโทเค็น
exports.validate_reset_token = async (req, res) => {
  const { token, expiry } = req.query;
  const now = Date.now();

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: now }
    });

    if (!user) {
      return res.status(400).json({ isValid: false, message: "Password reset token is invalid or has expired" });
    }

    res.json({ isValid: true });
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

// เพิ่มฟังก์ชันใหม่สำหรับรีเซ็ตรหัสผ่าน
exports.reset_password = async (req, res) => {
  const { token, newPassword } = req.body;
  const now = Date.now();

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: now }
    });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};