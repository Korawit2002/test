const current_quorum = require("../models/CurrentQuorum");
const attendees_meeting = require("../models/AttendeesByMeeting");

const datetime = require("node-datetime");


exports.list_current = async (req, res) => {
   try{

       const menuItem = await current_quorum.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_current = async (req, res) => {

   try {
      const data = req.body;
      console.log(data);
    //   var dt = datetime.create();
    //   const current_id = Math.floor(Math.random() * 10000000) + 1;
    //   const user_id = data.user_id;
    //   const title = data.title;
    //   const first_name = data.first_name;
    //   const last_name = data.last_name;
    //   const main_stucture = data.main_stucture;
    //   const sub_stucture = data.sub_stucture;
    //   const child_stucture = data.child_stucture;
    //   const email = data.email;
    //   const position_id = data.position_id;
    //   const position_name = data.position_name;

    //   const obj_created_date = dt.format("Y-m-d H:M:S");
    //   const obj_created_user_id = '1000';
    //   const obj_update_date = dt.format("Y-m-d H:M:S");
    //   const obj_update_user_id = '';
    //   const company_id = data.company_id;

    // const insert = new current_quorum({
    //     current_id,
    //     user_id,
    //     title,
    //     first_name,
    //     last_name,
    //     main_stucture,
    //     sub_stucture,
    //     child_stucture,
    //     email,
    //     position_id,
    //     position_name,
    //     obj_created_date,
    //     obj_created_user_id,
    //     obj_update_date,
    //     obj_update_user_id,
    //     company_id
    //      });
    // await insert.save();

    const result = await current_quorum.insertMany(data);


    res.status(200).send(result);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


// exports.update_quorum= async (req, res) => {
//    try {

//       const data = req.body;
//       var dt = datetime.create();
//       const type_id = data.type_id;
//       const type_name = data.type_name;
//       const obj_update_date = dt.format("Y-m-d H:M:S");
      

//     const update_menu = await quorum.findOneAndUpdate(
//       { type_id: type_id },
//       { type_name: type_name,obj_update_date: obj_update_date},
//       { new: true } 
//     );
//     res.status(200).send(update_menu);

//    } catch (err) {
//      console.log(err);
//      res.status(400).send("Server Error!!");
//      // logger.error("error-file", { message: "Server Error!!" });
//    }
//  };
 

  
 exports.delete_current = async (req, res) => {
   try {
      const current_id = req.params.current_id;
   
      const dataDelete = await current_quorum.findOneAndDelete({current_id:current_id});
      const menuItem = await current_quorum.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.search_current = async (req, res) => {
   try {
    
    const searchs = req.params.search;
    const result = await quorum.find({first_name:searchs});

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}