const mongoose = require("mongoose");

// RenewRecordVet Model
const renewRecordVetSchema = new mongoose.Schema({
  status_renew: {
    type: String,
  },
  refprimary_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'veterinarian'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  create_by: {
    type: String,
    default: Date.now
  }
});

// PassportVet Model
const passportVetSchema = new mongoose.Schema({
  
  filename: {
    type: String,
  },
  filepath: {
    type: String,
  },
  refprimary_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'veterinarian'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// PhotoVet Model
const photoVetSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  filepath: {
    type: String,
  },
  refprimary_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'veterinarian'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// LicenseVet Model
const licenseVetSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  filepath: {
    type: String,
  },
  refprimary_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'veterinarian'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}
);

const RenewRecordVet = mongoose.model('vet_renew_record', renewRecordVetSchema, 'vet_renew_record');
const PassportVet = mongoose.model('vet_passport', passportVetSchema, 'vet_passport');
const PhotoVet = mongoose.model('vet_photo', photoVetSchema, 'vet_photo');
const LicenseVet = mongoose.model('vet_license', licenseVetSchema, 'vet_license');

module.exports = {
  RenewRecordVet,
  PassportVet,
  PhotoVet,
  LicenseVet
};
