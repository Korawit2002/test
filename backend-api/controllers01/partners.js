const Partners = require("../models/Partners.js");
const auto_partners = require("../models/AutoPartners.js");
//const logger = require("../logger.js");
const datetime = require("node-datetime");
const partenr_group_detail = require("../models/PartenrGroupDetails.js");
const billing_contacts = require("../models/BillingContacts.js");
const projects = require("../models/Projects.js");
const shipping = require("../models/ShippingAddress.js");
const document = require("../models/Documents.js");
const contact_person = require("../models/Contacts.js");
const crypto = require("crypto");
const companyPhoto = require("../models/companyPhoto.js");
const connectEmail = require("../config/email.js");
const fetch = require('cross-fetch');
exports.pseudo = async (req, res) => {
  try {
    let pseudo_code = Math.floor(Math.random() * 10000000) + 1;
    let auto_id = "";
    let user_type = "";
    let partners_id = "";
    let partners_id_old = "";
    let person_type_id = "";
    let person_type_name;
    let type_code = "";
    let juristic_type_id = "";
    let juristic_type_name = "";
    let juristic_other = "";
    let juristic_id = "";
    let juristic_name_th = "";
    let juristic_name_en = "";
    let pnrg_id = "";
    let pnrg_type_id = "";
    let group_id = "";
    let group_name = "";
    let sub_id = "";
    let address_Informations = "";
    let branch_number = "";
    let nationality = "";
    let country_id = "";
    let other_countries = "";
    let other_countries_name = "";
    let company_image = "";
    /**ที่อยู่จดทะเบียน*/
    let address_name = "";
    let fulladdress = "";
    let building = "";
    let room_no = "";
    let floor = "";
    let village_name = "";
    let address_no = "";
    let moo = "";
    let soi = "";
    let road = "";
    let district_id = ""; //อันเดียวกับ tumbol
    let district_name = ""; //อันเดียวกับ tumbol
    let tumbol = "";
    let tumbol_name = "";
    let amphure = "";
    let amphure_id = "";
    let amphure_name = "";
    let province = "";
    let province_id = "";
    let province_name = "";
    let zipcode = "";
    let phone = "";
    let email = "";
    let website = "";
    let google_map = "";
    let company_map = "";
    let company_map_file = "";
    //เอกสารสำคัญ
    let company_certificate_file = "";
    let company_certificate = "";
    let vat_registration_file = "";
    let vat_registration = "";
    let company_seal_file = "";
    let company_seal = "";
    //รายละเอียดการชำระเงิน
    let payment_method = "";
    let other_payment_method = "";
    let billing = "";
    let other_billing = "";
    let file_billing = "";
    let file_billing_name = "";
    let contact_person_id = ""; //เอามาทำไมไม่รู้
    //credit
    let status_credit = "";
    let request_credit = "";
    let credit = "";
    //ดึงข้อมูล contact คนแรกสุดมา
    let contact_name = "";
    let contact_phone = "";
    let status_user = "";
    let status_delete = "";
    let createdBy = req.body.createdBy;
    let updatedBy = "";
    let deletedBy = "";
    let createdAt = "";
    let updatedAt = "";
    let create_date = "";
    let update_date = "";
    let create_by = "";
    let update_by = "";
    let delete_by = "";
    let status_partners = "1";
    let username = "";
    let password = "";
    let duplicate  = "";
    let level_create = req.body.userLevel;

    let user_customer = {
      username: username,
      password: password,
      password_text: password,
    };

    let users_id = req.body.userId;
    let  user_level = {
      email:req.body.userEmail,
      department_id:req.body.userDepartmen,
      division_id:req.body.userDivision,
      level:req.body.userLevel,
      name_en:req.body.userNameEn,
      name_th:req.body.userNameTh,
      section_id:req.body.userSection,
      }
    const code = new Partners({
      pseudo_code,
      auto_id,
      user_type,
      partners_id,
      partners_id_old,
      person_type_id,
      person_type_name,
      type_code,
      juristic_type_id,
      juristic_type_name,
      juristic_other,
      juristic_id,
      juristic_name_th,
      juristic_name_en,
      pnrg_id,
      pnrg_type_id,
      group_id,
      group_name,
      sub_id,
      address_Informations,
      branch_number,
      nationality,
      country_id,
      other_countries,
      other_countries_name,
      company_image,
      address_name,
      fulladdress,
      building,
      room_no,
      floor,
      village_name,
      address_no,
      moo,
      soi,
      road,
      district_id,
      district_name,
      tumbol,
      tumbol_name,
      amphure,
      amphure_id,
      amphure_name,
      province,
      province_id,
      province_name,
      zipcode,
      phone,
      email,
      website,
      google_map,
      company_map,
      company_map_file,
      company_certificate_file,
      company_certificate,
      vat_registration_file,
      vat_registration,
      company_seal_file,
      company_seal,
      payment_method,
      other_payment_method,
      billing,
      other_billing,
      file_billing,
      file_billing_name,
      contact_person_id,
      request_credit,
      credit,
      contact_name,
      contact_phone,
      status_user,
      status_delete,
      createdBy,
      updatedBy,
      deletedBy,
      createdAt,
      updatedAt,
      create_date,
      update_date,
      create_by,
      update_by,
      delete_by,
      status_partners,
      user_customer,
      duplicate,
      user_level,
      users_id,
      level_create,
      
    });
    await code.save();
    //logger.info("info-file", { message: JSON.parse(code) });
    //console.log('pseudo_code',code);
    res.json(pseudo_code);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    ////logger.error("error-file", { message: "Server Error!!" });
  }
};


