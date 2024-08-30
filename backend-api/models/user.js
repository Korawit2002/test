const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  e_mail: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'veterinarian'
  },
  status_user: {
    type: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('user', userSchema, "user");