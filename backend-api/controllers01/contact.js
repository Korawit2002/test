const contact_person = require("../models/Contacts");

exports.create_contact = async (req, res) => {
    try {
      //const data = JSON.parse(req.body.data);
      // const partners_id = '';
      // const pseudo_code = data.pseudo_code;
      // const number= '';
      // const  department = data.department_cp;
      // const  email = data.email_cp;
      // const  firstname = data.firstname_cp;
      // const  lastname = data.lastname_cp;
      // const  nickname = data.nickname_cp;
      // const  phone = data.phone_cp;
      // const  position = data.position_cp;
      // const status_delete = '0';
      // const auto_id = '';
      // const createdBy= '';
      // const updatedBy= '';
      // const deletedBy= '';
      // const createdAt= '';
      // const updatedAt= '';
      // const inserts = new contact_person({
      //   partners_id,
      //   pseudo_code,
      //   number,
      //   department,
      //   email,
      //   firstname,
      //   lastname,
      //   nickname,
      //   phone,
      //   position,
      //   status_delete,
      //   auto_id,
      //   createdBy,
      //   updatedBy,
      //   deletedBy,
      //   createdAt,
      //   updatedAt,
    
      // });
      // await inserts.save();
      console.log(req.body.data);
      //res.json("ok");
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
        res.send(datalistContact);
        //console.log(datalistContact);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
  };

  
  exports.remov_contact = async (req, res) => {
    try{
        const id = req.params.id;
        const dataDelete = await contact_person.deleteOne({_id:id});
        res.send('ok');
       

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }