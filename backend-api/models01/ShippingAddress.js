const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
{
    pseudo_code:{
        type: String,
    },
    partners_id:{
        type: String,
    },
    location:{
    type: String,
    },
    fulladdress:{
        type: String,
    },
    tumbol:{
        type: String,
    },
    tumbol_name:{
        type: String,
    },
    ampur:{
        type: String,
    },
    ampur_name:{
        type: String,
    },
    province:{
        type: String,
    },
    province_name:{
        type: String,
    },
    zipcode:{
        type: String,
    },
    google_map:{
        type: String,
    },
    file_name:{
        type: String,
    },
    file_google:{
        type: String,
    },
    status_delete:{
        type: String,
    },
    create_date:{
        type: String,
    },
    update_date:{
        type: String,
    },
    create_by:{
        type: String,
    },
    update_by:{
        type: String,
    },
    delete_by:{
        type: String,
    },

}
);
module.exports = shipping = mongoose.model("shipping_addresses", ShippingSchema);