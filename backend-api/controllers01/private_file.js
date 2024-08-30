const private_file = require("../models/Private.js");
const datetime = require("node-datetime");
const user = require("../models/User");
const fs = require('fs');
const iconv = require('iconv-lite');

exports.create_privatefile = async (req, res) => {
    console.log('Files:', req.files);
    console.log('Body:', req.body);

    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send("No files uploaded.");
        }

        if (!req.body.data) {
            return res.status(400).send("No additional data provided.");
        }

        // Normalize `req.body.data` to always be an array
        const additionalDataArray = Array.isArray(req.body.data) ? req.body.data : [req.body.data];
        const additionalDataObjects = additionalDataArray.map(item => JSON.parse(item));

        const fileSavePromises = req.files.map(async (file, index) => {
            const data = additionalDataObjects[index % additionalDataObjects.length].additionalData;
            const decodedFileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf8');
            if (!data.user_id) {
                throw new Error("User ID is missing in the data.");
            }

            const userItem = await user.findOne({ user_id: data.user_id });
            if (!userItem) {
                throw new Error("User not found.");
            }

            const dt = datetime.create();
            const newFileData = {
                ...data,
                file: file.path,
                filename: file.filename,
                originalname: decodedFileName,
                content_type: file.mimetype,
                size: file.size.toString(),
                uploadDate: dt.format("Y-m-d"),
                createDate: dt.format("Y-m-d H:M:S"),
                updateDate: dt.format("Y-m-d H:M:S"),
                createBy: userItem.firstname + ' ' + userItem.lastname
            };

            const insert = new private_file(newFileData);
            await insert.save();
            return insert;
        });

        const savedFiles = await Promise.all(fileSavePromises);
        console.log('Saved Documents:', savedFiles);

        res.status(200).send({ status: "200", mes: "Files uploaded successfully." });
    } catch (err) {
        console.error("Error Details:", err.message);
        console.error("Stack Trace:", err.stack);
        res.status(500).send("Server error occurred.");
    }
};

exports.list_privatefile = async (req, res) => {
    try {
        const meeting_id = req.params.meeting_id;

        const select = await private_file.find({meeting_id:meeting_id})
        .sort({ updateDate: -1 });
        res.status(200).send(select);
    } catch (err) {
        console.log(err);
        res.status(400).send("server error");
    }
};

exports.search_privatefile = async (req, res) => {
    try {
        const id = req.params.id;
        const select = await private_file.find({_id:id})
        res.status(200).send(select);
    } catch (err) {
        console.log(err);
        res.status(400).send("server error");
    }
}

exports.update_privatefile = async (req, res) => {
    console.log('Files:', req.files);
    console.log('Body:', req.body);

    try {
        const fileData = JSON.parse(req.body.data);

        const file_id = fileData._id;

        if (!file_id) {
            return res.status(400).send("Invalid or missing file ID.");
        }

        // Find the file by its _id (Mongoose automatically handles ObjectId conversion)
        let existingFile = await private_file.findById(file_id);
        if (!existingFile) {
            return res.status(404).send("File not found.");
        }

        // Check if a new file is uploaded
        const newFile = req.files && req.files.length > 0 ? req.files[0] : null;

        // Update the file record
        if (newFile) {
            const decodedFileName = iconv.decode(Buffer.from(newFile.originalname, 'binary'), 'utf8');
            existingFile.file = newFile.path;
            existingFile.filename = newFile.filename;
            existingFile.originalname = decodedFileName;
            existingFile.content_type = newFile.mimetype;
            existingFile.size = newFile.size.toString();
        }

        existingFile.name = fileData.name || existingFile.name;
        existingFile.description = fileData.description || existingFile.description;
        existingFile.displayname = fileData.displayname || existingFile.displayname; 
        existingFile.sub_agenda_id = fileData.sub_agenda_id || existingFile.sub_agenda_id;
        
        // Update the updateDate
        const dt = datetime.create();
        existingFile.updateDate = dt.format("Y-m-d H:M:S");

        // Save the updated record
        await existingFile.save();

        res.status(200).send({ status: "200", mes: "File updated successfully." });
    } catch (err) {
        console.error("Error Details:", err.message);
        console.error("Stack Trace:", err.stack);
        res.status(500).send("Server error occurred.");
    }
};

exports.delete_privatefile = async (req, res) => {
    try {
        const fileId = req.params.id;

        // Find the file in the database
        const file = await private_file.findById(fileId);
        if (!file) {
            return res.status(404).send("File not found.");
        }

        // Delete the file record from the database
        await private_file.findByIdAndDelete(fileId);

        // Delete the file from the server directory
        const filePath = file.file; // Assuming 'file.file' contains the path where Multer saved the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error in deleting file from server:", err);
                return res.status(500).send("Error in deleting file from server.");
            }
            res.status(200).send({ message: "File deleted successfully." });
        });
    } catch (err) {
        console.error("Error Details:", err.message);
        console.error("Stack Trace:", err.stack);
        res.status(500).send("Server error occurred.");
    }
};

exports.updatePrivateOrder = async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      for (const update of updates) {
        const test = await private_file.findOneAndUpdate(
          {_id : update.id},
          {private_order: update.private_order},
          {new: true}
        );
      }
      res.status(200).send('Private order updated successfully');
    } catch (err) {
      console.error(err);
      res.status(400).send('Server Error!!');
    }
  };