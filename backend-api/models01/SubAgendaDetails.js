const mongoose = require("mongoose");

const subAgendaDetailSchema = new mongoose.Schema({
    details_id: {
        type: String,
    },
    sub_agenda_id: {
        type: String,
    },
    main_agenda_id: {
        type: String,
    },
    details_no: {
        type: String,
    },
    details: {
        type: String,
    },
    obj_created_date: {
        type: String,
    },
    obj_update_date: {
        type: String,
    },
    order: {
        type: String,
    }
});
module.exports = sub_agenda_details = mongoose.model("sub_agenda_details", subAgendaDetailSchema);