exports.dbd  = async (req, res) => {
  //const data = req.params.juristic;
  //console.log("partners", data);
  
  // try {
  //   const juristic = req.params.juristic;
  //   const url_dbd = `https://dataapi.moc.go.th/juristic?juristic_id=${juristic}`;

  //   // const dataListBilling = await fetch({ pseudo_code: id });
  //   // //console.log(dataListBilling);
    

  // //   const response = await fetch(`${url_dbd}`);
  // //   console.log(response);
  // //  console.log(url_dbd);
  // //   res.send(url_dbd);


  //   const response = await fetch(url_dbd);

  //   if (!response) {
  //     throw new Error(`Error! status: ${response.status}`);
 

  //   const result = await response.json();
  //   return result;

  //   console.log(err);
  //   }


  // } catch (err) {
  //   console.log(err);
  //   res.status(400).send("Server Error!!");
  // }

  try {
       const juristic = req.params.juristic;
    const url_dbd = `https://dataapi.moc.go.th/juristic?juristic_id=${juristic}`; 
    
    const response = await fetch(url_dbd);
    //const result = await response.json();
 let data_all;
 //console.log('result',response.status);
 //console.log('result',result);
    // if (!response.ok) {
    //   //throw new Error(`Error! status: ${response.status}`);
    //   console.log('result','เชื่อมไม่ติด');
    // }
    // else
    // {
      const result = await response.json();
      
      if(result.juristicID == 'null' ||  result.juristicID == '')
      {
         data_all = 'ไม่พบข้อมูล';
        console.log('result',data_all);
      }
      else
      {
        
         data_all ={
          juristic_id: result.juristicID,
          juristic_name_th: result.juristicNameTH,
          juristic_name_en: result.juristicNameEN,



          // juristicType: result.juristicType,
          // registerCapital: result.registerCapital,
          // standardObjective: result.standardObjective,
          // addressName: result.addressDetail.addressName,
          // buildingName: result.addressDetail.buildingName,
          // roomNo: result.addressDetail.roomNo,
          // floor: result.addressDetail.floor,
          // villageName: result.addressDetail.villageName,
          // houseNumber: result.addressDetail.houseNumber,
          // moo: result.addressDetail.moo,
          // soi: result.addressDetail.soi,
          // street: result.addressDetail.street,
          // subDistrict:result.addressDetail.subDistrict,
          // district_dbd: result.addressDetail.district,
          // province_dbd: result.addressDetail.province,
        }
     console.log(data_all);
      }


   
   
  res.send(data_all);
  } catch (err) {
    console.log(err);
    res.send('null');
  }
  

};

