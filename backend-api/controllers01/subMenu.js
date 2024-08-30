const sub_menu = require("../models/SubMenu");
const datetime = require("node-datetime");

exports.list_submenu = async (req, res) => {
   try{
       const subMenu = await sub_menu.find({})
       res.send(subMenu);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_sub_menu = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      const sub_menu_id = Math.floor(Math.random() * 10000000) + 1;
      const title = data.title;
      const menu_id = data.menu_id;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = '1000';
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';

      const menu = new sub_menu({
        sub_menu_id,
         title,
         menu_id,
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


exports.update_submenu = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const sub_menu_id = data.sub_menu_id;
      const title = data.title;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';


    const update_menu = await sub_menu.findOneAndUpdate(
      { sub_menu_id: sub_menu_id },
      { title: title,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_submenu = async (req, res) => {
   try {
      const sub_menu_id = req.params.sub_menu_id;
   
      const dataDelete = await sub_menu.findOneAndDelete({sub_menu_id:sub_menu_id});
      const menuItem = await sub_menu.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}


exports.submenu = async (req, res) => {
   try {
      const sub_menu_id = req.params.sub_menu_id;
   
      const getmenu = await sub_menu.find({sub_menu_id:sub_menu_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}