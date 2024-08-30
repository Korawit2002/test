const Partners = require("../models/Partners");
const auto_partners = require("../models/AutoPartners");
// const logger = require("../logger");
const datetime = require("node-datetime");
const partenr_group_detail = require("../models/PartenrGroupDetails");
const contact = require("../models/Contacts");
const projects = require("../models/Projects");
const shipping = require("../models/ShippingAddress");
const document = require("../models/Documents");

exports.company = async (req, res) => {
  try {
    const dtatCount = await Partners.find({}).count();
    if (dtatCount != 0) {
      const showCompany = await Partners.find({})
        .select("pseudo_code")
        .select("partners_id")
        .select("person_type_name")
        .select("juristic_id")
        .select("juristic_name_th")
        .select("juristic_name_en")
        .select("group_name")
        .exec();
      //res.send(showCompany);
      //console.log(showCompany);
      const status = '200';
        const mes = 'Success';
        res.send({status:status, mes:mes, data:showCompany});
    }
    else
    {
        const status = '404';
        const mes = 'Data not found.';
        res.send({status:status, mes:mes, data:''});
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.company_project = async (req, res) => {
    try {
      const partners_id = req.params.partners_id;
      const dtatCount = await projects.find({partners_id:partners_id}).count();
      if (dtatCount != 0) {
        const showProject = await projects.find({partners_id:partners_id})
          .select("pseudo_code")
          .select("partners_id")
          .select("project_name")
          .exec();
       // res.send(showProject);
        //console.log(showCompany);
        const status = '200';
        const mes = 'Success';
        res.send({status:status, mes:mes, data:showProject});
      }
      else
      {
        const status = '404';
        const mes = 'Data not found.';
        res.send({status:status, mes:mes, data:''});
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
  };

  
  exports.company_contact = async (req, res) => {
    try {
      const partners_id = req.params.partners_id;
      const dtatCount = await contact.find({partners_id:partners_id}).count();
      if (dtatCount != 0) {
        const showContact = await contact.find({partners_id:partners_id}).exec();
        const status = '200';
        const mes = 'Success';
        res.send({status:status, mes:mes, data:showContact});

      }
      else
      {
        const status = '404';
        const mes = 'Data not found.';
        res.send({status:status, mes:mes, data:''});
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
  };