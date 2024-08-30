const { profile_img } = require("../middleware/profileimg");
const ProfileImg = require("../models/ProfileImg");
const User = require("../models/User");
const fs = require('fs');
const path = require('path');

const uploadDir = path.resolve('public');
const folderDir = path.join(uploadDir, 'profile');

const existsDir = (file) => {
    if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
    if(!fs.existsSync(folderDir)) fs.mkdirSync(folderDir)
}

const dirControl = (file) => {
    return path.join(folderDir, file)
}

exports.uploadProfileImage_backup = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file." });
  }

  try {
    // Optionally, process the image (resize, format conversion) using Sharp

    const userId = req.body.user_id; // Assuming user_id is sent in the request body
    const user = await User.findOne({ user_id: userId });

    if (!user) {
      // Cleanup uploaded file if user doesn't exist
      fs.unlinkSync(req.file.path);
      return res.status(404).send({ message: "User not found." });
    }

    // Create a new ProfileImg document
    const profileImg = new ProfileImg({
      file: req.file.path, // Storing the path instead of the base64 or binary data
      filename: req.file.filename,
      originalname: req.file.originalname,
      content_type: req.file.mimetype,
      size: req.file.size.toString(),
      user_id: userId,
      // Add other fields as necessary
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    });

    await profileImg.save();

    res.status(201).send({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Could not upload the file: " + error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {

    if (!req.file) {
        return res.status(400).send({ message: "Please upload a file." });
    }else{ 
        existsDir()
    }

    const userId = req.body.user_id
    // const user = await User.findOne({ user_id: userId });
    const file = await ProfileImg.findOne({ user_id: userId })

    // Create a new ProfileImg document
    const profileImg = new ProfileImg({
        file: req.file.path, // Storing the path instead of the base64 or binary data
        filename: req.file.filename,
        originalname: req.file.originalname,
        content_type: req.file.mimetype,
        size: req.file.size.toString(),
        user_id: userId,
        // Add other fields as necessary
        createDate: new Date().toISOString(),
        updateDate: '',
      });

    if(file != null) {
        // put
        const getImage = dirControl(file.filename)
        if(fs.existsSync(getImage)) fs.unlink(getImage, () => null)
        const condition = { _id: file._id }
        const update = {
            file : req.file.path,
            filename : req.file.filename,
            originalname : req.file.originalname,
            content_type :  req.file.mimetype,
            size : req.file.size.toString(),
            user_id : userId,
            updateDate : new Date().toISOString()
        }

        option = { multi : true}
        ProfileImg.updateOne(condition, update, option).then((res) => {
        })
    }else{
        await profileImg.save();
    }

    res.status(201).send({
        message: "File uploaded successfully",
        file: {
          filename: req.file.filename,
          path: req.file.path,
          contentType: req.file.mimetype
        }
      });

};

exports.show_profile = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const select = await ProfileImg.find({user_id:user_id})
        .sort({ updateDate: -1 });
        res.status(200).send(select[0]);
    } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!!");
    }
};

exports.remove_profile = async (req, res) => {
    try {
        const id = req.body.id;
        const filename = req.body.filename;
        console.log(req.body)

        await ProfileImg.deleteOne({ _id: id })
        const getImage = dirControl(filename)
        if(fs.existsSync(getImage)) fs.unlink(getImage, () => null)
    } catch (err) {
        console.log(err);
        res.status(400).send('server error!!');
    }
};





exports.uploadProfileImageAdmin = async (req, res) => {

  if (!req.file) {
      return res.status(400).send({ message: "Please upload a file." });
  }else{ 
      existsDir()
  }
console.log("admin",req.body);
  const userId = req.body.admin_id
  // const user = await User.findOne({ user_id: userId });
  const file = await ProfileImg.findOne({ user_id: userId })

  // Create a new ProfileImg document
  const profileImg = new ProfileImg({
      file: req.file.path, // Storing the path instead of the base64 or binary data
      filename: req.file.filename,
      originalname: req.file.originalname,
      content_type: req.file.mimetype,
      size: req.file.size.toString(),
      user_id: userId,
      // Add other fields as necessary
      createDate: new Date().toISOString(),
      updateDate: '',
    });

  if(file != null) {
      // put
      const getImage = dirControl(file.filename)
      if(fs.existsSync(getImage)) fs.unlink(getImage, () => null)
      const condition = { _id: file._id }
      const update = {
          file : req.file.path,
          filename : req.file.filename,
          originalname : req.file.originalname,
          content_type :  req.file.mimetype,
          size : req.file.size.toString(),
          user_id : userId,
          updateDate : new Date().toISOString()
      }

      option = { multi : true}
      ProfileImg.updateOne(condition, update, option).then((res) => {
      })
  }else{
      await profileImg.save();
  }

  res.status(201).send({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype
      }
    });

};

exports.show_profile_admin = async (req, res) => {
  try {
      const user_id = req.params.admin_id;
      const select = await ProfileImg.find({user_id:user_id})
      .sort({ updateDate: -1 });
      res.status(200).send(select[0]);
  } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
  }
};

exports.remove_profile_admin = async (req, res) => {
  try {
      const id = req.body.id;
      const filename = req.body.filename;
      console.log(req.body)

      await ProfileImg.deleteOne({ _id: id })
      const getImage = dirControl(filename)
      if(fs.existsSync(getImage)) fs.unlink(getImage, () => null)
  } catch (err) {
      console.log(err);
      res.status(400).send('server error!!');
  }
};