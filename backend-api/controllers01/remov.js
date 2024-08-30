const customer_group = require("../models/CustomerGroups");
const partenr_group_detail = require("../models/PartenrGroupDetails");
const sub_customer_groups = require("../models/SubCustomerGroups");

exports.remov_group_customer = async (req, res) => {
    try{
        const id = req.params.id;

        //const datashow = await partenr_group_detail.find({_id:id}).exec();
        //const pseudo_code = datashow[0].pseudo_code;
    
       const dataDelete = await partenr_group_detail.findOneAndDelete({_id:id});
       //const datacount = await partenr_group_detail.find({pseudo_code:pseudo_code}).count();

        //console.log('delect',dataDelete);
        res.json(dataDelete);
       

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }

 