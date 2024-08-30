const attendees = require("../models/Attendees");
const datetime = require("node-datetime");
const attendees_bymeeting = require("../models/AttendeesByMeeting");
const user = require("../models/User");
const pms_current =require("../models/PermissionCurrent");


exports.list_attendees = async (req, res) => {
   try{
       const menuItem = await attendees.find({})
      //  .sort({obj_update_date:-1});
       res.send(menuItem);


   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_attendees = async (req, res) => {

   try {
      const data = req.body;
      //console.log('dddddd',data);
      const result = await attendees.insertMany(data);

    res.status(200).send(result);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_attendees_by_meeting_new= async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const id = data.id;
      const permission_current = data.permission_current;
      const user_id = data.user_id;
      const meeting_id = data.meeting_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_created_date = dt.format("Y-m-d H:M:S");


    const update_menu = await attendees_bymeeting.findOneAndUpdate(
      { _id: id },
      { permission_current: permission_current,obj_update_date: obj_update_date},
      { new: true } 
    );
    if(permission_current === 'ผู้จัดการประชุม')
    {
      const prm = new pms_current({
        meeting_id,
        user_id,
        obj_created_date,
        obj_update_date,
     });
     await prm.save();
    }
    else
    {
      const dataDelete = await pms_current.findOneAndDelete({meeting_id:meeting_id,user_id:user_id});

    }


   res.status(200).send("succeed");

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
 };
 
 exports.update_attendees_meeting_approved= async (req, res) => {
  try {

     const data = req.body;
     const id = data.id;
     const user_id = data.user_id;
     const meeting_id = data.meeting_id;
     const status = data.status_login;
     const status_request = data.status_request;
     const email = data.email;

   const update_menu = await attendees_bymeeting.findOneAndUpdate(
     {_id: id },
     {status_request:status_request},
     { new: true } 
   );

   const update_menu1 = await quorum.findOneAndUpdate(
    { meeting_id: meeting_id,user_id:user_id },
    {
      status:status,
      status_request:status_request},
    { new: true } 
  );
  const update_menu2 = await attendees.findOneAndUpdate(
    { meeting_id: meeting_id,user_id:user_id},
    { 
      status:status,
      status_request:status_request},
    { new: true } 
  );

  const up_user = await user.findOneAndUpdate(
    { email: email},
    { status_login:status},
    { new: true } 
  );

  res.status(200).send("succeed");

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};


 

  
 exports.delete_attendees = async (req, res) => {
   try {
      const attendees_id = req.params.attendees_id;
      const select = await attendees.find({attendees_id:attendees_id})
      const userIds = await attendees.find({attendees_id:attendees_id})

      const dataDelete = await attendees.findOneAndDelete({attendees_id:attendees_id});
      const dataDelete1 = await attendees_bymeeting.findOneAndDelete({user_id:userIds[0].user_id,meeting_id:select[0].meeting_id});
      const dataDelete3 = await pms_current.findOneAndDelete({user_id:userIds[0].user_id,meeting_id:select[0].meeting_id});

      //console.log("dataDelete",dataDelete1);

      const menuItem = await attendees.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.search_attendees = async (req, res) => {
   try {
    
    const meeting_id = req.params.meeting_id;
    // const result = await attendees.find({meeting_id:meeting_id});


    const joinAttendees = await attendees.aggregate([
      {
        $match: {
         meeting_id: meeting_id
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "user_id",
          as: "user"
        }
      },

      {
        $lookup: {
          from: "table_formats",
          localField: "meeting_id",
          foreignField: "meeting_id",
          as: "formats"
        }
      },
      // {
      //   $sort: { obj_update_date: -1 }
      // }
    ]);
    res.json(joinAttendees);


      // res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}


exports.attendees_by_meeting = async (req, res) => {
  try {
   
   const meeting_id = req.params.meeting_id;
  // const result = await attendees.find({meeting_id:meeting_id});
    // res.status(200).send(result);

     const users = await attendees_bymeeting.distinct("user_id",{'meeting_id': meeting_id});
     const userItem = await user.find({user_id : {$in: users}})
     .select("user_id")
     .select("title")
     .select("firstname")
     .select("lastname")
     .select("email")
     .exec();
     res.status(200).send(userItem);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}

exports.attendees_by_meeting_new = async (req, res) => {
  try {
   
   const meeting_id = req.params.meeting_id;

     const users = await attendees_bymeeting.distinct("user_id",{'meeting_id': meeting_id});

    const joinAttendees = await user.aggregate([
      {
        $lookup: {
          from: "attendees_meetings",
          let: { user_id: "$user_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$user_id", "$user_id"] },
                    { $eq: ["$meeting_id", meeting_id] }
                  ]
                }
              }
            }
          ],
          as: "attendees_meetings"
        }
      },
      {
        $match: {
          "attendees_meetings": { $ne: [] },
          "user_id": { $in: users }
        }
      }
    ]);
    
    res.json(joinAttendees);


   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}

exports.attendees_by_meeting_approved = async (req, res) => {
  try {
   
   const meeting_id = req.params.meeting_id;

     const users = await attendees_bymeeting.distinct("user_id",{'meeting_id': meeting_id,status:'Request'});

    const joinAttendees = await user.aggregate([
      {
        $lookup: {
          from: "attendees_meetings",
          let: { user_id: "$user_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$user_id", "$user_id"] },
                    { $eq: ["$meeting_id", meeting_id] }
                  ]
                }
              }
            }
          ],
          as: "attendees_meetings"
        }
      },
      {
        $match: {
          "attendees_meetings": { $ne: [] },
          "user_id": { $in: users }
        }
      }
    ]);
    
    res.json(joinAttendees);


   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}


exports.attendees_meeting = async (req, res) => {

  try {
     const data = req.body;
     console.log(data.length);


     const result = await attendees_bymeeting.insertMany(data);

     
     res.status(200).send(result);
  } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}



exports.attendees_meeting_all = async (req, res) => {
  try {
   
   const meeting_id = req.params.meeting_id;
 
     const userItem = await attendees_bymeeting.find({meeting_id:meeting_id})
     res.status(200).send(userItem);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}

exports.updateAttendeeOrder = async (req, res) => {
  try {
    const updates = req.body;
    for (const update of updates) {
      const test = await attendees.findOneAndUpdate(
        { attendees_id: update.attendees_id },
        { attendee_order: update.attendee_order },
        { new: true }
      );
    }
    res.status(200).send('Attendee order updated successfully');
  } catch (err) {
    console.error(err);
    res.status(400).send('Server Error!!');
  }
};