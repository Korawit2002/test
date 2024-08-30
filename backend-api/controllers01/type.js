const person_type = require("../models/PersonType");
const juristic_type = require("../models/JuristicType");
const options_billing = require("../models/OptionsBillings");
const options_payment = require("../models/OptionsPayment");

exports.person_type = async (req, res) => {
    try{
        const datapersonType = await person_type.find({});
        res.send(datapersonType);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }

 exports.juristic = async (req, res) => {
    try{
        const id = req.params.person_type_id;
        const datajuristicType = await juristic_type.find({person_type_id:id});
        res.send(datajuristicType);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }

 exports.options_payment = async (req, res) => {
    try{
        const dataOptionsPayment = await options_payment.find({});
        res.send(dataOptionsPayment);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }

 exports.options_billing = async (req, res) => {
    try{
        const dataOptionsBilling = await options_billing.find({});
        res.send(dataOptionsBilling);

    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }