const child_stucture = require("../models/ChildStucture");
const datetime = require("node-datetime");
const child_stucture_four = require("../models/ChildStuctureFour");
const user =require("../models/User");

exports.list_childstucture = async (req, res) => {
   try{
       const subMenu = await child_stucture.find({}).sort({obj_update_date: -1});
       res.send(subMenu);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_childstucture = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      const child_stucture_id = Math.floor(Math.random() * 10000000) + 1;
      const sub_stucture_id = data.sub_stucture_id;
      const sub_stucture_name = data.sub_stucture_name;

      const title = data.title;
      const main_stucture_id = data.main_stucture_id;
      const main_stucture_name = data.main_stucture_name;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = '1000';
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';

      const menu = new child_stucture({
        child_stucture_id,
        title,
        main_stucture_id,
        main_stucture_name,
        sub_stucture_id,
        sub_stucture_name,
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


exports.update_childstucture = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const main_stucture_id = data.main_stucture_id;
      const sub_stucture_id = data.sub_stucture_id;
      const child_stucture_id = data.child_stucture_id;
      const main_stucture_name= data.main_stucture_name;
      const sub_stucture_name= data.sub_stucture_name;
      const title = data.title;
      const obj_update_date = dt.format("Y-m-d H:M:S");

      const update_menu = await child_stucture.findOneAndUpdate(
      { child_stucture_id: child_stucture_id },
      { main_stucture_id:main_stucture_id,
        main_stucture_name:main_stucture_name,
        sub_stucture_name:sub_stucture_name,
        sub_stucture_id:sub_stucture_id,
        title: title,obj_update_date: obj_update_date},
      { new: true } 
    );

    const update4 = await child_stucture_four.findOneAndUpdate(
      { child_stucture_id: child_stucture_id },
      { child_stucture_name: title},
      { new: true } 
    );


    const update5 = await user.findOneAndUpdate(
      { child_stucture_id: child_stucture_id },
      { child_stucture_name: title},
      { new: true } 
    );


    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_childstucture = async (req, res) => {
   try {
      const child_stucture_id = req.params.id;
   
      const dataDelete = await child_stucture.findOneAndDelete({child_stucture_id:child_stucture_id});
      const menuItem = await child_stucture.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}


exports.childstucture = async (req, res) => {
   try {
      const sub_stucture_id = req.params.id;
   
      const getmenu = await child_stucture.find({sub_stucture_id:sub_stucture_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}