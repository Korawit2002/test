const projects = require("../models/Projects");

exports.create_project = async (req, res) => {
  try {

    const data = req.body.data_project;
    const pseudo_code = req.body.id;
    const project_name = data.project_name;
    const partners_id = '';
    if(project_name === undefined) 
    {
      return res.json('error');
            
    } else {

      const dtatCount = await projects.find({project_name:project_name,pseudo_code:pseudo_code}).count();
            if(dtatCount != 0)
            {
                return res.json('error');
            }
            else
            {
              const inserts = new projects({
                partners_id,
                pseudo_code,
                project_name,
              });
              await inserts.save();
              res.json("ok");
            }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.project_list = async (req, res) => {
  try {
   
    const id = req.params.id;
    const dtatCount = await projects.find({pseudo_code:id}).count();
    
    if(dtatCount != 0)
    {
        const datalistProject = await projects.find({pseudo_code:id});
       res.send({status:'Success', data:datalistProject});
    }
    else
    {
        res.send({status:'Error', data:''});
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.remov_project = async (req, res) => {
    try{
        const id = req.params.id;
        const dataDelete = await projects.deleteOne({_id:id});
        
        res.send('ok');
       

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }