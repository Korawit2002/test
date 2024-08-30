const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    group_id: {
        type: String
    },
    meeting_id: {
        type: String
    },
    title: {
        type: String
    },
    people: [
        {
          user_id: String,
          name: String,
          role: String,
          email: String,
        }
      ]
},{ timestamps: true });
module.exports = Group = mongoose.model("Group", groupSchema);