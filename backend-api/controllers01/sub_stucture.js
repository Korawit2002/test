const sub_stucture = require("../models/SubStucture");
const datetime = require("node-datetime");
const child_stucture_four = require("../models/ChildStuctureFour");
const child_stucture = require("../models/ChildStucture");
const user =require("../models/User");

exports.list_substucture = async (req, res) => {
   try{
       const subMenu = await sub_stucture.find({}).sort({ obj_update_date: -1 });
       res.send(subMenu);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_substucture = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      const sub_stucture_id = Math.floor(Math.random() * 10000000) + 1;
      const title = data.title;
      const main_stucture_id = data.main_stucture_id;
      const main_stucture_name = data.main_stucture_name;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = '1000';
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';

      const menu = new sub_stucture({
        sub_stucture_id,
        title,
         main_stucture_id,
         main_stucture_name,
         obj_created_date,
         obj_created_user_id,
         obj_update_date,
         obj_update_user_id
    });
    //console.log("dffd",menu);
    await menu.save();
    res.status(200).send(menu);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_substucture = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const sub_stucture_id = data.sub_stucture_id;
      const title = data.title;
      const main_stucture_id = data.main_stucture_id;
      const main_stucture_name = data.main_stucture_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");

    const update_menu = await sub_stucture.findOneAndUpdate(
      { sub_stucture_id: sub_stucture_id },
      { title: title,main_stucture_id:main_stucture_id,main_stucture_name:main_stucture_name,obj_update_date: obj_update_date},
      { new: true } 
    );

    const update3 = await child_stucture.findOneAndUpdate(
      { sub_stucture_id: sub_stucture_id },
      { sub_stucture_name: title},
      { new: true } 
    );

    const update4 = await child_stucture_four.findOneAndUpdate(
      { sub_stucture_id: sub_stucture_id },
      { sub_stucture_name: title},
      { new: true } 
    );


    const update5 = await user.findOneAndUpdate(
      { sub_stucture_id: sub_stucture_id },
      { sub_stucture_name: title},
      { new: true } 
    );








    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_substucture = async (req, res) => {
   try {
      const sub_stucture_id = req.params.id;
   
      const dataDelete = await sub_stucture.findOneAndDelete({sub_stucture_id:sub_stucture_id});
      const menuItem = await sub_stucture.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}


exports.substucture = async (req, res) => {
   try {
      const main_stucture_id = req.params.id;
   
      const getmenu = await sub_stucture.find({main_stucture_id:main_stucture_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}