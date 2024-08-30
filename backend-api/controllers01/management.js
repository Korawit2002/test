const department = require("../models/Department");
const division  = require("../models/Division");

exports.department = async (req, res) => {
    try{
        const dataDepartment = await department.find({})
        res.send(dataDepartment);
        console.log(dataDepartment);
    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }


exports.division = async (req, res) => {
    try{
        const data = await division.find({}).exec();
        //res.send(dataDepartment);
    
        for(let i=0;i<data.length;i++)
        {
          //const department_id = dataDepartment[i].department_id;
         // const s = await department.find({'_id':department_id})
          //console.log(data[i].department_id);
        }


        const data1 = await division.aggregate( [
            {
              $lookup:
                {
                  from: "department",
                  localField: "department_id",
                  foreignField: "_id" ,
                  as: "inventory_docs"
                }
           }
         ] )
         console.log(data1);
       
        
    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }