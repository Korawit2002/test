const menu_items = require("../models/MenuItems");
const datetime = require("node-datetime");

exports.list_menu = async (req, res) => {
   try{
       const menuItem = await menu_items.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_menu = async (req, res) => {

   try {
      const data = req.body;
     // console.log("data",data.title);
      var dt = datetime.create();
      const menu_id = Math.floor(Math.random() * 10000000) + 1;
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
      const obj_created_user_id = '1000';
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';
      const company_id = data.company_id;
      const menu = new menu_items({
         menu_id,
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
    //console.log("dffd",menu);
    await menu.save();
    res.status(200).send(menu);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_menu = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const menu_id = data.menu_id;
      const title = data.title;
      const meta_title = data.meta_title;
      const meta_description = data.meta_description;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await menu_items.findOneAndUpdate(
      { menu_id: menu_id },
      { title: title,meta_title: meta_title ,meta_description: meta_description ,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_menu = async (req, res) => {
   try {
      const menu_id = req.params.menu_id;
   
      const dataDelete = await menu_items.findOneAndDelete({menu_id:menu_id});
      const menuItem = await menu_items.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.menuitems = async (req, res) => {
   try {
      const menu_id = req.params.menu_id;
   
      const getmenu = await menu_items.find({menu_id:menu_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}