const contact_person = require("../models/Contacts");

exports.create_contacts = async (req, res) => {
  try {
    const data = req.body.data_contact;
    const pseudo_code = req.body.id;
    const partners_id = "";
    const number = "";
    const department = data.department_cp;
    const email = data.email_cp;
    const firstname = data.firstname_cp;
    const lastname_test = data.lastname_cp;
    const nickname = data.nickname_cp;
    const phone = data.phone_cp;
    const position = data.position_cp;
    const status_delete = "0";
    const auto_id = "";
    const createdBy = "";
    const updatedBy = "";
    const deletedBy = "";
    const createdAt = "";
    const updatedAt = "";
    let lastname;

   if(lastname_test === undefined )
   {
    lastname ="";
   }
   else
   {
    lastname = data.lastname_cp;
   }

    //console.log("data", phone, email, firstname, lastname);
//    if (department === undefined ||firstname === undefined || lastname === undefined || nickname === undefined ||phone === undefined ||position === undefined) {

    if (firstname === undefined ||phone === undefined) {
     
      return res.json("error");
    } else {
      let dtatCount = "";
      //console.log('ddddd');
      if (data.email_cp !== "" || data.email_cp !== undefined) {
        const dtatCount = await contact_person
          .find({
            $or: [{ phone: data.phone_cp }, { email: data.email_cp }],
            pseudo_code: req.body.id,
          })
          .count();
      } else {
        const dtatCount = await contact_person
          .find({ $or: [{ phone: data.phone_cp }], pseudo_code: req.body.id })
          .count();
      }
      //console.log("dtatCount22",dtatCount22);
      //const dtatCount33 = await contact_person.find({$or: [ {"phone":data.phone_cp }, {"email":data.email_cp }],pseudo_code:req.body.id });
      //console.log("dtatCount22",dtatCount33);
      // console.log("dtatCount",dtatCount);
      if (dtatCount != 0) {
        //return res.json('error');
        console.log("dtatCount1", dtatCount);
      } else {
        console.log("dtatCount2", dtatCount);
        const inserts = new contact_person({
          partners_id,
          pseudo_code,
          number,
          department,
          email,
          firstname,
          lastname,
          nickname,
          phone,
          position,
          status_delete,
          auto_id,
          createdBy,
          updatedBy,
          deletedBy,
          createdAt,
          updatedAt,
        });
        await inserts.save();
        //console.log(inserts);
        res.json("ok");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.contact_list = async (req, res) => {
  try {
    const id = req.params.id;
    const dtatCount = await contact_person.find({ pseudo_code: id }).count();

    if (dtatCount != 0) {
      const datalistContact = await contact_person.find({ pseudo_code: id });
      res.send({ status: "Success", data: datalistContact });
    } else {
      res.send({ status: "Error", data: "" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.remov_contact = async (req, res) => {
  try {
    const id = req.params.id;
    const dataDelete = await contact_person.deleteOne({ _id: id });
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};
