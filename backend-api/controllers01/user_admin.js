const bcrypt = require('bcryptjs')
const users_admin = require("../models/UserAdmin");
const datetime = require("node-datetime");
const main_stucture = require("../models/MainStucture");
const sub_stucture = require("../models/MainStucture");
const child_stucture = require("../models/MainStucture");
const roles = require("../models/Role");

exports.list_admin = async (req, res) => {
   try{

       const status = '1';
       const user = 'admin@tlogical.com';
       //const users = await users_admin.find({status:status,email!= user}).sort({obj_update_date : -1})
       const users = await users_admin.find({ status: status, email: { $ne: user } }).sort({ obj_update_date: -1 })
       .select("admin_id")
       .select("title")
       .select("firstname")
       .select("lastname")
       .select("email")
       .select("main_stucture_id")
       .select("main_stucture_name")
       .select("sub_stucture_id")
       .select("sub_stucture_name")
       .select("child_stucture_id")
       .select("child_stucture_name")
       .select("child_stucture_four_id")
       .select("child_stucture_four_name")
       .select("company_id")
       .select("position_meeting")
       .select("role_id")
       .select("role_name")
       .select("phone_number")
       .select("username")
       .select("role_id")
       .select("profile_image")
       .exec();
      // console.log("users",users);
       res.send(users);
   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}
exports.details_admin = async (req, res) => {
  try{
     //  const menuItem = await user.find({})
     //  res.send(menuItem);

      const status = '1';
      const userItem = await users_admin.find({status:status})
      res.send(userItem);


  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}

 exports.create_admin = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      let password_random ='123456';

      const email_new = data.email ? data.email.toLowerCase() : null;
      const username_new = data.username ? data.username.toLowerCase() : null;
      const profile_image = req.file ? req.file.path : '';

      const random = password_random;
      var salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash('123456', salt)
      const password = hash;
      const admin_id = Math.floor(Math.random() * 10000000) + 1;
      const title = data.title;
      const firstname = data.firstname;
      const lastname = data.lastname;
      const email = email_new;
      const phone_number = data.phone_number;
      const spare_numbe = '';
      const address = '';
      const province_id = '';
      const province = '';
      const amphures_id = '';
      const amphures = '';
      const tombons_id = '';
      const tombons = '';
      const zip_code = '';
      const line_id = '';
      const profile = '';
      const main_stucture_id  = data.main_stucture_id;
      const main_stucture_name  = data.main_stucture_name;
      const sub_stucture_id  = data.sub_stucture_id;
      const sub_stucture_name  = data.sub_stucture_name;
      const child_stucture_id  = data.child_stucture_id;
      const child_stucture_name  = data.child_stucture_name;
      const child_stucture_four_id  = data.child_stucture_four_id;
      const child_stucture_four_name  = data.child_stucture_four_name;
      const username  = username_new;
      const status = '1';
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_admin_id = data.admin_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_admin_id = '';
      const company_id = data.company_id;
      
      const position_meeting = data.position_id;
      const position_meeting_name = '';
      const role_id = data.role_id;
      const role_name = data.role_name;
      const status_login = "Active";
      const delegate_position ='';

      const users = new users_admin({
         admin_id,
         title,
         firstname,
         lastname,
         email,
         phone_number,
         spare_numbe,
         address,
         province_id,
         province,
         amphures_id,
         amphures,
         tombons_id,
         tombons,
         zip_code,
         line_id,
         profile,
         main_stucture_id,
         main_stucture_name,
         sub_stucture_id,
         sub_stucture_name,
         child_stucture_id,
         child_stucture_name,
         child_stucture_four_id,
         child_stucture_four_name,
         username,
         password,
         random,
         status,
         obj_created_date,
         obj_created_admin_id,
         obj_update_date,
         obj_update_admin_id,
         company_id,
         position_meeting,
         position_meeting_name,
         role_id,
         role_name,
         profile_image,
         delegate_position,
         status_login
    });
    await users.save();
    res.status(200).send(users);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_admin = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();

      const admin_id = data.admin_id;
      const title = data.title;
      const firstname = data.firstname;
      const lastname = data.lastname;
      const email = data.email;
      const phone_number = data.phone_number;
      const main_stucture_id  = data.main_stucture_id;
      const main_stucture_name  = data.main_stucture_name;
      const sub_stucture_id  = data.sub_stucture_id;
      const sub_stucture_name  = data.sub_stucture_name;
      const child_stucture_id  = data.child_stucture_id;
      const child_stucture_name  = data.child_stucture_name;
      const child_stucture_four_id  = data.child_stucture_four_id;
      const child_stucture_four_name  = data.child_stucture_four_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_admin_id = data.obj_created_admin_id;
      const role_id = data.role_id;
      const role_name = data.role_name;
      const profile_image = data.profile_image;
      

    const update_user = await users_admin.findOneAndUpdate(
      { admin_id: admin_id },
      { 
        title:title,
        firstname:firstname,
        lastname:lastname,
        email:email,
        phone_number:phone_number,
        main_stucture_id:main_stucture_id,
        main_stucture_name:main_stucture_name,
        sub_stucture_id:sub_stucture_id,
        sub_stucture_name:sub_stucture_name,
        child_stucture_id:child_stucture_id,
        child_stucture_name:child_stucture_name,
        child_stucture_four_id:child_stucture_four_id,
        child_stucture_four_name:child_stucture_four_name,
        obj_update_date:obj_update_date,
        obj_update_admin_id:obj_update_admin_id,
        role_id:role_id,
        role_name:role_name,
        profile_image:profile_image,
      },
      { new: true } 
    );
    res.status(200).send(update_user);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_admin = async (req, res) => {
   try {
      const admin_id = req.params.admin_id;
   
      const dataDelete = await users_admin.findOneAndDelete({admin_id:admin_id});
      const status = '1';
      const userItem = await users_admin.find({status:status})

      res.status(200).send(userItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}



exports.list_admin_byid = async (req, res) => {
   try {
      const admin_id = req.params.id;
   
      const getmenu = await users_admin.find({admin_id:admin_id})
      console.log(getmenu);
      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}




exports.change_password_admin = async (req, res) => {
  try {
    // Rename destructured admin_id to avoid conflict with the user module
    const { admin_id, old_password, new_password } = req.body;

    // Use the user module to find the user by ID
    const userRecord = await users_admin.findOne({ admin_id: admin_id });
    if (!userRecord) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(old_password, userRecord.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'รหัสผ่านเดิมไม่ถูกต้อง' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Update the user's password
    userRecord.password = hashedPassword;
    await userRecord.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};