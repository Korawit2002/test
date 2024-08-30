const mongoose = require("mongoose");

const AutoPartnersSchema = new mongoose.Schema(
{
    year:{
        type: String,
    },
    val:{
        type: String,
    },
    seq:{
        type: String,
    },
    code:{
        type: String,
    }
   
}
);
module.exports = auto_partners = mongoose.model("auto_partners", AutoPartnersSchema);