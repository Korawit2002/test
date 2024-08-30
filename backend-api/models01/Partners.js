const mongoose = require("mongoose");
const PartnersSchema = new mongoose.Schema(
{
   pseudo_code: {
        type: String,
    },
   partners_id: {
        type: String,
    },
   partners_id_old: {
        type: String,
    },
   auto_id: {
        type: String,
    },
   user_type: {
        type: String,
    },
   person_type_id: {
        type: String,
    },
   person_type_name: {
        type: String,
    },
   type_code: {
        type: String,
    },
   juristic_type_id: {
        type: String,
    },
   juristic_type_name: {
        type: String,
    },
   juristic_other: {
        type: String,
    },
   juristic_id: {
        type: String,
    },
   juristic_name_th: {
        type: String,
    },
   juristic_name_en: {
        type: String,
    },
   pnrg_id: {
        type: String,
    },
   pnrg_type_id: {
        type: String,
    },
    group_id: {
        type: String,
    },
   group_name: {
        type: String,
    },
   sub_id: {
        type: String,
    },
   address_Informations: {
        type: String,
    },
   branch_number: {
        type: String,
    },
   nationality: {
        type: String,
    },
   country_id: {
        type: String,
    },
   other_countries: {
        type: String,
    },
   other_countries_name: {
        type: String,
    },
   company_image: {
        type: String,
    },
   address_name: {
        type: String,
    },
   fulladdress: {
        type: String,
    },
   building: {
        type: String,
    },
   room_no: {
        type: String,
    },
   floor: {
        type: String,
    },
   village_name: {
        type: String,
    },
   address_no: {
        type: String,
    },
   moo: {
        type: String,
    },
   soi: {
        type: String,
    },
   road: {
        type: String,
    },
   district_id: {
        type: String,
    },
   district_name: {
        type: String,
    },
   tumbol: {
        type: String,
    },
   tumbol_name: {
        type: String,
    },
   amphure: {
        type: String,
    },
   amphure_id: {
        type: String,
    },
   amphure_name: {
        type: String,
    },
   province: {
        type: String,
    },
   province_id: {
        type: String,
    },
   province_name: {
        type: String,
    },
   zipcode: {
        type: String,
    },
   phone: {
        type: String,
    },
   email: {
        type: String,
    },
   website: {
        type: String,
    },
   google_map: {
        type: String,
    },
   company_map: {
        type: String,
    },
   company_map_file: {
        type: String,
    },
   company_certificate_file: {
        type: String,
    },
   company_certificate: {
        type: String,
    },
   vat_registration_file: {
        type: String,
    },
   vat_registration: {
        type: String,
    },
   company_seal_file: {
        type: String,
    },
   company_seal: {
        type: String,
    },
  
   payment_method: {
        type: String,
    },
   other_payment_method: {
        type: String,
    },
   billing: {
        type: String,
    },
   other_billing: {
        type: String,
    },
   file_billing: {
        type: String,
    },
   file_billing_name: {
        type: String,
    },
   contact_person_id: {
        type: String,
    },
   status_credit: {
        type: String,
    },
   request_credit: {
        type: String,
    },
   credit: {
        type: String,
    },
   contact_name: {
        type: String,
    },
   contact_phone: {
        type: String,
    },
   status_user: {
        type: String,
    },
   status_delete: {
        type: String,
    },
   createdBy: {
        type: String,
    },
   updatedBy: {
        type: String,
    },
   deleteBy: {
        type: String,
    },
   createdAt: {
        type: String,
    },
   updatedAt: {
        type: String,
    },
   create_date: {
        type: String,
    },
   update_date: {
        type: String,
    },
   create_by: {
        type: String,
    },
   update_by: {
        type: String,
    },
   delete_by: {
        type: String,
    },
   status_partners: {// 0 ปกติ//1 pseudo code
        type: String,
    },
    user_customer:{
        username:String,
        password:String,
        password_text:String,
    },
    duplicate:{
        type: String,
    },
    user_level:{
        email:String,
        department_id:String,
        division_id:String,
        level:String,
        name_en:String,
        name_th: String,
        section_id:String,
    },
    users_id:{
        type: String,
    },
    level_create:{
        type: String,
    },
   
}
);
module.exports = Partners = mongoose.model("partners", PartnersSchema);