const mongoose = require("mongoose");

const PrivateFileSchema = new mongoose.Schema({
    meeting_id: {
        type: String,
    },
    sub_agenda_id: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    file: {
        type: String, // This could be a path to the file or a binary data field depending on how you store files
    },
    originalname: {
        type: String,
    },
    content_type: {
        type: String,
    },
    size: {
        type: String, // Changed to Number if this field stores the file size
    },
    user_id: {
        type: String,
    },
    company_id: {
        type: String,
    },
    statusDelete: {
        type: Boolean, // Assuming statusDelete indicates a true/false deleted state
    },
    createDate: {
        type: String, // Changed to Date type for storing dates
    },
    updateDate: {
        type: String, // Changed to Date type for storing dates
    },
    createBy: {
        type: String,
    },
    updateBy: {
        type: String,
    },
    deleteBy: {
        type: String,
    },
    addedBy: {
        type: String, // Who added the file
    },
    uploadDate: {
        type: String, // Changed to Date type for storing dates
    },
    private_order:{
        type: String,
    },
});

module.exports = mongoose.model("private_file", PrivateFileSchema);
