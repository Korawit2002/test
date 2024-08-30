const mongoose = require("mongoose");
const PersonTypeSchema = new mongoose.Schema(
{
    person_type_id:{
        type: String,
    },
    person_type_name:{
        type: String,
    },
    company_id:{
        type: String,
    },
}
);
module.exports = person_type = mongoose.model("person_types", PersonTypeSchema);