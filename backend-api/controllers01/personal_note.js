const personal_note = require("../models/PersonalNote");
const datetime = require("node-datetime");



exports.list_personal_note = async (req, res) => {
   try{
       const menuItem = await personal_note.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_personal_note = async (req, res) => {

   try {
      const data = req.body;
      var dt = datetime.create();
        meeting_id = data.meeting_id;
        user_id = data.user_id;
        note = data.note;
        company_id = data.company_id;
        obj_created_date =  dt.format("Y-m-d H:M:S");
        obj_update_date =  dt.format("Y-m-d H:M:S");

        const check = await personal_note.find({meeting_id:meeting_id,user_id:user_id}).count();

        if(check !== 0)
        {
            const update_menu = await personal_note.findOneAndUpdate(
                { meeting_id: meeting_id,user_id:user_id },
                { note: note,obj_update_date:obj_update_date},
                { new: true } 
              );
              res.status(200).send(update_menu);
        }
        else
        {
            const meetings = new personal_note({
                meeting_id,
                user_id,
                note,
                company_id,
                obj_created_date,
                obj_update_date
             });
             await meetings.save();
        }


      //var dt = datetime.create();
    //   const result = await personal_note.insertMany(data);
    //   res.status(200).send(result);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }




exports.search_note = async (req, res) => {
   try {
      const meeting_id = req.params.meeting_id;
      const user_id = req.params.user_id;

      const getmenu = await personal_note.find({meeting_id:meeting_id,user_id:user_id})
      res.status(200).send(getmenu);

    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
