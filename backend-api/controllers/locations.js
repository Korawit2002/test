const provinces = require("../models/Provinces");
const amphures = require("../models/Amphures");
const tombons = require("../models/Tombons");
//const logger = require('../logger');
//const countrys = require("../models/Countrys");

exports.provinces = async (req, res) => {
    try{
        const dataProvince = await provinces.find({})
        res.send(dataProvince);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }
 
 exports.amphures = async (req, res) => {
    try{
        const id = req.params.province_id;
        const dataAmphures = await amphures.find({province_id:id})
        res.send(dataAmphures);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }


 exports.tombons = async (req, res) => {
   
    try{
        const id = req.params.amphure_id;
        const dataTombons = await tombons.find({amphure_id:id})
        res.send(dataTombons);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }

 }

exports.zipcode = async (req, res) => {

    try{
        const id = req.params.id;
        const dataZipcode = await tombons.find({id:id})
        res.send(dataZipcode);
        //console.log(id);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }

}
