 
 const mongoose = require("mongoose");
 const billingSchema = new mongoose.Schema(
 {
    partners_id:{
         type: String,
     },
     pseudo_code:{
         type: String,
     },
     firstname:{
        type: String,
    }, 
    lastname:{
        type: String,
    }, 
    nickname:{
        type: String,
    }, 
    position:{
        type: String,
    }, 
    department:{
        type: String,
    }, 
    phone:{
        type: String,
    }, 
    email:{
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
 module.exports = billing_contacts = mongoose.model("billing_contacts", billingSchema);