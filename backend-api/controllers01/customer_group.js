const customer_group = require("../models/CustomerGroups");
const partenr_group_detail = require("../models/PartenrGroupDetails");
const sub_customer_groups = require("../models/SubCustomerGroups");

exports.customer_group = async (req, res) => {
    try{
        const id = req.params.id;
        const datajuristicType = await partenr_group_detail.find({pseudo_code:id}).count();
        if(datajuristicType != 0)
        {
            const datashow = await partenr_group_detail.find({pseudo_code:id}).exec();
            const all =[]; 

           for(let i=0;i<datashow.length;i++)
           {
            all.push(datashow[i].group_id);
           }

             const datacustomerGroup = await customer_group.find({group_id :{$nin:all}});
             res.send(datacustomerGroup);
            // console.log(datacustomerGroup);
        }
        else
        {
            const datacustomerGroup = await customer_group.find({});
            res.send(datacustomerGroup);
            //console.log(datajuristicType);
        }

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }

 exports.list_customer_group = async (req, res) => {
    try{
        const id = req.params.id;
        const dtatCount = await sub_customer_groups.find({group_id:id}).count();
        if(dtatCount != 0)
        {
            const datalistGroup = await sub_customer_groups.find({group_id:id});
            res.send(datalistGroup);
            //console.log(datalistGroup);
        }
        else
        {
            const id = '99';
            const datalistGroup = await sub_customer_groups.find({group_id:id});
            res.send(datalistGroup);
            //console.log(datalistGroup);
        }
       
    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }
 

 exports.group_details = async (req, res) => {
    try{
       
        const data = req.body.data_group;
        const pseudo_code = req.body.id;
        const group_id = data.group_id;
        const group_name = data.group_name;
        const sub_group_id = data.sub_group_id;
        const sub_group_name = data.sub_group_name;
        const partners_id = '';
        if(group_id === undefined || sub_group_id === undefined) 
        {
            return res.json('error');
            
        } else {

            const dtatCount = await partenr_group_detail.find({group_id:group_id,sub_group_id:sub_group_id,pseudo_code:pseudo_code}).count();

            if(dtatCount != 0)
            {
                return res.json('error');
            }
            else
            {
                const inserts = new partenr_group_detail({
                    partners_id,
                    pseudo_code,
                    group_id,
                    group_name,
                    sub_group_id,
                    sub_group_name
                })
                await inserts.save();
                res.json('ok');
            }
           
        }
    

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }
 
 exports.show_customer_group = async (req, res) => {
    try{
        
        const id = req.params.id;
        const dtatCount = await partenr_group_detail.find({pseudo_code:id}).count();
        if(dtatCount != 0)
        {
            const datalistGroup = await partenr_group_detail.find({pseudo_code:id});
           res.send({status:'Success', data:datalistGroup});
        }
        else
        {
            res.send({status:'Error', data:''});
        }
       
    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }
 
 
 exports.groups = async (req, res) => {
    try{
        const dataGroups = await customer_group.find({});
        res.send(dataGroups);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }
