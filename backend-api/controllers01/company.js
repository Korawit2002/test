const company = require("../models/Company");
const datetime = require("node-datetime");


exports.list_company = async (req, res) => {
   try{
       const menuItem = await company.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_company = async (req, res) => {

   try {
      const data = req.body;
      console.log("data",data.company_name);
      var dt = datetime.create();

      const company_id = Math.floor(Math.random() * 10000000) + 1;
      const company_name = data.company_name;
      const obj_status = 'active';
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = '1000';
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';
     
    const meetings = new company({
            company_id,
            company_name,
            obj_status,
            obj_created_date,
            obj_created_user_id,
            obj_update_date,
            obj_update_user_id
         });
    await meetings.save();


    
    res.status(200).send(meetings);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_company= async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const company_id = data.company_id;
      const company_name = data.company_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await company.findOneAndUpdate(
      { company_id: company_id },
      { company_name: company_name,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
  
 exports.delete_company = async (req, res) => {
   try {
      const company_id = req.params.id;
   
      const dataDelete = await company.findOneAndDelete({company_id:company_id});
      const menuItem = await company.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
