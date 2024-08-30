const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema(
{
    pseudo_code:{
        type: String,
    },
    partners_id:{
        type: String,
    },
    project_name:{
        type: String,
    },
    status_delete:{
        type: String,
    },
    create_date:{
        type: String,
    },
    update_date:{
        type: String,
    },
    create_by:{
        type: String,
    },
    update_by:{
        type: String,
    },
    delete_by:{
        type: String,
    },


}
);
module.exports = projects = mongoose.model("projects", ProjectsSchema);