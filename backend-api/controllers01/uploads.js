const companyPhoto = require("../models/companyPhoto.js");
const Partners = require("../models/Partners.js");

exports.upload_company_photo = async (req, res) => {
  try {
    //const data = JSON.parse(req.body.data);
    const pseudo_code = req.body.data;
    console.log("data", req.file);
    const partners_id = "";
    const statusDelete = "0";
    const createDate = "";
    const updateDate = "";
    const createBy = "";
    const updateBy = "";
    const deleteBy = "";

    const inserts = new companyPhoto({
      partners_id: partners_id,
      pseudo_code: pseudo_code,
      filename: req.file.filename,
      originalname: req.file.originalname,
      type: req.file.mimetype,
      filenam: req.file.filenam,
      size: req.file.size,
      statusDelete: statusDelete,
      createDate: createDate,
      updateDate: updateBy,
      createBy: createBy,
      updateBy: updateBy,
      deleteBy: deleteBy,
    }).save();
    console.log("update", inserts);
    res.send({ status: "200", mes: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.companyphots_list = async (req, res) => {
  try {
    const id = req.params.id;
    const dataCount = await companyPhoto.find({ pseudo_code: id }).count();
    if (dataCount != 0) {
      const dataPhost = await companyPhoto.find({ pseudo_code: id });
      //console.log(dataPhost);
      res.send({ status: "Success", data: dataPhost });
    } else {
      res.send({ status: "Error", data: "" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.delete_imgcompany = async (req, res) => {
  try {
    const id = req.params.id;
    const dataDelete = await companyPhoto.findOneAndDelete({ _id: id });
    res.send("Success");
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

//map
exports.upload_company_map = async (req, res) => {
  try {
    //const data = JSON.parse(req.body.data);
    const pseudo_code = req.body.data;
    const company_map_file = req.file.filename;
    const company_map = req.file.originalname;

    const update = await Partners.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { company_map: company_map, company_map_file: company_map_file },
      { new: true }
    );
    console.log("update", update);
    res.send({ status: "200", mes: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.companymap_list = async (req, res) => {
  try {
    const id = req.params.id;
    const dataPhost = await Partners.find({ pseudo_code: id });
    res.send(dataPhost);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};
exports.delete_companymap = async (req, res) => {
  try {
    const pseudo_code = req.params.id;
    const company_map_file = "";
    const company_map = "";

    const update = await Partners.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      { company_map: company_map, company_map_file: company_map_file },
      { new: true }
    );
    res.send("Success");
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.upload_file_certificate = async (req, res) => {
  try {
    const pseudo_code = req.body.data;
    const company_certificate_file = req.file.filename;
    const company_certificate = req.file.originalname;

    const update = await Partners.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      {
        company_certificate_file: company_certificate_file,
        company_certificate: company_certificate
      },
      { new: true }
    );
   // console.log("certificate", update);
    res.send({ status: "200", mes: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.upload_file_registration = async (req, res) => {
  try {
    const pseudo_code = req.body.data;
    const vat_registration_file = req.file.filename;
    const vat_registration = req.file.originalname;

    const update = await Partners.findOneAndUpdate(
      { pseudo_code: pseudo_code },
      {
         vat_registration_file: vat_registration_file,
         vat_registration: vat_registration
      },
      { new: true }
    );
    //console.log("registration", update);
    res.send({ status: "200", mes: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.upload_file_seal = async (req, res) => {
   try{

       const pseudo_code = req.body.data;
       const company_seal_file = req.file.filename
       const company_seal = req.file.originalname

      const update3 = await Partners.findOneAndUpdate({ pseudo_code: pseudo_code },{company_seal_file:company_seal_file,company_seal:company_seal},{ new: true });
      //console.log('seal',update3);
      res.send({status:'200', mes:'Success'});

   } catch (err){
        console.log(err)
        res.status(400).send('Server Error!!');
   }
}



exports.delete_file_certificate = async (req, res) => {
   try {
     const pseudo_code = req.params.id;
     const company_certificate_file = '';
     const company_certificate = '';
 
     const update = await Partners.findOneAndUpdate(
       { pseudo_code: pseudo_code },
       {
         company_certificate_file: company_certificate_file,
         company_certificate: company_certificate
       },
       { new: true }
     );
    // console.log("certificate", update);
     res.send({ status: "200", mes: "Success" });
   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
 };
 
 exports.delete_file_registration = async (req, res) => {
   try {
     const pseudo_code = req.params.id;
     const vat_registration_file = '';
     const vat_registration = '';
 
     const update = await Partners.findOneAndUpdate(
       { pseudo_code: pseudo_code },
       {
          vat_registration_file: vat_registration_file,
          vat_registration: vat_registration
       },
       { new: true }
     );
     //console.log("registration", update);
     res.send({ status: "200", mes: "Success" });
   } catch (err) {
     console.log(err);
     res.status(400).send("Server Error!!");
   }
 };
 
 exports.delete_file_seal = async (req, res) => {
    try{
 
        const pseudo_code = req.params.id;
        const company_seal_file = '';
        const company_seal = '';
 
       const update3 = await Partners.findOneAndUpdate({ pseudo_code: pseudo_code },{company_seal_file:company_seal_file,company_seal:company_seal},{ new: true });
       //console.log('seal',update3);
       res.send({status:'200', mes:'Success'});
 
    } catch (err){
         console.log(err)
         res.status(400).send('Server Error!!');
    }
 }


exports.upload_file_payment = async (req,res) => {
   try{

      const pseudo_code = req.body.data;
      const file_billing = req.file.filename
      const file_billing_name = req.file.originalname

     const update3 = await Partners.findOneAndUpdate({ pseudo_code: pseudo_code },{file_billing:file_billing,file_billing_name:file_billing_name},{ new: true });
     //console.log('seal',update3);
     res.send({status:'200', mes:'Success'});

  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}

exports.filepayment_list = async (req,res) => {
   
}

exports.delete_file_payment = async (req,res) => {
   try{
 
      const pseudo_code = req.params.id;
      const file_billing = '';
      const file_billing_name = '';

     const update3 = await Partners.findOneAndUpdate({ pseudo_code: pseudo_code },{file_billing:file_billing,file_billing_name:file_billing_name},{ new: true });
     //console.log('seal',update3);
     res.send({status:'200', mes:'Success'});

  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}