const mongoose = require("mongoose");

const mainAgendaSchema = new mongoose.Schema({
    main_agenda_id: {
        type: String,
    },
    meeting_id: {
        type: String,
    },
    main_agenda_no: {
        type: String,
    },
    main_agenda_name: {
        type: String,
    },
    priority: {
        type: String,
    },
    group_id: {
        type: String,
    },
    secret: {
        type: String,
    },
    obj_created_date: {
        type: String,
    },
    obj_created_user_id: {
        type: String,
    },
    obj_update_date: {
        type: String,
    },
    obj_update_user_id: {
        type: String,
    }
});
module.exports = main_agenda = mongoose.model("main_agenda", mainAgendaSchema);