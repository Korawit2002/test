const mongoose = require("mongoose");

const responsibleSchema = new mongoose.Schema({
    responsible_id: {
        type: String,
    },
    sub_agenda_id: {
        type: String,
    },
    main_agenda_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    title: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    }

});
module.exports = responsible_person = mongoose.model("responsible_person", responsibleSchema);