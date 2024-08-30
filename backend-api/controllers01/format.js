const table_formats = require("../models/Format");
const datetime = require("node-datetime");


exports.list_format = async (req, res) => {
   try{
       const menuItem = await table_formats.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_format = async (req, res) => {

   try {
      const data = req.body;

      console.log('data',data);

      const formats_id = Math.floor(Math.random() * 10000000) + 1;
      const formats_name = data.formats_name;
      const meeting_id = data.meeting_id;
      const stucture = data.stucture;
     
      const select = await table_formats.find({meeting_id:meeting_id}).count();

      if(select != 0)
      {
          const meetings = await table_formats.findOneAndUpdate(
            { meeting_id: meeting_id },
            { formats_name: formats_name,stucture:stucture},
            { new: true } 
          );
          res.status(200).send(meetings);

      }
      else
      {
        const meetings = new table_formats({
            formats_id,
            formats_name,
            meeting_id,
            stucture
         });
            await meetings.save();
            res.status(200).send(meetings);

      }
    

    
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_format= async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const formats_id = data.formats_id;
      const formats_name = data.formats_name;
      

    const update_menu = await table_formats.findOneAndUpdate(
      { formats_id: formats_id },
      { formats_name: formats_name},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
  
 exports.delete_format = async (req, res) => {
   try {
      const formats_id = req.params.id;
   
      const dataDelete = await table_formats.findOneAndDelete({formats_id:formats_id});
      const menuItem = await table_formats.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}

  
exports.search_format = async (req, res) => {
    try {
       const meeting_id = req.params.meeting_id;
       const menuItem = await table_formats.find({meeting_id:meeting_id});


       res.status(200).send(menuItem);
     } catch (err) {
       console.log(err);
       res.status(400).send("Server Error!!");
     }
 }
 