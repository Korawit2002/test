const command_file = require("../models/CommandFile.js");
const datetime = require("node-datetime");
const user = require("../models/User");
const iconv = require('iconv-lite');


exports.create_commandfile = async (req, res) => {
    try {

      var dt = datetime.create();
      const data = JSON.parse(req.body.data);
      const base64String = req.file.path;
      const binaryData = Buffer.from(base64String, 'base64');
      const userItem = await user.find({user_id:data.user_id});

      const decodedFileName = iconv.decode(Buffer.from(req.file.originalname, 'binary'), 'utf8');

      const  meeting_id = data.meeting_id;
      const description = data.description;
      const file = req.file.path; //path
      const filename = req.file.filename;
      const originalname  = decodedFileName;
      const content_type = req.file.mimetype;
      const size = req.file.size;
      const user_id = data.user_id;
      const company_id = data.company_id;
      const statusDelete = '0';
      const createDate = dt.format("Y-m-d H:M:S");
      const updateDate = dt.format("Y-m-d H:M:S");
      const createBy =  userItem[0].firstname+' '+userItem[0].lastname;
      const updateBy =  '';
      const deleteBy = '';
  
      const inserts = new command_file({
        meeting_id,
        description,
        file,
        filename,
        originalname,
        content_type,
        size,
        user_id,
        company_id,
        statusDelete,
        createDate,
        updateDate,
        createBy,
        updateBy,
        deleteBy,
      });
      await inserts.save();
      console.log("update",req.file);
      res.send({ status: "200", mes: "Success" });

    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
  };

exports.list_commandfile = async (req, res) => {
    try {
        const meeting_id = req.params.meeting_id;
     
        const select = await command_file.find({meeting_id:meeting_id})
        .sort({ updateDate: -1 });
        res.status(200).send(select);
      } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!!");
      }

};
exports.list_commandfile = async (req, res) => {
    try {
        const meeting_id = req.params.meeting_id;
        const statusDelete = '0';

        const select = await command_file.find({meeting_id:meeting_id,statusDelete:statusDelete})
        .sort({ updateDate: -1 });
        res.status(200).send(select);
      } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!!");
      }

};

exports.delete_commandfile = async (req, res) => {
    try {
        const id = req.params.id;
        const statusDelete = '1';

        // const select = await command_file.find({_id:id,statusDelete:statusDelete})
        // .sort({ updateDate: -1 });
        const update= await command_file.findOneAndUpdate(
            { _id: id },
            { statusDelete: statusDelete},
            { new: true }
          );
        res.send({ status: "200", mes: "Success" });
      } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!!");
      }

};

exports.search_commandfile = async (req, res) => {
    try {
        const id = req.params.id;
       
        const select = await command_file.find({_id:id})
        res.status(200).send(select);
       
      } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!!");
      }

};

exports.update_commandfile = async (req, res) => {
  console.log('Files:', req.files);
  console.log('File:', req.file);
  console.log('Body:', req.body);
  try {
      const id = req.params.id; // Assuming the ID is passed as a URL parameter
      const data = JSON.parse(req.body.data); // Parsing the data from the request body
      
      // Building an object with the fields to be updated
      const updateData = {};
      if (data.description) updateData.description = data.description;
      if (data.meeting_id) updateData.meeting_id = data.meeting_id;
      // Add more fields as needed

      // If there's a file in the request, handle the file update
      if (req.file) {
          const decodedFileName = iconv.decode(Buffer.from(req.file.originalname, 'binary'), 'utf8');
          updateData.file = req.file.path; //path
          updateData.filename = req.file.filename;
          updateData.originalname = decodedFileName;
          updateData.content_type = req.file.mimetype;
          updateData.size = req.file.size.toString();
      }

      updateData.description = data.description || updateData.description;

      const dt = datetime.create();
      updateData.updateDate = dt.format("Y-m-d H:M:S");

      // Update the document in the database
      const update = await command_file.findOneAndUpdate(
          { _id: id },
          updateData,
          { new: true }
      );

      if (!update) {
          return res.status(404).send({ status: "404", mes: "Document not found" });
      }

      res.send({ status: "200", mes: "Update Successful", updatedDocument: update });
  } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
  }
};

exports.updateCommandOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    for (const update of updates) {
      const test = await command_file.findOneAndUpdate(
        {_id : update.id},
        {command_order: update.command_order},
        {new: true}
      );
    }
    res.status(200).send('Command order updated successfully');
  } catch (err) {
    console.error(err);
    res.status(400).send('Server Error!!');
  }
};