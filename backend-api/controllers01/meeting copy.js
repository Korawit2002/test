const meeting = require("../models/Meeting");
const meeting_draft = require("../models/MeetingDraft");
const datetime = require("node-datetime");
const connectEmail = require('../config/email');
const attendees_bymeeting =require("../models/AttendeesByMeeting");
const moment = require('moment');
exports.list = async (req, res) => {
   try{

        const joinedMeetings = await meeting.aggregate([
          {
              $lookup: {
                  from: 'meeting_types',
                  localField: 'type_id',
                  foreignField: 'type_id',
                  as: 'meeting_type'
              }
          },
          {
              $lookup: {
                  from: 'attendees_meetings',
                  localField: 'meeting_id',
                  foreignField: 'meeting_id',
                  as: 'attendees'
              }
          },
      ]);
      res.json(joinedMeetings);

   // ]);
   // res.json(joinedMeetings);


   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}

exports.list_all = async (req, res) => {
  try{

       const joinedMeetings = await meeting.aggregate([
         {
             $lookup: {
                 from: 'pms_currents',
                 localField: 'meeting_id',
                 foreignField: 'meeting_id',
                 as: 'pms'
             }
         },
        
     ]);
     res.json(joinedMeetings);

  // ]);
  // res.json(joinedMeetings);


  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}

 exports.create_meeting = async (req, res) => {

   try {
      const data = req.body;

      console.log("data",data.name);
      
      var dt = datetime.create();
      const meeting_id = Math.floor(Math.random() * 10000000) + 1;
      const type_id = data.meetingType;
      const meeting_name = data.name;
      const meeting_date = data.date;
      const time_start = data.start;
      const time_end = data.end;
      const meeting_room = data.hall;
      const location = data.tower;
      const note = data.remark;
      const conference = data.conference; 
      const url_conference = data.link;
      const status = 'เตรียมวาระ';
      const obj_status = 'active';
      const priority = '0';
      const obj_created_date = dt.format("Y-m-d H:M:S");
      const obj_created_user_id = data.user_id;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      const obj_update_user_id = data.user_id;
      //draft
      const obj_state = "draft";
      const obj_modified_date = dt.format("Y-m-d H:M:S");
      const obj_modified_user_id = data.user_id;
      const company_id = data.company_id;

    const meetings = new meeting({
            meeting_id,
            type_id,
            meeting_name,
            meeting_date,
            time_start,
            time_end,
            meeting_room,
            location,
            note,
            conference,
            url_conference,
            status,
            obj_status,
            priority,
            obj_created_date,
            obj_created_user_id,
            obj_update_date,
            obj_update_user_id,
            company_id
         });
    await meetings.save();

    const draft = new meeting_draft({
        meeting_id,
        type_id,
        meeting_name,
        meeting_date,
        time_start,
        time_end,
        meeting_room,
        location,
        note,
        conference,
        url_conference,
        status,
        obj_status,
        obj_state,
        obj_created_date,
        obj_created_user_id,
        obj_modified_date,
        obj_modified_user_id,
        company_id
     });
    await draft.save();

    
    res.status(200).send(meetings);
   } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
 }


exports.update_meeting= async (req, res) => {
   try {

      const data = req.body;
      var dt = datetime.create();
      const type_id = data.type_id;
      const type_name = data.type_name;
      const obj_update_date = dt.format("Y-m-d H:M:S");
      

    const update_menu = await meeting.findOneAndUpdate(
      { type_id: type_id },
      { type_name: type_name,obj_update_date: obj_update_date},
      { new: true } 
    );
    res.status(200).send(update_menu);

   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
     // logger.error("error-file", { message: "Server Error!!" });
   }
 };

 exports.updateMeeting = async (req, res) => {
  try {
    const updateData = req.body;
    console.log('dat', updateData);
    
    // Assuming meeting_id is passed as a URL parameter
    const { meeting_id } = updateData;

    // Create a new date-time object for the update timestamp
    var dt = datetime.create();
    // const updateFields = {
    //   ...updateData, // Assuming all fields in updateData match the database schema
    //   obj_update_date: dt.format("Y-m-d H:M:S")
    // };

    // If the field names in updateData do NOT match the database schema,
    // you need to manually map them like this:
    const updateFields = {
      meeting_name: updateData.name,
      type_id: updateData.meetingType,
      meeting_date: updateData.date,
      time_start: updateData.start,
      time_end: updateData.end,
      meeting_room: updateData.hall,
      location: updateData.tower,
      note: updateData.remark,
      url_conference: updateData.link,
      conference: updateData.conference,
      obj_update_date: dt.format("Y-m-d H:M:S")
    };

    // Update the meeting and return the updated document
    const updatedMeeting = await meeting.findOneAndUpdate(
      { meeting_id: meeting_id },
      { $set: updateFields },
      { new: true } // Returns the updated document
    );

    if (!updatedMeeting) {
      return res.status(404).send('Meeting not found');
    }

    res.status(200).send(updatedMeeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!!");
  }
}


 exports.delete_meeting = async (req, res) => {
  try {
     const meeting_id = req.params.meeting_id;
  
     // Find the document with the given meeting_id and specific status values
     const meetingToDelete = await meeting.findOne({
       meeting_id: meeting_id, 
       status: { $in: ['เตรียมวาระ', 'แจ้งวาระ'] }
     });

     let menuItem;

     if (meetingToDelete) {
       // If the document exists and has the desired status, delete it
       await meeting.findOneAndDelete({meeting_id: meeting_id});
       menuItem = await meeting.find({});
     } else {
       // If the document does not have the desired status, do not delete
       menuItem = "Meeting with specified status not found, no deletion performed.";
     }

     res.status(200).send(menuItem);
   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
};

exports.meetings = async (req, res) => {
   try {
      const type_id = req.params.type_id;
   
      const getmenu = await meeting.find({type_id:type_id})

      res.status(200).send(getmenu);
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
}

exports.detail_meeting = async (req, res) => {
  try {
     const meeting_id = req.params.meeting_id;
  
     const getmenu = await meeting.find({meeting_id:meeting_id})

     res.status(200).send(getmenu);
   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
}

exports.update_status_meeting= async (req, res) => {
  try {

     const data = req.body;
     var dt = datetime.create();
     console.log(data);

     const meeting_id = data.meeting_id;
     const user_id = data.user_id;
     const status = data.status;
     const message = data.message;
     const obj_update_date = dt.format("Y-m-d H:M:S");
     const status_email = data.status_email;
     const to = data.to;
     const to_all = data.to_all; //ผู้จัดการประชุม
     const subject = data.subject;
     const email_cc = data.email_cc;
     const email_name = data.email_name;
     const sender_name = data.sender_name;



    if(status_email === 'yes')
    {
      const update_menu = await meeting.findOneAndUpdate(
        { meeting_id: meeting_id },
        { status: status,obj_update_date: obj_update_date},
        { new: true } 
      );
      console.log('status_email',status_email);

      //res.status(200).send(update_menu);
        var mailOptions = {
          from: 'OBEC Meetings <allsolution@tlogical.com>',
          to: to,
          cc:email_cc,
          subject:subject,
          html: message
        };
        console.log("mailOptions",mailOptions);
        connectEmail.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
              res.send(error);
          } else {
                    console.log("Email sent: " + info.response);
                    res.send('ok');
            }
      });

    }
    else
    {
      const update_menu = await meeting.findOneAndUpdate(
        { meeting_id: meeting_id },
        { status: status,obj_update_date: obj_update_date},
        { new: true } 
      );
      console.log('status_email',status_email);
      res.status(200).send(update_menu);
    }

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.update_status_meetingtime = async (req, res) => {
  try {

     const data = req.body;
     const meeting_id = data.meeting_id;
     const user_id = data.user_id;
     const status = data.status;
     const status_email = data.status_email;

    if(status_email === 'start_old')
    {
     // console.log('dddd',data);
      const time_start = data.time_start;
      const update_menu = await meeting.findOneAndUpdate(
        { meeting_id: meeting_id },
        { status: status},
        { new: true } 
      );
      res.status(200).send(update_menu);
    }
    else if(status_email === 'start_new')
    {
      const time_start = data.time_start;
      const update_menu = await meeting.findOneAndUpdate(
        { meeting_id: meeting_id },
        { status: status,time_start:time_start},
        { new: true } 
      );
      res.status(200).send(update_menu);
    }
    else if(status_email === 'end_old')
    {
    
      const update_menu = await meeting.findOneAndUpdate(
        { meeting_id: meeting_id },
        { status: status},
        { new: true } 
      );
      res.status(200).send(update_menu);
    }
    else if(status_email === 'end_new')
    {
      const time_end = data.time_end;
      const update_menu = await meeting.findOneAndUpdate(
        { meeting_id: meeting_id },
        { status: status,time_end:time_end},
        { new: true } 
      );
      res.status(200).send(update_menu);
    }

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.update_status_meeting_five= async (req, res) => {
  try {

     const data = req.body;
     const meeting_id = data.meeting_id;
     const status = data.status;

     const update_menu = await meeting.findOneAndUpdate(
      { meeting_id: meeting_id },
      { status: status},
      { new: true } 
    );
    res.status(200).send(update_menu);

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};




exports.listmeeting_byuser = async (req, res) => {
  try{


       const user_id = req.params.user_id;
      //const meetingIds = await attendees_bymeeting.distinct("meeting_id",{'user_id': user_id});
      const meetingIds = await attendees_bymeeting.distinct("meeting_id", {
        $or: [
            {'user_id': user_id},
            {'user_id_delegate': user_id}
        ]
    });
      const meetingIds1 = await meeting.distinct("meeting_id",{'obj_created_user_id': user_id});

      var newArray = meetingIds.concat(meetingIds1);
      const arraynew = Array.from(new Set(newArray)) 

    
      const joinedMeetings = await meeting.aggregate([
        {
          $match: {
           meeting_id: { $in: arraynew }
          }
        },
        {
          $lookup: {
            from: 'meeting_types',
            localField: 'type_id',
            foreignField: 'type_id',
            as: 'meeting_type'
          }
        },
        {
          $sort: { obj_update_date: -1 } 
        }
      ]);
      res.json(joinedMeetings);


  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}

exports.three_days_ago = async (req, res) => {
  try{

      const dt = datetime.create();
      const obj_update_date = dt.format("Y-m-d");
     // console.log('Current Date:', obj_update_date);
    //วันปัจจุบัน -1

    const oneDate = moment().subtract(1, 'days').format("Y-M-D");
    const formattedDate0 = moment(oneDate, "YYYY-M-D").format("YYYY-MM-DD");
   // console.log('1 days ago:', formattedDate0);

      // ย้อนหลัง
      const threeDaysAgo = moment().subtract(30, 'days').format("Y-M-D");
      const formattedDate1 = moment(threeDaysAgo, "YYYY-M-D").format("YYYY-MM-DD");
     // console.log('3 days ago:', formattedDate1);



      //หามิสที่ตรงกับวันที่ต้องการ
      const allMeeting = await meeting.distinct("meeting_id",{
        meeting_date: {
          $gte: `${formattedDate1}`, 
          $lte: `${formattedDate0}`
        }
      });     

      //console.log("allMeeting",allMeeting);
      //4418781 id ที่มีวันตรงกับที่ต้องการหา


      const user_id = req.params.user_id;
     //const meetingIds = await attendees_bymeeting.distinct("meeting_id",{'user_id': user_id},);

      const meetingIds = await attendees_bymeeting.distinct("meeting_id", {
        $or: [
            {'user_id': user_id},
            {'user_id_delegate': user_id}
        ]
    });
    
      //console.log("meetingIds",meetingIds);
      //meetingIds [ '2024778', '4418781' ] id ทั้งหมดของ user คนนี้


      const meetingIds1 = await meeting.distinct("meeting_id",{'obj_created_user_id': user_id});
      var newArray = meetingIds.concat(meetingIds1,allMeeting);
      const arraynew = Array.from(new Set(newArray)) 



      var newArray1 = meetingIds.concat(allMeeting);
      const arraynew1 = Array.from(new Set(newArray1)) 
      // console.log("arraynew1",newArray1);
      // console.log("arraynew1",arraynew1);

    let newMeeting;
    if(meetingIds1.length > 0) //เป็นผู้ร่วมอย่างเดียว
      {
        // console.log( "ผู้ร่วมและผู้จัด");

        const a = arraynew;
        const b = allMeeting;
        const c = [];
        
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                c.push(a[i]); 
            } else {
                b.push(a[i]);
            }
        }
        newMeeting = c
      }
      else //ผู้ร่วมและผู้จัด
      {

        console.log(arraynew1);
        const a = newArray1;
        const b = [];
        const c = [];
        
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                c.push(a[i]); 
            } else {
                b.push(a[i]);
            }
        }
        newMeeting = c
        // console.log( "Array เดิม = "+a );
        // console.log( "Array ที่ลบค่าซ้ำ = "+b );
        // console.log( "Array เฉพาะค่าซ้ำ = "+c );

      }

      const joinedMeetings = await meeting.aggregate([
        {
          $match: {
           meeting_id: { $in: newMeeting }
          }
        },
        {
          $lookup: {
            from: 'meeting_types',
            localField: 'type_id',
            foreignField: 'type_id',
            as: 'meeting_type'
          }
        },
        {
          $sort: { obj_update_date: -1 } 
        },
        {
          $limit: 3 
        }
      ]);      
      //console.log("joinedMeetings",joinedMeetings);
      res.json(joinedMeetings);
  


  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}

exports.three_days_later = async (req, res) => {
  try{

      const dt = datetime.create();
      const obj_update_date = dt.format("Y-m-d");
    //  console.log('Current Date:', obj_update_date);
    //วันปัจจุบัน -1

      const oneDate = moment().add(1, 'days').format("Y-M-D");
      const formattedDate0 = moment(oneDate, "YYYY-M-D").format("YYYY-MM-DD");
     // console.log('1 days ago:', formattedDate0);


      // ก่อนจะถึง
      const threeDaysLater = moment().add(3, 'days').format("Y-M-D");
      const formattedDate2 = moment(threeDaysLater, "YYYY-M-D").format("YYYY-MM-DD");

      //console.log('3 days later:', formattedDate2);


      //หามิสที่ตรงกับวันที่ต้องการ
      const allMeeting = await meeting.distinct("meeting_id",{
        meeting_date: {
          $gte: `${formattedDate0}`, 
          $lte: `${formattedDate2}`
        }
      });     

      const user_id = req.params.user_id;
      //const meetingIds = await attendees_bymeeting.distinct("meeting_id",{'user_id': user_id},);
      const meetingIds = await attendees_bymeeting.distinct("meeting_id", {
        $or: [
            {'user_id': user_id},
            {'user_id_delegate': user_id}
        ]
    });
      const meetingIds1 = await meeting.distinct("meeting_id",{'obj_created_user_id': user_id});

      var newArray = meetingIds.concat(meetingIds1,allMeeting);
      const arraynew = Array.from(new Set(newArray)) 

      
    //   //หาค่าที่ซ้ำกันออกมา
    //     const a = arraynew;
    //     const b = allMeeting;
    //     const c = [];
        
    //     for (let i = 0; i < a.length; i++) {
    //         if (b.includes(a[i])) {
    //             c.push(a[i]); 
    //         } else {
    //             b.push(a[i]);
    //         }
    //     }
    // // console.log( "Array เดิม = "+a );
    // // console.log( "Array ที่ลบค่าซ้ำ = "+b );
    // // console.log( "Array เฉพาะค่าซ้ำ = "+c );
    // const newMeeting = c;

    var newArray1 = meetingIds.concat(allMeeting);
      const arraynew1 = Array.from(new Set(newArray1)) 
      // console.log("arraynew1",newArray1);
      // console.log("arraynew1",arraynew1);

    let newMeeting;
    if(meetingIds1.length > 0) //เป็นผู้ร่วมอย่างเดียว
      {
        // console.log( "ผู้ร่วมและผู้จัด");

        const a = arraynew;
        const b = allMeeting;
        const c = [];
        
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                c.push(a[i]); 
            } else {
                b.push(a[i]);
            }
        }
        newMeeting = c
      }
      else //ผู้ร่วมและผู้จัด
      {

        console.log(arraynew1);
        const a = newArray1;
        const b = [];
        const c = [];
        
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                c.push(a[i]); 
            } else {
                b.push(a[i]);
            }
        }
        newMeeting = c
        // console.log( "Array เดิม = "+a );
        // console.log( "Array ที่ลบค่าซ้ำ = "+b );
        // console.log( "Array เฉพาะค่าซ้ำ = "+c );

      }

      const joinedMeetings = await meeting.aggregate([
        {
          $match: {
           meeting_id: { $in: newMeeting }
          }
        },
        {
          $lookup: {
            from: 'meeting_types',
            localField: 'type_id',
            foreignField: 'type_id',
            as: 'meeting_type'
          }
        },
        {
          $sort: { obj_update_date: -1 } 
        },
        {
          $limit: 3 
        }
      ]);
      res.json(joinedMeetings);


  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}


exports.oncoming = async (req, res) => {
  try{

      const dt = datetime.create();
      const obj_update_date = dt.format("Y-m-d");
      //console.log('Current Date:', obj_update_date);
    //วันปัจจุบัน -1

      const oneDate = moment().add(1, 'days').format("Y-M-D");
      const formattedDate0 = moment(oneDate, "YYYY-M-D").format("YYYY-MM-DD");
     // console.log('1 days ago:', formattedDate0);


      // ก่อนจะถึง
      const threeDaysLater = moment().add(3, 'days').format("Y-M-D");
      const formattedDate2 = moment(threeDaysLater, "YYYY-M-D").format("YYYY-MM-DD");

      //console.log('3 days later:', formattedDate2);


      //หามิสที่ตรงกับวันที่ต้องการ
      const allMeeting = await meeting.distinct("meeting_id",{meeting_date:obj_update_date});     

      const user_id = req.params.user_id;
      //const meetingIds = await attendees_bymeeting.distinct("meeting_id",{'user_id': user_id},);
      const meetingIds = await attendees_bymeeting.distinct("meeting_id", {
        $or: [
            {'user_id': user_id},
            {'user_id_delegate': user_id}
        ]
    });
      const meetingIds1 = await meeting.distinct("meeting_id",{'obj_created_user_id': user_id});

      var newArray = meetingIds.concat(meetingIds1,allMeeting);
      const arraynew = Array.from(new Set(newArray)) 

      var newArray1 = meetingIds.concat(allMeeting);
      const arraynew1 = Array.from(new Set(newArray1)) 
      // console.log("arraynew1",newArray1);
      // console.log("arraynew1",arraynew1);

    let newMeeting;
    if(meetingIds1.length > 0) //เป็นผู้ร่วมอย่างเดียว
      {
        // console.log( "ผู้ร่วมและผู้จัด");

        const a = arraynew;
        const b = allMeeting;
        const c = [];
        
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                c.push(a[i]); 
            } else {
                b.push(a[i]);
            }
        }
        newMeeting = c
      }
      else //ผู้ร่วมและผู้จัด
      {

        console.log(arraynew1);
        const a = newArray1;
        const b = [];
        const c = [];
        
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i])) {
                c.push(a[i]); 
            } else {
                b.push(a[i]);
            }
        }
        newMeeting = c
        // console.log( "Array เดิม = "+a );
        // console.log( "Array ที่ลบค่าซ้ำ = "+b );
        // console.log( "Array เฉพาะค่าซ้ำ = "+c );

      }

      // if(meetingIds1.length > 0) //เป็นผู้ร่วมอย่างเดียว
      // {
      //   console.log( "allMeetingxxdddd"+allMeeting );

      // }
      // else //ผู้ร่วมและผู้จัด
      // {
      //   console.log( "ไม่มีข้อมูล" );

      // }


      // console.log( "allMeeting"+allMeeting );
      // console.log( "meetingIds = "+meetingIds );
      // console.log( "meetingIds1 = "+meetingIds1 );
      // console.log( "newArray = "+newArray );


      //หาค่าที่ซ้ำกันออกมา
    //     const a = arraynew;
    //     const b = allMeeting;
    //     const c = [];
        
    //     for (let i = 0; i < a.length; i++) {
    //         if (b.includes(a[i])) {
    //             c.push(a[i]); 
    //         } else {
    //             b.push(a[i]);
    //         }
    //     }
    // // console.log( "Array เดิม = "+a );
    // // console.log( "Array ที่ลบค่าซ้ำ = "+b );
    // // console.log( "Array เฉพาะค่าซ้ำ = "+c );
    // const newMeeting = c;


      const joinedMeetings = await meeting.aggregate([
        {
          $match: {
           meeting_id: { $in: newMeeting }
          }
        },
        {
          $lookup: {
            from: 'meeting_types',
            localField: 'type_id',
            foreignField: 'type_id',
            as: 'meeting_type'
          }
        },
        {
          $sort: { obj_update_date: -1 } 
        },
        {
          $limit: 3 
        }
      ]);
      res.json(joinedMeetings);


  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}