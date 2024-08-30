const Partners = require("../models/Partners");
const auto_partners = require("../models/AutoPartners");
// const logger = require("../logger");
const datetime = require("node-datetime");
const partenr_group_detail = require("../models/PartenrGroupDetails");
const billing_contacts = require("../models/BillingContacts");
const projects = require("../models/Projects");
const shipping = require("../models/ShippingAddress");
const document = require("../models/Documents");
const contact_person = require("../models/Contacts");
const crypto = require("crypto");

exports.register_client = async (req, res) => {
  try {
    
    const data = req.body.data;
    //console.log('data',data);
    const pseudo_code = req.body.id;
    let person_type_id = data.person_type_id;
    let person_type_name = data.person_type_name;
    let juristic_type_id = data.juristic_type_id;
    let juristic_type_name = data.juristic_type_name;
    let type_code = data.type_code;
    // let text_pnrg_id = data.pnrg_id;
    // let text_group_id = data.group_id;
    // let text_group_name = data.group_name;
    // let text_sub_group_id = data.sub_group_id;
    // let text_sub_group_name = data.sub_group_name;
    //status_images: '',
    let juristic_name_th = data.juristic_name_th;
    let juristic_name_en = data.juristic_name_en;
    let partners_id_old = data.partners_id_old;
    //sub_partners: '',
    let juristic_id = data.juristic_id;
    let address_Informations = data.address_Informations;
    let branch_number = data.branch_number;
    let nationality = data.nationality;
    let other_countries = data.other_countries;
    let other_countries_name = data.other_countries_name;
    let juristic_other = data.juristic_other;
    //company_photo: '',

    let fulladdress = data.fulladdress;
    let province = data.province;
    let province_id = data.province;
    let province_name = data.province_name;

    let amphure = data.amphure;
    let amphure_id = data.amphure;
    let amphure_name = data.amphure_name;
    let tumbol = data.tumbol;
    let tumbol_name = data.tumbol_name;
    let district_id = data.tumbol;
    let district_name = data.tumbol_name;
    let zipcode = data.zipcode;
    let website = data.website;
    let email = data.email;
    let phone = data.phone;
    let google_map = data.google_map;

    let firstname_cp = data.firstname_cp;
    let lastname_cp;
    let lastname_test = data.lastname_cp;
    let nickname_cp = data.nickname_cp;
    let position_cp = data.position_cp;
    let department_cp = data.department_cp;
    let phone_cp = data.phone_cp;
    let email_cp = data.email_cp;
    if(lastname_test === undefined )
    {
      lastname_cp ="";
    }
    else
    {
      lastname_cp = data.lastname_cp;
    }


    //status_contact: 'Success',
    //ผู้ติดต่อในการวางบิล
    let firstname_b = data.firstname_b;
    let lastname_b = data.lastname_b;
    let nickname_b = data.nickname_b;
    let position_b = data.position_b;
    let department_b = data.department_b;
    let phone_b = data.phone_b;
    let email_b = data.email_b;

    let payment_method = data.payment_method;
    let payment_method_name = data.payment_method_name;
    let other_payment_method = data.other_payment_method;
    let billing = data.billing;
    let billing_name = data.billing_name;
    let other_billing = data.other_billing;

    let fulladdress_dd = data.fulladdress_dd;
    let province_dd = data.province_dd;
    let province_dd_name = data.province_dd_name;
    let ampur_dd = data.ampur_dd;
    let ampur_dd_name = data.ampur_dd_name;
    let tumbol_dd = data.tumbol_dd;
    let tumbol_dd_name = data.tumbol_dd_name;
    let zipcode_dd = data.zipcode_dd;
    let google_map_dd = data.google_map_dd;
    //file_dd: '',

    let project_name = data.project_name;

    let location_shp = data.location_shp;
    let fulladdress_shp = data.fulladdress_shp;
    let tumbol_shp = data.tumbol_shp;
    let tumbol_shp_name = data.tumbol_shp_name;
    let ampur_shp = data.ampur_shp;
    let ampur_shp_name = data.ampur_shp_name;
    let province_shp = data.province_shp;
    let province_shp_name = data.province_shp_name;
    let zipcode_shp = data.zipcode_shp;
    let google_map_shp = data.google_map_shp;

    let username = data.username;
    let password = data.password;

    const secret_password = data.password;
    // const hash = crypto
    // .createHmac("sha256", secret_password)
    // .update("T.logical")
    // .digest("hex");
    const hash = '';
    
    let user_customer = {
      username:username,
      password:hash,
      password_text:password
    }

    const status_user = "รออนุมัติ";
    const status_deconste = "0";
    const status_credit = "0";
    const status_delete = "0";
    let status_partners = "0";

    var dt = datetime.create();
    var date1 = dt.format("Y");
    var date2 = dt.format("m");
    var check_date = date1 + "" + date2;
    var datatime_create = dt.format("Y-m-d H:M:S");

    const create_date = dt.format("Y-m-d H:M:S");
    const update_date = dt.format("Y-m-d H:M:S");
    const user_type = "0";
    const partners_id = "";


    const ch_juristic = await Partners.find({juristic_name_th:juristic_name_th,status_delete:'0',}).count();
    const addres1 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'สำนักงานใหญ่',status_delete:'0',}).count();
    const addres2 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'ไม่ระบุ',status_delete:'0',}).count();
    const addres3 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'สาขา',branch_number:branch_number,status_delete:'0',}).count();
    const addres4 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'',status_delete:'0',}).count();
    
    if(ch_juristic != 0 && address_Informations == 'สำนักงานใหญ่' && addres1 != 0)
    {
      res.send("1"); 
      return false;
    }
  
   if(ch_juristic != 0 && address_Informations == 'ไม่ระบุ' && addres2 != 0)
    {
      res.send("2"); 
      return false;
    }
    if(ch_juristic != 0 && address_Informations == 'สาขา' && addres3 != 0)
    {
      res.send("3"); 
      return false;
    }
  
    if(ch_juristic != 0 && address_Informations == '' && addres4 != 0)
    {
      res.send("4"); 
      return false;
    }




    /*****************************************************/
    //รายชื่อผู้ติดต่อ

    if (firstname_cp !== "" || phone_cp !== "") {
      const dtatCount = await contact_person
        .find({
          firstname: firstname_cp,
          phone: phone_cp,
          pseudo_code: pseudo_code,
        })
        .count();
      if (dtatCount != 0) {
        console.log("รายชื่อผู้ติดต่อ1", dtatCount);
      } else {
        console.log("รายชื่อผู้ติดต่อ2", dtatCount);
        const auto_id = "";
        const createdBy = "";
        const updatedBy = "";
        const deletedBy = "";
        const createdAt = "";
        const updatedAt = "";
        const number = "";

        const inserts_contact = new contact_person({
          partners_id,
          pseudo_code,
          number,
          department: department_cp,
          email: email_cp,
          firstname: firstname_cp,
          lastname: lastname_cp,
          nickname: nickname_cp,
          phone: phone_cp,
          position: position_cp,
          status_delete: status_delete,
          auto_id,
          createdBy,
          updatedBy,
          deletedBy,
          createdAt,
          updatedAt,
        });
        await inserts_contact.save();
        //console.log("inserts_contact",inserts_contact);
        //res.json("ok");
      }
    }

    const dataSelect = await contact_person.find({pseudo_code:pseudo_code}).limit(1);
    const contact_name = dataSelect[0].firstname+' '+dataSelect[0].lastname;
    const contact_lastname = dataSelect[0].lastname;
    const contact_phone = dataSelect[0].phone;
    /*****************************************************/

    /*****************************************************/
    //ที่อยู่จัดส่งเอกสาร
    if (fulladdress_dd !== "") {
      const dtatCount = await document
        .find({
          fulladdress: fulladdress_dd,
          province: province_dd,
          ampur: ampur_dd,
          tumbol: tumbol_dd,
          zipcode: zipcode_dd,
          pseudo_code: pseudo_code,
        })
        .count();

      //console.log("dtatCount", dtatCount);
      if (dtatCount != 0) {
       // console.log("22");
        //return res.json("error");
      } else {
       // let status_delete = "0";
        let create_date = "";
        let update_date = "";
        let create_by = "";
        let update_by = "";
        let delete_by = "";
        let file_map = "";
        let file_name = "";

        const inserts_document = new document({
          partners_id,
          pseudo_code,
          fulladdress:fulladdress_dd,
          province:province_dd,
          province_name:province_dd_name,
          ampur:ampur_dd,
          ampur_name:ampur_dd_name,
          tumbol:tumbol_dd,
          tumbol_name:tumbol_dd_name,
          zipcode:zipcode_dd,
          google_map:google_map_dd,
          file_map,
          file_name,
          status_delete:status_delete,
          create_date,
          update_date,
          create_by,
          update_by,
          delete_by,
        });
        await inserts_document.save();
       // console.log('inserts_document',inserts_document);
      }
    }
  
    /*****************************************************/

    /*****************************************************/
    //โครงการ
    if (project_name !== "") {
      const dtatCount = await projects
        .find({ project_name: project_name, pseudo_code: pseudo_code })
        .count();
      if (dtatCount != 0) {
        //return res.json("error");
      } else {
        const inserts_pro = new projects({
          partners_id,
          pseudo_code,
          project_name,
        });
        await inserts_pro.save();
       // console.log('inserts_pro',inserts_pro);
      }
    }
   
    /*****************************************************/

    /*****************************************************/
    //ที่อยู่จัดส่งสินค้า
    if (location_shp !== "" || fulladdress_shp !== "") {
      const dtatCount = await shipping
        .find({
          location: location_shp,
          fulladdress: fulladdress_shp,
          province: province_shp,
          ampur: ampur_shp,
          tumbol: tumbol_shp,
          zipcode: zipcode_shp,
          pseudo_code: pseudo_code,
        })
        .count();
      if (dtatCount != 0) {
       // return res.json("error");
      } else {
        //let status_delete = "0";
        let create_date = "";
        let update_date = "";
        let create_by = "";
        let update_by = "";
        let delete_by = "";

        let file_google = "";
        let file_name = "";

        const inserts_shipping = new shipping({
          partners_id,
          pseudo_code,
          location:location_shp,
          fulladdress:fulladdress_shp,
          tumbol:tumbol_shp,
          tumbol_name:tumbol_shp_name,
          ampur:ampur_shp,
          ampur_name:ampur_shp_name,
          province:province_shp,
          province_name:province_shp_name,
          zipcode:zipcode_shp,
          google_map:google_map_shp,
          file_google,
          file_name,
          status_delete:status_delete,
          create_date,
          update_date,
          create_by,
          update_by,
          delete_by,


        });
        await inserts_shipping.save();
        //console.log('inserts_shipping',inserts_shipping);
      }
    }
    

    /*************************billing****************************/
    //const status_delete = '0';
    const create_by ='';
    const update_by ='';
    const delete_by ='';
    const inserts_billing = new billing_contacts({
      partners_id:partners_id,
      pseudo_code:pseudo_code,
      firstname:firstname_b, 
      lastname:lastname_b, 
      nickname:nickname_b, 
      position:position_b, 
      department:department_b, 
      phone:phone_b, 
      email:email_b, 
      status_delete:status_delete, 
      create_date:create_date, 
      update_date:update_date, 
      create_by:create_by, 
      update_by:update_by, 
      delete_by:delete_by 
    });
    await inserts_billing.save();
    //console.log('inserts_billing',inserts_billing);
  /*****************************************************/


    const update_partners = await Partners.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      {
        partners_id: partners_id,
        person_type_id: person_type_id,
        person_type_name: person_type_name,
        type_code: type_code,
        juristic_type_id: juristic_type_id,
        juristic_type_name: juristic_type_name,
        juristic_name_th: juristic_name_th,
        juristic_name_en: juristic_name_en,
        partners_id_old: partners_id_old,
        juristic_id: juristic_id,
        address_Informations: address_Informations,
        branch_number: branch_number,
        nationality: nationality,
        other_countries: other_countries,
        other_countries_name: other_countries_name,
        juristic_other: juristic_other,
        fulladdress: fulladdress,
        province: province,
        province_id: province,
        province_name: province_name,
        amphure: amphure,
        amphure_id: amphure,
        amphure_name: amphure_name,
        tumbol: tumbol,
        tumbol_name: tumbol_name,
        district_id: tumbol,
        district_name: tumbol_name,
        zipcode: zipcode,
        website: website,
        email: email,
        phone: phone,
        google_map: google_map,
        payment_method: payment_method,
        payment_method_name: payment_method_name,
        other_payment_method: other_payment_method,
        billing: billing,
        billing_name: billing_name,
        other_billing: other_billing,
        contact_name:contact_name,
        contact_phone:contact_phone,
        status_user:status_user,
        create_date:create_date,
        update_date:update_date,
        status_delete:status_delete,
        status_partners:status_partners,
        user_customer:user_customer
      },
      { new: true }
    );
    console.log("update_partners", update_partners);
    res.send("ok");



  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
};

exports.update_password = async (req, res) => {
  try {
    let pseudo_code = req.body.id;
    let newpass = req.body.password;

    const secret_password = req.body.password;
    const hash = crypto
      .createHmac("sha256", secret_password)
      .update("T.logical")
      .digest("hex");

      

  
      let user_customer = {
        username:username,
        password:hash,
        password_text:newpass
      }

      const update_pass = await Partners.findOneAndUpdate(
        { pseudo_code: pseudo_code },
        {
          user_customer:user_customer
        },
        { new: true }
      );
      res.send("Success");

  } catch (err) {
    res.send("error");
  }
};