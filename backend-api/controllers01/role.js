const roles = require("../models/Role");
const datetime = require("node-datetime");


exports.list_role = async (req, res) => {
   try{
       const menuItem = await roles.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_role = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();

      const role_id = Math.floor(Math.random() * 10000000) + 1;
      const role_name = data.role_name;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = data.user_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = data.user_id;
      const company_id = data.company_id;
     
    const meetings = new roles({
            role_id,
            role_name,
            obj_created_date,
            obj_created_user_id,
            obj_update_date,
            obj_update_user_id,
            company_id
         });
    await meetings.save();


    
    res.status(200).send(meetings);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_role= async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const role_id = data.role_id;
      const role_name = data.role_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await roles.findOneAndUpdate(
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
  
 exports.delete_role = async (req, res) => {
   try {
      const role_id = req.params.id;
   
      const dataDelete = await roles.findOneAndDelete({role_id:role_id});
      const menuItem = await roles.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
