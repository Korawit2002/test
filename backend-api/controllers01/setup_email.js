const setup_emails = require("../models/SetupEmail");
const datetime = require("node-datetime");



exports.list_email = async (req, res) => {
  try{
      const menuItem = await setup_emails.find({})
      res.send(menuItem);

  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}

 exports.create_email = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();

      const user_id = data.user_id;
      const email_name = data.email_name;
      const sender_name = data.sender_name;
      const company_id = data.company_id;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_update_date = dt.format("Y-m-d H:M:S");

      const counts = await setup_emails.find({user_id:user_id}) .count();
      if (counts != 0) {
          const update_menu = await setup_emails.findOneAndUpdate(
            { user_id: user_id },
            { email_name: email_name,sender_name: sender_name,obj_update_date:obj_update_date},
            { new: true } 
          );
          res.status(200).send(update_menu);
          
      } else {

        const meetings = new setup_emails({
          user_id,
          email_name,
          sender_name,
          company_id,
          obj_created_date,
          obj_update_date,
       });
        await meetings.save();
        res.status(200).send(meetings);
      }
     

   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_email= async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const role_id = data.role_id;
      const role_name = data.role_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await setup_emails.findOneAndUpdate(
      { role_id: role_id },
      { role_name: role_name,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
  
 exports.delete_email = async (req, res) => {
   try {
      const role_id = req.params.id;
   
      const dataDelete = await setup_emails.findOneAndDelete({role_id:role_id});
      const menuItem = await setup_emails.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}


exports.search_email = async (req, res) => {
    try {
       const  user_id = req.params.id;
    
       const menuItem = await setup_emails.find({user_id:user_id})
 
       res.status(200).send(menuItem);
     } catch (err) {
       console.log(err);
       res.status(400).send("Server Error!!");
     }
 }