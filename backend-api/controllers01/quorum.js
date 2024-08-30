const quorum = require("../models/Quorum");
const table_formats = require("../models/Format");
const datetime = require("node-datetime");
const attendees = require("../models/Attendees");
const attendees_meeting = require("../models/AttendeesByMeeting");
const pms_current =require("../models/PermissionCurrent");
const user = require("../models/User");
const bcrypt = require('bcryptjs')
const meetings = require("../models/Meeting");
exports.list_quorum = async (req, res) => {
   try{
       const menuItem = await quorum.find({})
      //  .sort({ obj_update_date: -1 });
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_quorum = async (req, res) => {

   try {
      const data = req.body;
      const result = await quorum.insertMany(data);
      //console.log(data);
    //   var dt = datetime.create();
    //   const quorum_id = Math.floor(Math.random() * 10000000) + 1;
    //   const meeting_id = data.meeting_id;
    //   const user_id = data.user_id;
    //   const title = data.title;
    //   const first_name = data.first_name;
    //   const last_name = data.last_name;
    //   const main_stucture = data.main_stucture;
    //   const sub_stucture = data.sub_stucture;
    //   const child_stucture = data.child_stucture;
    //   const email = data.email;
    //   const position_id = data.position_id;
    //   const position_name = data.position_name;
    //   const obj_created_date = dt.format("Y-m-d H:M:S");
    //   const obj_created_user_id = '1000';
    //   const obj_update_date = dt.format("Y-m-d H:M:S");
    //   const obj_update_user_id = '';

    // const insert = new quorum({
    //     quorum_id,
    //     meeting_id,
    //     user_id,
    //     title,
    //     first_name,
    //     last_name,
    //     main_stucture,
    //     sub_stucture,
    //     child_stucture,
    //     email,
    //     position_id,
    //     position_name,
    //     obj_created_date,
    //     obj_created_user_id,
    //     obj_update_date,
    //     obj_update_user_id
    //      });
    // await insert.save();

    
    res.status(200).send(result);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }



// exports.update_quorum= async (req, res) => {
//    try {

//       const data = req.body;
//       var dt = datetime.create();
//       const type_id = data.type_id;
//       const type_name = data.type_name;
//       const obj_update_date = dt.format("Y-m-d H:M:S");
      

//     const update_menu = await quorum.findOneAndUpdate(
//       { type_id: type_id },
//       { type_name: type_name,obj_update_date: obj_update_date},
//       { new: true } 
//     );
//     res.status(200).send(update_menu);

//    } catch (err) {
//      console.log(err);
//      res.status(400).send("Server Error!!");
//      // logger.error("error-file", { message: "Server Error!!" });
//    }
//  };
 

  
 exports.delete_quorum = async (req, res) => {
   try {
      const quorum_id = req.params.quorum_id;
      const select = await quorum.find({quorum_id:quorum_id})
      const userIds = await quorum.find({quorum_id:quorum_id})
   
      const dataDelete = await quorum.findOneAndDelete({quorum_id:quorum_id});
      const dataDelete1 = await attendees_meeting.findOneAndDelete({user_id:userIds[0].user_id,meeting_id:select[0].meeting_id});
      const dataDelete3 = await pms_current.findOneAndDelete({user_id:userIds[0].user_id,meeting_id:select[0].meeting_id});

      const menuItem = await quorum.find({})



      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.search_quorum = async (req, res) => {
  try {
   
   const meeting_id = req.params.meeting_id;

   const joinedMeetings = await quorum.aggregate([
     {
       $match: {
         meeting_id: meeting_id
       }
     },
     {
       $lookup: {
         from: "users",
         localField: "user_id",
         foreignField: "user_id",
         as: "user"
       }
     },
     {
       $lookup: {
         from: "table_formats",
         localField: "meeting_id",
         foreignField: "meeting_id",
         as: "formats"
       }
     },
    //  {
    //    // Sort by 'obj_update_date' in descending order to get the latest updated records first
    //    $sort: { obj_update_date: -1 }
    //  }
   ]);

   res.json(joinedMeetings);

  } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
  }
}

exports.update_status_response= async (req, res) => {
  try {

     const data = req.body;
     var dt = datetime.create();
     const meeting_id = data.meeting_id;
     const user_id_new = data.user_id;
     const status_response = data.status_response;
     const obj_update_date = dt.format("Y-m-d H:M:S");
     const delegate_title = data.delegate_title;
     const delegate_name = data.delegate_name;
     const delegate_email = data.delegate_email;
     const delegate_position = data.delegate_position;
     const delegate_lastname = data.delegate_lastname;
     let status_login;
     let status_request;
     let user_id_delegate;
     if(status_response === 'ส่งผู้แทน')
     {
      status_login = "Request";
      status_request = 'รออนุญาต';
      user_id_delegate = "";
     }
     else
     {
      status_login = "";
      status_request = '';
      user_id_delegate = "";

     }
 

    const request = await meetings.findOneAndUpdate(
    {meeting_id: meeting_id},
    {request_user:status_login},
    {new: true}
    );
     
    const update_menu1 = await quorum.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id_new },
     { status_response: status_response,
       delegate_title:delegate_title,
       delegate_lastname:delegate_lastname,
       delegate_name:delegate_name,
       delegate_email:delegate_email,
       delegate_position:delegate_position,
       status:status_login,
       status_request:status_request,
       obj_update_date: obj_update_date,
       user_id_delegate:user_id_delegate},
     { new: true } 
   );
   const update_menu2 = await attendees.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id_new },
     { status_response: status_response,
       delegate_title:delegate_title,
       delegate_name:delegate_name,
       delegate_lastname:delegate_lastname,
       delegate_email:delegate_email,
       delegate_position:delegate_position,
       status:status_login,
       status_request:status_request,
       obj_update_date: obj_update_date,
       user_id_delegate:user_id_delegate},
     { new: true } 
   );
   const update_menu3 = await attendees_meeting.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id_new },
     { status_response: status_response,
      delegate_title:delegate_title,
      delegate_name:delegate_name,
      delegate_lastname:delegate_lastname,
      delegate_email:delegate_email,
      delegate_position:delegate_position,
      status:status_login,
      status_request:status_request,
      obj_update_date: obj_update_date,
      user_id_delegate:user_id_delegate},
     { new: true } 
   );


   if(status_response === 'ส่งผู้แทน')
   {

    let password_random ='123456';
    const email_new = data.delegate_email ? data.delegate_email.toLowerCase() : null;
    const username_new = data.delegate_email ? data.delegate_email.toLowerCase() : null;

    const ch_users = await user.find({email:email_new})
    const user_id = Math.floor(Math.random() * 10000000) + 1;



    const profile_image = '';
    const random = password_random;
    var salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash('123456', salt)
    const password = hash;
    const title = data.delegate_title;
    const firstname = data.delegate_name;
    const lastname = data.delegate_lastname;
    const email = email_new;
    const phone_number = '';
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
    const main_stucture_id  = '';
    const main_stucture_name  = '';
    const sub_stucture_id  = '';
    const sub_stucture_name  = '';
    const child_stucture_id  = '';
    const child_stucture_name  = '';
    const child_stucture_four_id  = '';
    const child_stucture_four_name  = '';
    const username  = username_new;
    const status = '1';
    const obj_created_date = dt.format("Y-m-d H:M:S");
    const obj_created_user_id = '';
    const obj_update_user_id = '';
    const company_id = '9631588';
    const position_meeting = '';
    const position_meeting_name = '';
    const role_id = '9072175';
    const role_name = 'สิทธิ์คณะกรรมการ / ผู้เข้าร่วมประชุม';

    if(ch_users.length === 0)
    {

        const users = new user({
          user_id,
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
          obj_created_user_id,
          obj_update_date,
          obj_update_user_id,
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

        const update_menu1 = await quorum.findOneAndUpdate(
          { meeting_id: meeting_id,user_id:user_id_new },
          { user_id_delegate: user_id},
          { new: true } 
        );
        const update_menu2 = await attendees.findOneAndUpdate(
          { meeting_id: meeting_id,user_id:user_id_new },
          { user_id_delegate: user_id},
          { new: true } 
        );
        const update_menu3 = await attendees_meeting.findOneAndUpdate(
          { meeting_id: meeting_id,user_id:user_id_new },
          { user_id_delegate: user_id},
          { new: true } 
        );


    }
  }
   res.status(200).send('ok');

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
 }

exports.update_status_response_root= async (req, res) => {
  try {

     const data = req.body;
     var dt = datetime.create();
     const meeting_id = data.meeting_id;
     const user_id = data.user_id;
     const status_response = data.status_response;

     
   const update_menu1 = await quorum.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id },
     { status_response: status_response},
     { new: true } 
   );
   const update_menu2 = await attendees.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id },
     { status_response: status_response},
     { new: true } 
   );
   const update_menu3 = await attendees_meeting.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id },
     { status_response: status_response},
     { new: true } 
   );


   res.status(200).send('ok');

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
 }

 

