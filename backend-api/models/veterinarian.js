const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema(
  {
    status_renew: {
      type: String,
      
    },
    vet_id: {
      type: String,
      
    },
    first_name_th: {
      type: String,
      
    },
    last_name_th: {
      type: String,
      
    },
    first_name_en: {
      type: String,
      
    },
    last_name_en: {
      type: String,
      
    },
    gender: {
      type: String,
      
    },
    date_of_birth: {
      type: String,
      
    },
    phone_number: {
      type: String,
      
    },
    email: {
      type: String,
      
    },
    address: {
      type: String,
      
    },
    subdistrict: {
      type: String,
      
    },
    district: {
      type: String,
      
    },
    province: {
      type: String,
      
    },
    postcode: {
      type: String,
      
    },
    vet_school: {
      type: String,
      
    },
    country: {
      type: String,
      
    },
    year_of_graduation: {
      type: String,
      
    },
    approve_status: {
      type: String,
      
    },
    vet_status: {
      type: String,
      
    },
    vet_reason: {
      type: String,
    },
    expiration_passport: {
      type: String,
    },
    practitioner: {
      type: String,
    },
    expiration_practitioner: {
      type: String,
    },
    check_renew: {
      type: String,
    },
    
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


module.exports = mongoose.model("veterinarian", vetSchema, "veterinarian");