const mongoose = require("mongoose");

const subAgendaSchema = new mongoose.Schema({
    sub_agenda_id: {
        type: String,
    },
    main_agenda_id: {
        type: String,
    },
    meeting_id: {
        type: String,
    },
    sub_agenda_no: {
        type: String,
    },
    sub_agenda_name: {
        type: String,
    },
    detail_other: {
        type: String,
    },

    meeting_name_ref: {
        type: String,
    },
    meeting_id_ref: {
        type: String,
    },
    main_agenda_id_ref: {
        type: String,
    },
    main_agenda_no_ref: {
        type: String,
    },
    main_agenda_name_ref: {
        type: String,
    },
    sub_agenda_id_ref: {
        type: String,
    },
    sub_agenda_no_ref: {
        type: String,
    },
    sub_agenda_name_ref:{
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
    },
    names:{
        type: Array,
    },
    quillHead: {
        type: Array,
    },
    quillContents: {
        type: Array,
    },
    order: {
        type: String,
    }
});
module.exports = sub_agenda = mongoose.model("sub_agenda", subAgendaSchema);