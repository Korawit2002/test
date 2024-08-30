const meeting_position = require("../models/MeetingPosition");
const datetime = require("node-datetime");
const attendees = require("../models/Attendees");
const quorum = require("../models/Quorum");
const attendees_bymeeting = require("../models/AttendeesByMeeting");

exports.list_meeting_position = async (req, res) => {
   try{
     
       const show = await meeting_position.find({}).sort({obj_update_date: -1})
       .select("position_id")
       .select("position_name")
       .select("company_id")
       .exec();
       res.status(200).send(show);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_meeting_position = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      const position_id = Math.floor(Math.random() * 10000000) + 1;
      const position_name = data.position_name;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = data.user_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = data.user_id;
      const company_id = data.company_id;
      const menu = new meeting_position({
         position_id,
         position_name,
         obj_created_date,
         obj_created_user_id,
         obj_update_date,
         obj_update_user_id,
         company_id
    });
    //console.log("dffd",menu);
    await menu.save();
    res.status(200).send(menu);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_meeting_position = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const position_id = data.position_id;
      const position_name = data.position_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await meeting_position.findOneAndUpdate(
      { position_id: position_id },
      { position_name: position_name,obj_update_date: obj_update_date},
      { new: true } 
    );

    const update_menu1 = await attendees_bymeeting.updateMany(
      {},
      {position_name:position_name},
      { new: true } 
    );
 
    const update_menu2 = await quorum.updateMany(
     {},
     { position_id:position_id,
       position_name:position_name},
     { new: true } 
   );
   const update_menu3 = await attendees.updateMany(
     {},
     { 
      position_name:position_name},
     { new: true } 
   );



    res.status(200).send(update_menu);



   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_meeting_position = async (req, res) => {
   try {
      const position_id = req.params.position_id;
   
      const dataDelete = await meeting_position.findOneAndDelete({position_id:position_id});
      const menuItem = await meeting_type.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.meeting_position = async (req, res) => {
   try {
      const position_id = req.params.position_id;
   

      const getmenu = await meeting_position.find({position_id:position_id})
      .select("position_id")
      .select("position_name")
      .exec();

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}