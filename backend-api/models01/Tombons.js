const mongoose = require("mongoose");

const tombonsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    zip_code: {
        type: String,
    },
    name_th: {
        type: String,
    },
    name_en: {
        type: String,
    },
    amphure_id: {
        type: String,
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    },
});
module.exports = tombons = mongoose.model("thai_tombons", tombonsSchema);