exports.create_partners = async (req, res) => {
  try {
    const data = req.body.data;
    //console.log("partners", data);
    const pseudo_code = req.body.id;
    let person_type_id = data.person_type_id;
    let person_type_name = data.person_type_name;
    let type_code = data.type_code;
    let juristic_type_id = data.juristic_type_id;
    let juristic_type_name = data.juristic_type_name;
    let text_pnrg_id = data.pnrg_id;
    let text_group_id = data.group_id;
    let text_group_name = data.group_name;
    let text_sub_group_id = data.sub_group_id;
    let text_sub_group_name = data.sub_group_name;
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
    let lastname_test = data.lastname_cp;
    let lastname_cp;
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
    //   .createHmac("sha256", secret_password)
    //   .update("T.logical")
    //   .digest("hex");
    const hash = '';
    let user_customer = {
      username: username,
      password: hash,
      password_text: password,
    };

    const status_user = "อนุมัติ";
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

    // //console.log('บันทึก', data);
    //res.json(data);
    const codes = "";
    const auto = await auto_partners.findOne({ code: type_code }).exec();
    const seq_new = auto.seq;
    const val_new = auto.val;
    //*** Check Year ***//
    var partners_id = "";
    let text1 = "0001";
    let Seq = "";
    let nn = "1";

   //เช็กชื่อบริษัืซ้ำ

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
        //*** Check val = year now ***//
        if (auto.year === date1) {
          let text = "000" + "" + seq_new;
          Seq = text.substr(-4, 4);
          partners_id = type_code + "" + val_new + "" + Seq;
          var useq = parseInt(seq_new) + parseInt(nn);
          //*** Update Next Seq ***//
          const update = await auto_partners.findOneAndUpdate(
            { code: type_code },
            { seq: useq },
            { new: true }
          );
        } //*** Check val != year now ***//
        else {
          Seq = text1.substr(-4, 4);
          let new_date = date1.substr(-2, 2);
          partners_id = type_code + "" + new_date + "" + Seq;
          let useq = "1";
          //*** Update New Seq ***//
          const update = await auto_partners.findOneAndUpdate(
            { code: type_code },
            { val: new_date, seq: useq, year: date1 },
            { new: true }
          );
        }

          //console.log('partners_id',partners_id)
          /*****************************************************/
          //เช็คกรณีมีกลุ่มเข้ามาด้วย เช็กว่ามีข้อมูลแล้วหรือยังถ้ายังให้บันทึกก่อน undefined
          if (
            text_group_id !== "" ||
            text_sub_group_id !== "" ||
            text_group_id !== "" ||
            text_sub_group_id !== ""
          ) {
            const dtatCount = await partenr_group_detail
              .find({
                group_id: text_group_id,
                sub_group_id: text_sub_group_id,
                pseudo_code: pseudo_code,
              })
              .count();

            if (dtatCount != 0) {
              //return res.json("error");
            } else {
              const inserts_group = new partenr_group_detail({
                partners_id,
                pseudo_code,
                group_id: text_group_id,
                group_name: text_group_name,
                sub_group_id: text_sub_group_id,
                sub_group_name: text_sub_group_name,
              });
              await inserts_group.save();
            }
          }

          const groupname = new Array();
          const groupid = new Array();
          const datajuristicType = await partenr_group_detail
            .find({ pseudo_code: pseudo_code })
            .count();
          if (datajuristicType != 0) {
            const datashow = await partenr_group_detail
              .find({ pseudo_code: pseudo_code })
              .exec();
            for (let i = 0; i < datashow.length; i++) {
              groupid.push(datashow[i].group_id);
              if (datashow[i].sub_group_name == "ไม่พบข้อมูล") {
                groupname.push(datashow[i].group_name);
              } else {
                groupname.push(datashow[i].sub_group_name);
              }
            }
          }

          let group_id = groupid.toString();
          let group_name = groupname.toString();
          let pnrg_id = groupid.toString();

          const update_group = await partenr_group_detail.findOneAndUpdate(
            { pseudo_code: pseudo_code },
            { partners_id: partners_id },
            { new: true }
          );
          /*****************************************************/

          /*****************************************************/
          //รายชื่อผู้ติดต่อ

          //console.log('รายชื่อผู้ติดต่อ',firstname_cp,lastname_cp,phone_cp,position_cp)
          //if (firstname_cp !== "" || lastname_cp !== "" || position_cp !== "" || department_cp !== "" || phone_cp !== "") {
          if (firstname_cp !== "" || phone_cp !== "") {
            // .find({
            //   department: department_cp,
            //   firstname: firstname_cp,
            //   lastname: lastname_cp,
            //   nickname: nickname_cp,
            //   phone: phone_cp,
            //   position: position_cp,
            //   pseudo_code: pseudo_code,
            // })
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
          const update_contact = await contact_person.findOneAndUpdate(
            { pseudo_code: pseudo_code },
            { partners_id: partners_id },
            { new: true }
          );

          const dataSelect = await contact_person
            .find({ pseudo_code: pseudo_code })
            .limit(1);
          const contact_name = dataSelect[0].firstname + " " + dataSelect[0].lastname;
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
                fulladdress: fulladdress_dd,
                province: province_dd,
                province_name: province_dd_name,
                ampur: ampur_dd,
                ampur_name: ampur_dd_name,
                tumbol: tumbol_dd,
                tumbol_name: tumbol_dd_name,
                zipcode: zipcode_dd,
                google_map: google_map_dd,
                file_map,
                file_name,
                status_delete: status_delete,
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
          const update_document = await document.findOneAndUpdate(
            { pseudo_code: pseudo_code },
            { partners_id: partners_id },
            { new: true }
          );
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
          const update_projects = await projects.findOneAndUpdate(
            { pseudo_code: pseudo_code },
            { partners_id: partners_id },
            { new: true }
          );
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
                location: location_shp,
                fulladdress: fulladdress_shp,
                tumbol: tumbol_shp,
                tumbol_name: tumbol_shp_name,
                ampur: ampur_shp,
                ampur_name: ampur_shp_name,
                province: province_shp,
                province_name: province_shp_name,
                zipcode: zipcode_shp,
                google_map: google_map_shp,
                file_google,
                file_name,
                status_delete: status_delete,
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
          const update_shipping = await shipping.findOneAndUpdate(
            { pseudo_code: pseudo_code },
            { partners_id: partners_id },
            { new: true }
          );

          /*************************billing****************************/
          //const status_delete = '0';
          const create_by = "";
          const update_by = "";
          const delete_by = "";
          const inserts_billing = new billing_contacts({
            partners_id: partners_id,
            pseudo_code: pseudo_code,
            firstname: firstname_b,
            lastname: lastname_b,
            nickname: nickname_b,
            position: position_b,
            department: department_b,
            phone: phone_b,
            email: email_b,
            status_delete: status_delete,
            create_date: create_date,
            update_date: update_date,
            create_by: create_by,
            update_by: update_by,
            delete_by: delete_by,
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
              pnrg_id: pnrg_id,
              group_id: group_id,
              group_name: group_name,
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
              contact_name: contact_name,
              contact_phone: contact_phone,
              status_user: status_user,
              create_date: create_date,
              update_date: update_date,
              status_delete: status_delete,
              status_partners: status_partners,
              user_customer: user_customer,
            },
            { new: true }
          );

    //console.log("update_partners", update_partners);
    res.send("ok");

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
};

exports.checkJuristic = async (req, res) => {
  //try {
    const data = req.body.data;
    console.log("checkJuristic", data);
}

exports.all_customer = async (req, res) => {
  try {
    const partners_id = "";
    const status_delete = "0";
    const status_partners = "0";

    const dataCount = await Partners.find({
      status_partners: status_partners,
      status_delete: status_delete,
    }).count();
    if (dataCount != 0) {
      const dataListcustomer = await Partners.find({
        status_partners: status_partners,
        status_delete: status_delete,
      }).sort({ update_date: -1 });
      res.send({ status: "Success", data: dataListcustomer });
    } else {
      res.send({ status: "Error", data: "" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.list_groups = async (req, res) => {
  try {
    const partners_id = "";
    const group_id = req.params.id;
    const status_delete = "0";
    const status_partners = "0";

    const datagroup = await partenr_group_detail
      .find({ group_id: group_id })
      .count();

    if (datagroup != 0) {
      const datashow = await partenr_group_detail
        .find({ group_id: group_id })
        .exec();
      const all = [];
      const parterId = [];

      for (let i = 0; i < datashow.length; i++) {
        all.push(datashow[i].pseudo_code);
        parterId.push(datashow[i].partners_id);
      }

      const count_p = await Partners.find({
        pseudo_code: { $in: all },
        status_delete: status_delete,
        status_partners: status_partners,
      }).count();

      if (count_p != 0) {
        const datacustomerGroup = await Partners.find({
          pseudo_code: { $in: all },
          status_delete: status_delete,
          status_partners: status_partners,
        }).sort({ update_date: -1 });
        // console.log('datashow',datacustomerGroup);

        res.send({ status: "Success", data: datacustomerGroup });
      } else {
        res.send({ status: "Error", data: "" });
      }
    } else {
      res.send({ status: "Error", data: "" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.customer = async (req, res) => {
  try {
    const id = req.params.id;

    const dataListcustomer = await Partners.find({ pseudo_code: id });
    //console.log(dataListcustomer);

    res.send(dataListcustomer);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.billing = async (req, res) => {
  try {
    const id = req.params.id;

    const dataListBilling = await billing_contacts.find({ pseudo_code: id });
    //console.log(dataListBilling);
    res.send(dataListBilling);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.update_partners = async (req, res) => {
  try {
    const data = req.body.data;
    const datas = req.body.datas;
    const group = req.body.data_group;
    const pseudo_code = req.body.id;
    let type_code = req.body.typeCode;
    let duplicate = req.body.duplicate;
    let text_group_id = group.group_id;
    let text_group_name = group.group_name;
    let text_sub_group_id = group.sub_group_id;
    let text_sub_group_name = group.sub_group_name;
    
    //status_images: '',
    let juristic_name_th = req.body.juristic_name_th;
    let juristic_name_en = req.body.juristic_name_en;
    let partners_id_old = req.body.partners_id_old;
    //sub_partners: '',
    let juristic_id = req.body.juristic_id;
    let address_Informations = req.body.address_Informations;
    let branch_number = req.body.branch_number;
    let nationality = req.body.nationality22;
    let other_countries = req.body.other_countries;
    let other_countries_name = req.body.other_countries_name;
    let juristic_other = req.body.juristic_othe;
    //company_photo: '',

    let fulladdress = req.body.fulladdress;
    let province = req.body.province;
    let province_id = req.body.province;
    let province_name = req.body.province_name;
    let amphure = req.body.amphure;
    let amphure_id = req.body.amphure;
    
    let amphure_name = req.body.amphure_name;
    let tumbol = req.body.tumbol;
    let tumbol_name = req.body.tumbol_name;
    let district_id = req.body.tumbol;
    let district_name = req.body.tumbol_name;
    let zipcode = req.body.zipcode;
    let website = req.body.website;
    let email = req.body.email;
    let phone = req.body.phone;
    let google_map = req.body.google_map;


    let firstname_cp = data.firstname_cp;
    let lastname_test = data.lastname_cp;
    let lastname_cp;
    let nickname_cp = data.nickname_cp;
    let position_cp = data.position_cp;
    let department_cp = data.department_cp;
    let phone_cp = data.phone_cp;
    let email_cp = data.email_cp;
    //status_contact: 'Success',


    if(lastname_test === undefined )
    {
      lastname_cp ="";
    }
    else
    {
      lastname_cp = data.lastname_cp;
    }




    //ผู้ติดต่อในการวางบิล
    let firstname_b = datas.firstname_b;
    let lastname_b = datas.lastname_b;
    let nickname_b = datas.nickname_b;
    let position_b = datas.position_b;
    let department_b = datas.department_b;
    let phone_b = datas.phone_b;
    let email_b = datas.email_b;

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

    const status = req.body.statusUser;
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
    const updatedBy = req.body.createdBy;


    const ch_juristic = await Partners.find({juristic_name_th:juristic_name_th,status_delete:'0',}).count();
    const addres1 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'สำนักงานใหญ่',status_delete:'0',}).count();
    const addres2 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'ไม่ระบุ',status_delete:'0',}).count();
    const addres3 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'สาขา',branch_number:branch_number,status_delete:'0',}).count();
    const addres4 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'',status_delete:'0',}).count();



    const addres11 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'สำนักงานใหญ่',status_delete:'0', pseudo_code: pseudo_code,}).count();
    const addres21 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'ไม่ระบุ',status_delete:'0', pseudo_code: pseudo_code,}).count();
    const addres31 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'สาขา',branch_number:branch_number,status_delete:'0', pseudo_code: pseudo_code,}).count();
    const addres41 = await Partners.find({juristic_name_th:juristic_name_th,address_Informations:'',status_delete:'0', pseudo_code: pseudo_code,}).count();
    
    
    if(ch_juristic != 0 && address_Informations == 'สำนักงานใหญ่' && addres1 != 0 && addres11 == 0)
    {
      res.send("1"); 
      return false;
    }
  
   if(ch_juristic != 0 && address_Informations == 'ไม่ระบุ' && addres2 != 0 && addres21 == 0)
   {
      res.send("2"); 
      return false;
    }
    if(ch_juristic != 0 && address_Informations == 'สาขา' && addres3 != 0 && addres31 == 0)
    {
      res.send("3"); 
      return false;
    }
  
    if(ch_juristic != 0 && address_Informations == '' && addres4 != 0 && addres41 == 0)
    {
      res.send("4"); 
      return false;
    }
    

    let status_user = "";
    let partners_id = "";
    if (status !== "อนุมัติ") {
      const codes = "";
      const auto = await auto_partners.findOne({ code: type_code }).exec();
      const seq_new = auto.seq;
      const val_new = auto.val;
      status_user = "อนุมัติ";
      //*** Check Year ***//
    
      let text1 = "0001";
      let Seq = "";
      let nn = "1";
      //*** Check val = year now ***//
      if (auto.year === date1) {
        let text = "000" + "" + seq_new;
        Seq = text.substr(-4, 4);
        partners_id = type_code + "" + val_new + "" + Seq;
        var useq = parseInt(seq_new) + parseInt(nn);
        //*** Update Next Seq ***//
        const update = await auto_partners.findOneAndUpdate(
          { code: type_code },
          { seq: useq },
          { new: true }
        );
      } //*** Check val != year now ***//
      else {
        Seq = text1.substr(-4, 4);
        let new_date = date1.substr(-2, 2);
        partners_id = type_code + "" + new_date + "" + Seq;
        let useq = "1";
        //*** Update New Seq ***//
        const update = await auto_partners.findOneAndUpdate(
          { code: type_code },
          { val: new_date, seq: useq, year: date1 },
          { new: true }
        );
      }
    
      /*******************email********************/
      const datashow = await Partners.find({ pseudo_code: pseudo_code }).exec();
      const username = datashow[0].user_customer.username;
    
      var mailOptions = {
        from: "allsolution@tlogical.com",
        to: username,
        subject: "ยืนยันการสมัครเป็นคู่ค้าธุรกิจกับ BUMRUNGTHAI",
        text: "ขอบคุณที่สมัครเป็นคู่ค้าธุรกิจกับ BUMRUNGTHAI  บัญชีของคุณได้รับการยืนยันแล้วโดยคุณสามารถเข้าสู่ระบบเพื่อทำการสั่งซื้อสินค้าได้ที่ www.bumrungthai.com",
      };
      connectEmail.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.send("ok");
        }
      });
    
      /*******************************************/
    } else {
      partners_id = req.body.partnersId;
      status_user = "อนุมัติ";
    }
    
    console.log("aaaaa", text_group_id, text_sub_group_id);
    /*****************************************************/
    //เช็คกรณีมีกลุ่มเข้ามาด้วย เช็กว่ามีข้อมูลแล้วหรือยังถ้ายังให้บันทึกก่อน undefined
    if (text_group_id === "" || text_group_id === undefined) {
      console.log("99999999");
    } else {
      const dtatCount = await partenr_group_detail
        .find({
          group_id: text_group_id,
          sub_group_id: text_sub_group_id,
          pseudo_code: pseudo_code,
        })
        .count();
    
      if (dtatCount != 0) {
        //return res.json("error");
      } else {
        const inserts_group = new partenr_group_detail({
          partners_id,
          pseudo_code,
          group_id: text_group_id,
          group_name: text_group_name,
          sub_group_id: text_sub_group_id,
          sub_group_name: text_sub_group_name,
        });
        await inserts_group.save();
        //console.log('inserts_group',inserts_group);
      }
    }
    
    const groupname = new Array();
    const groupid = new Array();
    const datajuristicType = await partenr_group_detail
      .find({ pseudo_code: pseudo_code })
      .count();
    if (datajuristicType != 0) {
      const datashow = await partenr_group_detail
        .find({ pseudo_code: pseudo_code })
        .exec();
      for (let i = 0; i < datashow.length; i++) {
        groupid.push(datashow[i].group_id);
        if (datashow[i].sub_group_name == "ไม่พบข้อมูล") {
          groupname.push(datashow[i].group_name);
        } else {
          groupname.push(datashow[i].sub_group_name);
        }
      }
    }
    
    let group_id = groupid.toString();
    let group_name = groupname.toString();
    let pnrg_id = groupid.toString();
    
    const update_group = await partenr_group_detail.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { partners_id: partners_id },
      { new: true }
    );
    // console.log('update_group',update_group);
    /*****************************************************/
    /*****************************************************/
    //รายชื่อผู้ติดต่อ
          //lastname_cp !== "" ||
      //nickname_cp !== "" ||
     // position_cp !== "" ||
      //department_cp !== "" ||
    if (firstname_cp !== "" || phone_cp !== "") {
      const dtatCount = await contact_person.find({email: email_cp,firstname: firstname_cp,phone: phone_cp,pseudo_code: pseudo_code}).count();
      if (dtatCount != 0) {
        //return res.json("error");
      } else {
        //const status_delete = "0";
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
    const update_contact = await contact_person.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { partners_id: partners_id },
      { new: true }
    );
    
    const dataSelect = await contact_person
      .find({ pseudo_code: pseudo_code })
      .limit(1);
    const contact_name = dataSelect[0].firstname + " " + dataSelect[0].lastname;
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
          fulladdress: fulladdress_dd,
          province: province_dd,
          province_name: province_dd_name,
          ampur: ampur_dd,
          ampur_name: ampur_dd_name,
          tumbol: tumbol_dd,
          tumbol_name: tumbol_dd_name,
          zipcode: zipcode_dd,
          google_map: google_map_dd,
          file_map,
          file_name,
          status_delete: status_delete,
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
    const update_document = await document.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { partners_id: partners_id },
      { new: true }
    );
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
    const update_projects = await projects.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { partners_id: partners_id },
      { new: true }
    );
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
          location: location_shp,
          fulladdress: fulladdress_shp,
          tumbol: tumbol_shp,
          tumbol_name: tumbol_shp_name,
          ampur: ampur_shp,
          ampur_name: ampur_shp_name,
          province: province_shp,
          province_name: province_shp_name,
          zipcode: zipcode_shp,
          google_map: google_map_shp,
          file_google,
          file_name,
          status_delete: status_delete,
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
    const update_shipping = await shipping.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { partners_id: partners_id },
      { new: true }
    );
    /*************************billing****************************/
    const create_by = "";
    const update_by = "";
    const delete_by = "";
    
    const inserts_billing = await billing_contacts.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      {
        firstname: firstname_b,
        lastname: lastname_b,
        nickname: nickname_b,
        position: position_b,
        department: department_b,
        phone: phone_b,
        email: email_b,
        update_date: update_date,
        update_by: update_by,
      },
      { new: true }
    );
    
    //console.log('inserts_billing',inserts_billing);
    /*****************************************************/
    const update = await Partners.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      {
        partners_id: partners_id,
        pnrg_id: pnrg_id,
        group_id: group_id,
        group_name: group_name,
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
        contact_name: contact_name,
        contact_phone: contact_phone,
        status_user: status_user,
        update_date: update_date,
        status_delete: status_delete,
        updatedBy,
        status_partners: status_partners,
      },
      { new: true }
    );
    // console.log("update", update);


    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
};

