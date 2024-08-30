const mongoose = require("mongoose");

const tefOfficerSchema = new mongoose.Schema({
  user_type: {
    type: String
  },
  tef_rank: {
    type: String
  },
  first_name_th: {
    type: String
  },
  last_name_th: {
    type: String
  },
  first_name_en: {
    type: String
  },
  last_name_en: {
    type: String
  },
  gender: {
    type: String
  },
  date_of_birth: {
    type: String
  },
  phone_number: {
    type: String
  },
  emaill: {
    type: String
  },
  address: {
    type: String
  },
  subdistrict: {
    type: String
  },
  district: {
    type: String
  },
  province: {
    type: String
  },
  postcode: {
    type: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const TefOfficer = mongoose.model('tef_officer', tefOfficerSchema,"tef_officer");

module.exports = TefOfficer;