exports.update_status_endorse= async (req, res) => {
  try {

     const data = req.body;
     var dt = datetime.create();
     const meeting_id = data.meeting_id;
     const user_id = data.user_id;
     const status_certification = data.status_certification;
     const obj_update_date = dt.format("Y-m-d H:M:S");
     
   const update_menu1 = await quorum.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id },
     { status_certification: status_certification,obj_update_date: obj_update_date},
     { new: true } 
   );
   const update_menu2 = await attendees.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id },
     { status_certification: status_certification,obj_update_date: obj_update_date},
     { new: true } 
   );
   const update_menu3 = await attendees_meeting.findOneAndUpdate(
     { meeting_id: meeting_id,user_id:user_id },
     { status_certification: status_certification,obj_update_date: obj_update_date},
     { new: true } 
   );
   res.status(200).send('ok');

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
 }

 exports.update_status_response1= async (req, res) => {
  try {
    console.log("req.body",req.body);

     const data = req.body;
     var dt = datetime.create();
     const meeting_id = data.meeting_id;
     const user_id = data.user_id;
     const status_certification = data.status_certification;
     const obj_update_date = dt.format("Y-m-d H:M:S");

     const ch1 = await quorum.find({meeting_id:meeting_id,user_id:user_id,status_certification:'รับรอง'}).count();
    // res.send(ch1);
     if (ch1 != 0) {

      const update_menu1 = await quorum.findOneAndUpdate(
        { meeting_id: meeting_id,user_id:user_id },
        { status_certification: '',obj_update_date: obj_update_date},
        { new: true } 
      );
     }
     else
     {
      const update_menu1 = await quorum.findOneAndUpdate(
        { meeting_id: meeting_id,user_id:user_id },
        { status_certification: status_certification,obj_update_date: obj_update_date},
        { new: true } 
      );
     }


     const ch2 = await attendees.find({meeting_id:meeting_id,user_id:user_id,status_certification:'รับรอง'}).count();
     //res.send(ch2);
     if (ch2 != 0) {

      const update_menu2 = await attendees.findOneAndUpdate(
        { meeting_id: meeting_id,user_id:user_id },
        { status_certification: '',obj_update_date: obj_update_date},
        { new: true } 
      );
     }
     else{
      const update_menu2 = await attendees.findOneAndUpdate(
        { meeting_id: meeting_id,user_id:user_id },
        { status_certification: status_certification,obj_update_date: obj_update_date},
        { new: true } 
      );
     }

     const ch3 = await attendees_meeting.find({meeting_id:meeting_id,user_id:user_id,status_certification:'รับรอง'}).count();
     //res.send(ch3);
     if (ch3 != 0) {

      const update_menu3 = await attendees_meeting.findOneAndUpdate(
        { meeting_id: meeting_id,user_id:user_id },
        { status_certification: '',obj_update_date: obj_update_date},
        { new: true } 
      );
     }
     else{

        const update_menu3 = await attendees_meeting.findOneAndUpdate(
          { meeting_id: meeting_id,user_id:user_id },
          { status_certification: status_certification,obj_update_date: obj_update_date},
          { new: true } 
        );
     }

   

   res.status(200).send('ok');

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
    // logger.error("error-file", { message: "Server Error!!" });
  }
 }

exports.updateQuorumOrder = async (req, res) => {
  try {
    const updates = req.body;
    for (const update of updates) {
      const test = await quorum.findOneAndUpdate(
        { quorum_id: update.quorum_id },
        { quorum_order: update.quorum_order },
        { new: true }
      );
    }
    res.status(200).send('Quorum order updated successfully');
  } catch (err) {
    console.error(err);
    res.status(400).send('Server Error!!');
  }
};