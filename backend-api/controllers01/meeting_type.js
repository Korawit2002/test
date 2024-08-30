const meeting_type = require("../models/MeetingType");
const datetime = require("node-datetime");


exports.list_meeting_type = async (req, res) => {
   try{
       const menuItem = await meeting_type.find({}).sort({obj_update_date: -1})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_meeting_type = async (req, res) => {

   try {
      const data = req.body;
      console.log("data",data.title);
      var dt = datetime.create();
      const type_id = Math.floor(Math.random() * 10000000) + 1;
      const type_name = data.type_name;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = data.user_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = data.user_id;
      const company_id = data.company_id;
      const menu = new meeting_type({
         type_id,
         type_name,
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


exports.update_meeting_type = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const type_id = data.type_id;
      const type_name = data.type_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await meeting_type.findOneAndUpdate(
      { type_id: type_id },
      { type_name: type_name,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_meeting_type = async (req, res) => {
   try {
      const type_id = req.params.type_id;
   
      const dataDelete = await meeting_type.findOneAndDelete({type_id:type_id});
      const menuItem = await meeting_type.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.meeting_type = async (req, res) => {
   try {
      const type_id = req.params.type_id;
   
      const getmenu = await meeting_type.find({type_id:type_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}