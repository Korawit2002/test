const child_menu = require("../models/ChildMenu");
const datetime = require("node-datetime");

exports.list_childmenu = async (req, res) => {
   try{
       const subMenu = await child_menu.find({})
       res.send(subMenu);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_child_menu = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
      const child_menu_id = Math.floor(Math.random() * 10000000) + 1;
      const title = data.title;
      const menu_id = data.menu_id;
      const sub_menu_id = data.sub_menu_id;
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = '1000';
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';

      const menu = new child_menu({
        child_menu_id,
        title,
         menu_id,
         sub_menu_id,
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


exports.update_childmenu = async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const child_menu_id = data.id;
      const title = data.title;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = '';

    const update_menu = await child_menu.findOneAndUpdate(
      { child_menu_id: child_menu_id },
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
 

  
 exports.delete_childmenu = async (req, res) => {
   try {
      const child_menu_id = req.params.id;
   
      const dataDelete = await child_menu.findOneAndDelete({child_menu_id:child_menu_id});
      const menuItem = await child_menu.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
