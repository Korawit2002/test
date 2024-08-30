const mongoose = require("mongoose");

const amphuresSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name_th: {
        type: String,
    },
    name_en: {
        type: String,
    },
    province_id: {
        type: String,
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    },
});
module.exports = amphures = mongoose.model("thai_amphures", amphuresSchema);