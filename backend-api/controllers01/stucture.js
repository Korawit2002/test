const main_stucture = require("../models/MainStucture");
const datetime = require("node-datetime");
const sub_stucture = require("../models/SubStucture");
const child_stucture_four = require("../models/ChildStuctureFour");
const child_stucture = require("../models/ChildStucture");
const user =require("../models/User");
exports.list_stucture = async (req, res) => {
   try{
       const Item = await main_stucture.find({}).sort({ obj_update_date: -1 });
       res.send(Item);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_stucture = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      const main_stucture_id = Math.floor(Math.random() * 10000000) + 1;
      const slug = '';
      const title = data.title;
      const icon = '';
      const icon_gen = '';
      const icon_alt = '';
      const bg_color = '';
      const obj_priority  = '';
      const meta_title = data.meta_title;
      const meta_description = data.meta_description;
      const obj_lang = "TH"
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = data.user_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = data.user_id;
      const company_id = data.company_id;
      const stucture = new main_stucture({
        main_stucture_id,
         slug,
         title,
         icon,
         icon_gen,
         icon_alt,
         bg_color,
         obj_priority,
         meta_title,
         meta_description,
         obj_lang,
         obj_created_date,
         obj_created_user_id,
         obj_update_date,
         obj_update_user_id,
         company_id
    });

    await stucture.save();
    res.status(200).send(stucture);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_stucture = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const main_stucture_id = data.main_stucture_id;
      const title = data.title;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = data.user_id;

    const update = await main_stucture.findOneAndUpdate(
      { main_stucture_id: main_stucture_id },
      { title: title,obj_update_date: obj_update_date,obj_update_user_id:obj_update_user_id},
      { new: true } 
    );

    const update2 = await sub_stucture.findOneAndUpdate(
      { main_stucture_id: main_stucture_id },
      { main_stucture_name: title},
      { new: true } 
    );

    const update3 = await child_stucture.findOneAndUpdate(
      { main_stucture_id: main_stucture_id },
      { main_stucture_name: title},
      { new: true } 
    );

    const update4 = await child_stucture_four.findOneAndUpdate(
      { main_stucture_id: main_stucture_id },
      { main_stucture_name: title},
      { new: true } 
    );


    const update5 = await user.findOneAndUpdate(
      { main_stucture_id: main_stucture_id },
      { main_stucture_name: title},
      { new: true } 
    );

    res.status(200).send(update);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
 };
 

  
 exports.delete_stucture = async (req, res) => {
   try {
      const main_stucture_id = req.params.id;
   
      const dataDelete = await main_stucture.findOneAndDelete({main_stucture_id:main_stucture_id});
      const menuItem = await main_stucture.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}

exports.stucture = async (req, res) => {
   try {
      const main_stucture_id = req.params.id;
   
      const getmain = await main_stucture.find({main_stucture_id:req.params.id})

      res.status(200).send(getmain);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}