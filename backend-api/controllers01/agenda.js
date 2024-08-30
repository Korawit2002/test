const main_agenda = require("../models/MainAgenda");
const sub_agenda = require("../models/SubAgenda");
const sub_agenda_details = require("../models/SubAgendaDetails");
const responsible_person = require("../models/ResponsiblePerson");


const datetime = require("node-datetime");

exports.list_agenda = async (req, res) => {
   try{
       const menuItem = await main_agenda.find({})
       res.send(menuItem);

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

 exports.create_agenda = async (req, res) => {

   try {
      const data = req.body;
      console.log(data);
      //var dt = datetime.create();
      const result = await main_agenda.insertMany(data);
      res.status(200).send(result);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_agenda= async (req, res) => {
   try {


      const data = req.body;
      var dt = datetime.create();
      const main_agenda_id = data.main_agenda_id;
      const main_agenda_no = data.main_agenda_no;
      const main_agenda_name = data.main_agenda_name;
      const group_id = data.group_id;
      const secret = data.secret;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await main_agenda.findOneAndUpdate(
      { main_agenda_id: main_agenda_id },
      { main_agenda_no: main_agenda_no,main_agenda_name: main_agenda_name,group_id:group_id,secret: secret,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };
 

  
 exports.delete_agenda = async (req, res) => {
   try {
      const main_agenda_id = req.params.id;
   
      const delete_main = await main_agenda.findOneAndDelete({main_agenda_id:main_agenda_id});
      const delete_sub = await sub_agenda.findOneAndDelete({main_agenda_id:main_agenda_id});
      const delete_detail = await sub_agenda_details.findOneAndDelete({main_agenda_id:main_agenda_id});
      const delete_person = await responsible_person.findOneAndDelete({main_agenda_id:main_agenda_id});

      const menuItem = await main_agenda.find({})

      res.status(200).send(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.search_agenda = async (req, res) => {
   try {
      const main_agenda_id = req.params.id;
   
      const getmenu = await main_agenda.find({main_agenda_id:main_agenda_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}
exports.listAgenda = async (req, res) => {
  try {
     const meeting_id = req.params.meeting_id;
    //  const getmenu = await main_agenda.find({meeting_id:meeting_id})


    const getmenu = await main_agenda.aggregate([
      {
        $match: {
          meeting_id: meeting_id
        }
      },
      {
        $lookup: {
          from: "groups",
          localField: "group_id",
          foreignField: "group_id",
          as: "group"
        }
      }
    ]);
    res.json(getmenu);


    // res.status(200).send(getmenu);
   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}




exports.create_sub_agenda = async (req, res) => {
  try {
    const data = req.body;

    // Extract sub_agenda_ids from the incoming data
    const subAgendaIds = data.map(item => item.sub_agenda_id);

    // Delete existing records with these sub_agenda_ids
    await sub_agenda.deleteMany({ sub_agenda_id: { $in: subAgendaIds } });

    // Insert new records
    const result = await sub_agenda.insertMany(data);
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
}
exports.list_sub_agenda = async (req, res) => {
  try {
     const main_agenda_id = req.params.main_agenda_id;
  
    //  const getmenu = await sub_agenda.find({main_agenda_id:main_agenda_id})
    //  res.status(200).send(getmenu);
     const joinedMeetings = await sub_agenda.aggregate([
      {
        $match: {
          main_agenda_id: main_agenda_id,
        }
      },
      {
        $lookup: {
          from: 'compose_files',
          localField: 'sub_agenda_id',
          foreignField: 'sub_agenda_id',
          as: 'compose_files'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'sub_agenda_id', 
          foreignField: 'sub_agenda_id',
          as: 'comments'
        }
      },
      {
        $lookup: {
          from: 'meetings',
          localField: 'meeting_id', 
          foreignField: 'meeting_id',
          as: 'meetings'
        }
      },
      {
        $sort: { obj_update_date: -1 } 
      }
    ]);
    // console.log("joinedMeetings",joinedMeetings);

   res.json(joinedMeetings);





   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}


exports.list_sub_agenda_one = async (req, res) => {
  try {
    const main_agenda_id = req.params.main_agenda_id;

    const resultArray = await sub_agenda.aggregate([
      {
        $match: {
          main_agenda_id: main_agenda_id,
        }
      },
      {
        $lookup: {
          from: 'meetings',
          localField: 'meeting_id',
          foreignField: 'meeting_name_ref',
          as: 'meeting_data'
        }
      },
      {
        $unwind: '$meeting_data'
      },
      {
        $lookup: {
          from: 'main_agendas',
          localField: 'main_agenda_id',
          foreignField: 'main_agenda_name_ref',
          as: 'main_agenda_data'
        }
      },
      {
        $unwind: '$main_agenda_data'
      },
      {
        $match: {
          $expr: {
            $eq: ['$sub_agenda_name_ref', '$sub_agenda_id']
          }
        }
      }
    ]).exec();

    res.json(resultArray);


  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
}
exports.list_sub_agenda_bymeeting = async (req, res) => {
  try {
     const meeting_id = req.params.meeting_id;

     const getmenu = await sub_agenda.find({meeting_id:meeting_id})
     .select("sub_agenda_id")
     .select("main_agenda_id")
     .select("meeting_id")
     .select("sub_agenda_name")
     .exec();
     res.status(200).send(getmenu);
   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}

exports.updateSubAgendaOrder = async (req, res) => {
  try {
    const updates = req.body;

    for (const update of updates) {
      const test = await sub_agenda.findOneAndUpdate(
        { sub_agenda_id: update.sub_agenda_id },
        { order: update.order },
        { new: true } 
      );
    }

    res.status(200).send('Sub-agenda order updated successfully');
  } catch (err) {
    console.error(err);
    res.status(400).send('Server Error!!');
  }
};

exports.delete_subagenda = async (req, res) => {
  try {
      const sub_agenda_id = req.params.id;

      // Delete sub-agenda
      await sub_agenda.findOneAndDelete({ sub_agenda_id: sub_agenda_id });

      // Optionally, delete related records (if they exist)
      await sub_agenda_details.deleteMany({ sub_agenda_id: sub_agenda_id });
      await responsible_person.deleteMany({ sub_agenda_id: sub_agenda_id });

      res.status(200).send(`Sub-agenda with ID ${sub_agenda_id} deleted successfully`);
  } catch (err) {
      console.error(err);
      res.status(400).send("Server Error!!");
  }
};
