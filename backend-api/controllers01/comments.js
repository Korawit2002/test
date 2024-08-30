const comments = require("../models/Comment.js");
const datetime = require("node-datetime");
const user = require("../models/User");
const iconv = require('iconv-lite');


exports.create_comments = async (req, res) => {

    try {

      var dt = datetime.create();
      const data = JSON.parse(req.body.data);
      const userItem = await user.find({user_id:data.user_id});

    if(req.file)
    {
      const decodedFileName = iconv.decode(Buffer.from(req.file.originalname, 'binary'), 'utf8');
      const allData ={
        meeting_id: data.meeting_id,
        sub_agenda_id: data.sub_agenda_id,
        text_comment: data.text_comment,
        file: req.file.path, //path
        filename: req.file.filename,
        originalname : decodedFileName,
        content_type: req.file.mimetype,
        size: req.file.size,
        user_id: data.user_id,
        child_stucture_four_name:userItem[0].child_stucture_four_name,
        company_id:userItem[0].company_id,
        statusDelete: '0',
        createDate:dt.format("Y-m-d H:M:S"),
        updateDate: dt.format("Y-m-d H:M:S"),
        createBy:  userItem[0].firstname+' '+userItem[0].lastname,
        updateBy:'',
        deleteBy: ''
      }
      const inserts = new comments(allData);
      await inserts.save();
      res.send({ status: "200", mes: "Success" });
    }
    else
    {
        const allData ={
            meeting_id: data.meeting_id,
            sub_agenda_id: data.sub_agenda_id,
            text_comment: data.text_comment,
            file: '',
            filename: '',
            originalname : '',
            content_type: '',
            size: '',
            user_id: data.user_id,
            child_stucture_four_name:userItem[0].child_stucture_four_name,
            company_id:userItem[0].company_id,
            statusDelete: '0',
            createDate:dt.format("Y-m-d H:M:S"),
            updateDate: dt.format("Y-m-d H:M:S"),
            createBy:  userItem[0].firstname+' '+userItem[0].lastname,
            updateBy:'',
            deleteBy: ''
          }

        const inserts = new comments(allData);
        await inserts.save();
        res.send({ status: "200", mes: "Success" });
    }

    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
  };

exports.list_comments = async (req, res) => {
    try {
        const meeting_id = req.params.meeting_id;
     
        const select = await comments.find({meeting_id:meeting_id})
        //.sort({ updateDate: -1 });
        res.status(200).send(select);
      } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!!");
      }

};
// exports.list_commandfile = async (req, res) => {
//     try {
//         const meeting_id = req.params.meeting_id;
//         const statusDelete = '0';

//         const select = await command_file.find({meeting_id:meeting_id,statusDelete:statusDelete})
//         .sort({ updateDate: -1 });
//         res.status(200).send(select);
//       } catch (err) {
//         console.log(err);
//         res.status(400).send("Server Error!!");
//       }

// };

// exports.delete_commandfile = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const statusDelete = '1';

//         // const select = await command_file.find({_id:id,statusDelete:statusDelete})
//         // .sort({ updateDate: -1 });
//         const update= await command_file.findOneAndUpdate(
//             { _id: id },
//             { statusDelete: statusDelete},
//             { new: true }
//           );
//         res.send({ status: "200", mes: "Success" });
//       } catch (err) {
//         console.log(err);
//         res.status(400).send("Server Error!!");
//       }

// };

// exports.search_commandfile = async (req, res) => {
//     try {
//         const id = req.params.id;
       
//         const select = await command_file.find({_id:id})
//         res.status(200).send(select);
       
//       } catch (err) {
//         console.log(err);
//         res.status(400).send("Server Error!!");
//       }

// };