exports.remov_partner_all = async (req, res) => {
  try {
    const id = req.params.id;
    const status_delete = "1";
    const update_partner = await Partners.findOneAndUpdate(
      { pseudo_code: id },
      { status_delete: status_delete },
      { new: true }
    );
    //console.log(update_partner);
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.duplicate = async (req, res) => {
  try {
    const code_old = req.body.data;
    let pseudo_code = Math.floor(Math.random() * 10000000) + 1;

    const data = await Partners.find({ pseudo_code: code_old }).exec();
    const username = data[0].user_customer.username;
    const password = data[0].user_customer.password;
    const password_text = data[0].user_customer.password_text;
    const type_code = data[0].type_code;
    const juristic_id = "";
    const user_customer = {
      username: username,
      password: password,
      password_text: password_text,
    };
   

    var dt = datetime.create();
    var date1 = dt.format("Y");
    var date2 = dt.format("m");
    var check_date = date1 + "" + date2;
    var datatime_create = dt.format("Y-m-d H:M:S");

    const create_date = dt.format("Y-m-d H:M:S");
    const update_date = dt.format("Y-m-d H:M:S");

    const codes = "";
    const auto = await auto_partners.findOne({ code: type_code }).exec();
    const seq_new = auto.seq;
    const val_new = auto.val;
    //*** Check Year ***//
    var partners_id = "";
    let text1 = "0001";
    let Seq = "";
    let nn = "1";
    //*** Check val = year now ***//
    if (auto.year === date1) {
      let text = "000" + "" + seq_new;
      Seq = text.substr(-4, 4);
      partners_id = type_code + "" + val_new + "" + Seq;
      var useq = parseInt(seq_new) + parseInt(nn);
      //*** Update Next Seq ***//
      const update = await auto_partners.findOneAndUpdate(
        { code: type_code },
        { seq: useq },
        { new: true }
      );
    } //*** Check val != year now ***//
    else {
      Seq = text1.substr(-4, 4);
      let new_date = date1.substr(-2, 2);
      partners_id = type_code + "" + new_date + "" + Seq;
      let useq = "1";
      //*** Update New Seq ***//
      const update = await auto_partners.findOneAndUpdate(
        { code: type_code },
        { val: new_date, seq: useq, year: date1 },
        { new: true }
      );
    }
    /*****************************************************/
    const group = await partenr_group_detail
      .find({ pseudo_code: code_old })
      .exec();
    for (let i = 0; i < group.length; i++) {
      const inserts_group = new partenr_group_detail({
        partners_id: partners_id,
        pseudo_code: pseudo_code,
        group_id: group[i].group_id,
        group_name: group[i].group_name,
        sub_group_id: group[i].sub_group_id,
        sub_group_name: group[i].sub_group_name,
      });
      await inserts_group.save();
    }
    /*****************************************************/
    /*****************************************************/

    const dtatCount = await contact_person
      .find({ pseudo_code: code_old })
      .count();
    if (dtatCount != 0) {
      const counts = await contact_person
        .find({ pseudo_code: code_old })
        .exec();
      for (let a = 0; a < counts.length; a++) {
        const inserts_contact = new contact_person({
          partners_id: partners_id,
          pseudo_code: pseudo_code,
          number: counts[a].number,
          department: counts[a].department,
          email: counts[a].email,
          firstname: counts[a].firstname,
          lastname: counts[a].lastname,
          nickname: counts[a].nickname,
          phone: counts[a].phone,
          position: counts[a].position,
          status_delete: counts[a].status_delete,
          auto_id: counts[a].auto_id,
          createdBy: counts[a].createdBy,
          updatedBy: counts[a].updatedBy,
          deletedBy: counts[a].deletedBy,
          createdAt: create_date,
          updatedAt: update_date,
        });
        await inserts_contact.save();
      }
    }

    /*****************************************************/
    /*****************************************************/

    /*****************************************************/
    //ที่อยู่จัดส่งเอกสาร

    const dtatCount1 = await document.find({ pseudo_code: code_old }).count();
    if (dtatCount1 != 0) {
      const doc = await document.find({ pseudo_code: code_old }).exec();
      for (let n = 0; n < doc.length; n++) {
        const inserts_document = new document({
          partners_id: partners_id,
          pseudo_code: pseudo_code,
          fulladdress: doc[n].fulladdress,
          province: doc[n].province,
          province_name: doc[n].province_name,
          ampur: doc[n].ampur,
          ampur_name: doc[n].ampur_name,
          tumbol: doc[n].tumbol,
          tumbol_name: doc[n].tumbol_name,
          zipcode: doc[n].zipcode,
          google_map: doc[n].google_map,
          file_map: doc[n].file_map,
          file_name: doc[n].file_name,
          status_delete: doc[n].status_delete,
          create_date: create_date,
          update_date: update_date,
          create_by: doc[n].create_by,
          update_by: doc[n].update_by,
          delete_by: doc[n].delete_by,
        });
        await inserts_document.save();
        // console.log('inserts_document',inserts_document);
      }
    }

    /*****************************************************/
    /*****************************************************/
    //โครงการ
    const dtatCount2 = await projects.find({ pseudo_code: code_old }).count();
    if (dtatCount2 != 0) {
      const pro = await projects.find({ pseudo_code: code_old }).exec();
      for (let j = 0; j < pro.length; j++) {
        const inserts_pro = new projects({
          partners_id: partners_id,
          pseudo_code: pseudo_code,
          project_name: pro[j].project_name,
        });
        await inserts_pro.save();
      }
    }

    /*****************************************************/

    /*****************************************************/
    //ที่อยู่จัดส่งสินค้า

    const dtatCount3 = await shipping.find({ pseudo_code: code_old }).count();
    if (dtatCount3 != 0) {
      const shp = await shipping.find({ pseudo_code: code_old }).exec();
      for (let k = 0; k < shp.length; k++) {
        const inserts_shipping = new shipping({
          partners_id: partners_id,
          pseudo_code: pseudo_code,
          location: shp[k].location,
          fulladdress: shp[k].fulladdress,
          tumbol: shp[k].tumbol,
          tumbol_name: shp[k].tumbol_name,
          ampur: shp[k].ampur,
          ampur_name: shp[k].ampur_name,
          province: shp[k].province,
          province_name: shp[k].province_name,
          zipcode: shp[k].zipcode,
          google_map: shp[k].google_map,
          file_google: shp[k].file_google,
          file_name: shp[k].file_name,
          status_delete: shp[k].status_delete,
          create_date: create_date,
          update_date: update_date,
          create_by: shp[k].create_by,
          update_by: shp[k].update_by,
          delete_by: shp[k].delete_by,
        });
        await inserts_shipping.save();
      }
    }

    /*************************billing****************************/
    //const status_delete = '0';
    const bl = await billing_contacts.find({ pseudo_code: code_old }).exec();
    const inserts_billing = new billing_contacts({
      partners_id: partners_id,
      pseudo_code: pseudo_code,
      firstname: bl[0].firstname,
      lastname: bl[0].lastname,
      nickname: bl[0].nickname,
      position: bl[0].position,
      department: bl[0].department,
      phone: bl[0].phone,
      email: bl[0].email,
      status_delete: bl[0].status_delete,
      create_date: create_date,
      update_date: update_date,
      create_by: bl[0].create_by,
      update_by: bl[0].update_by,
      delete_by: bl[0].delete_by,
    });
    await inserts_billing.save();

    /*****************************************************/
    const dtatCount4 = await companyPhoto
      .find({ pseudo_code: code_old })
      .count();
    if (dtatCount4 != 0) {
      const img = await companyPhoto.find({ pseudo_code: code_old }).exec();
      for (let j = 0; j < img.length; j++) {
        const inserts = new companyPhoto({
          partners_id: partners_id,
          pseudo_code: pseudo_code,
          filename: img[j].filename,
          originalname: img[j].originalname,
          type: img[j].type,
          filenam: img[j].filenam,
          size: img[j].size,
          statusDelete: img[j].statusDelete,
          createDate: img[j].createDate,
          updateDate: img[j].updateDate,
          createBy: img[j].createBy,
          updateBy: img[j].updateBy,
          deleteBy: img[j].deleteBy,
        }).save();
      }
    }

    /*****************************************************/
    let  user_level = {
      email:req.body.userEmail,
      department_id:req.body.userDepartmen,
      division_id:req.body.userDivision,
      level:req.body.userLevel,
      name_en:req.body.userNameEn,
      name_th:req.body.userNameTh,
      section_id:req.body.userSection,
      }
    const code = new Partners({
      pseudo_code: pseudo_code,
      partners_id: partners_id,
      partners_id_old: data[0].partners_id_old,
      auto_id: data[0].auto_id,
      user_type: data[0].user_type,
      person_type_id: data[0].person_type_id,
      person_type_name: data[0].person_type_name,
      type_code: data[0].type_code,
      juristic_type_id: data[0].juristic_type_id,
      juristic_type_name: data[0].juristic_type_name,
      juristic_other: data[0].juristic_other,
      juristic_id: juristic_id,
      juristic_name_th: data[0].juristic_name_th,
      juristic_name_en: data[0].juristic_name_en,
      pnrg_id: data[0].pnrg_id,
      pnrg_type_id: data[0].pnrg_type_id,
      group_id: data[0].group_id,
      group_name: data[0].group_name,
      sub_id: data[0].sub_id,
      address_Informations: data[0].address_Informations,
      branch_number: data[0].branch_number,
      nationality: data[0].nationality,
      country_id: data[0].country_id,
      other_countries: data[0].other_countries,
      other_countries_name: data[0].other_countries_name,
      company_image: data[0].company_image,
      address_name: data[0].address_name,
      fulladdress: data[0].fulladdress,
      building: data[0].building,
      room_no: data[0].room_no,
      floor: data[0].floor,
      village_name: data[0].village_name,
      address_no: data[0].address_no,
      moo: data[0].moo,
      soi: data[0].soi,
      road: data[0].road,
      district_id: data[0].district_id,
      district_name: data[0].district_name,
      tumbol: data[0].tumbol,
      tumbol_name: data[0].tumbol_name,
      amphure: data[0].amphure,
      amphure_id: data[0].amphure_id,
      amphure_name: data[0].amphure_name,
      province: data[0].province,
      province_id: data[0].province_id,
      province_name: data[0].province_name,
      zipcode: data[0].zipcode,
      phone: data[0].phone,
      email: data[0].email,
      website: data[0].website,
      google_map: data[0].google_map,
      company_map: data[0].company_map,
      company_map_file: data[0].company_map_file,
      company_certificate_file: data[0].company_certificate_file,
      company_certificate: data[0].company_certificate,
      vat_registration_file: data[0].vat_registration_file,
      vat_registration: data[0].vat_registration,
      company_seal_file: data[0].company_seal_file,
      company_seal: data[0].company_seal,
      payment_method: data[0].payment_method,
      other_payment_method: data[0].other_payment_method,
      billing: data[0].billing,
      other_billing: data[0].other_billing,
      file_billing: data[0].file_billing,
      file_billing_name: data[0].file_billing_name,
      contact_person_id: data[0].contact_person_id,
      request_credit: data[0].request_credit,
      credit: data[0].credit,
      contact_name: data[0].contact_name,
      contact_phone: data[0].contact_phone,
      status_user: data[0].status_user,
      status_delete: data[0].status_delete,
      createdBy: req.body.createdBy,
      updatedBy: data[0].updatedBy,
      createdAt: data[0].createdAt,
      updatedAt: data[0].updatedAt,
      create_date: create_date,
      update_date: update_date,
      create_by: data[0].create_by,
      update_by: data[0].update_by,
      delete_by: data[0].delete_by,
      status_partners: data[0].status_partners,
      user_customer: user_customer,
      duplicate:code_old,
      user_level:user_level,
      users_id:req.body.userId,
      level_create:req.body.userLevel,
    });
    await code.save();
    console.log("pseudo_code", code);

    res.json(pseudo_code);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    ////logger.error("error-file", { message: "Server Error!!" });
  }
};

exports.delete_partners = async (req, res) => {
  const dataDelete1 = await Partners.deleteMany({});
  const dataDelete2 = await billing_contacts.deleteMany({});
  const dataDelete3 = await companyPhoto.deleteMany({});
  const dataDelete4 = await contact_person.deleteMany({});
  
  const dataDelete6 = await document.deleteMany({});
  const dataDelete7 = await partenr_group_detail.deleteMany({});
  const dataDelete8 = await projects.deleteMany({});
  const dataDelete9 = await shipping.deleteMany({});

  res.send("ok");
};
