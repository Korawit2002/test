const mongoose = require("mongoose");

const juristicTypeSchema = new mongoose.Schema(
{
    juristic_type_id:{
        type: String,
    },
    juristic_name:{
        type: String,
    },
    juristic_other:{
        type: String,
    },
    person_type_id:{
        type: String,
    },

}
);
module.exports = juristic_type = mongoose.model("juristic_types", juristicTypeSchema);