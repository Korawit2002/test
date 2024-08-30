const document = require("../models/Documents");

exports.create_document = async (req, res) => {

  //console.log("status_file",req.body.data);

    try {
    const pseudo_code = req.body.id;
    // let fulladdress = req.body.data1;
    // let province = req.body.data2;
    // let province_name = req.body.data3;
    // let ampur =req.body.data4;
    // let ampur_name = req.body.data5;
    // let tumbol = req.body.data8;
    // let tumbol_name = req.body.data9;
    // let zipcode = req.body.data6;
    // let google_map = req.body.data7;
    // let status_file = req.body.click;
    let partners_id = '';
    let status_delete= '';
    let create_date= '';
    let update_date= '';
    let create_by= '';
    let update_by= '';
    let delete_by= '';

    let file_map = '';
    let file_name = '';


    



    // if(status_file === "undefined") {
     
    //   file_map = "";
    //   file_name = "";
    //   console.log("sssssss");
    // }
    // else{

    //   file_map = req.file.filename;
    //   file_name = req.file.originalname;
    
    // }

    // console.log("999",req.body.data)
    // if(fulladdress === "") 
    // {
    //   return res.json('error');
      
    // } else {

    //   const dtatCount = await document.find({pseudo_code: pseudo_code},{fulladdress:fulladdress,province:province,ampur:ampur,tumbol:tumbol,zipcode:zipcode}).count();
     
    //  console.log('dtatCount',dtatCount);

    //   if(dtatCount != 0)
    //   { 
    //     console.log("22")
    //     return res.json('error');
        
    //   }
    //   else
    //   {
        
      //     const inserts = new document({
      //     partners_id,
      //     pseudo_code,
      //     fulladdress,
      //     province,
      //     province_name,
      //     ampur,
      //     ampur_name,
      //     tumbol,
      //     tumbol_name,
      //     zipcode,
      //     google_map,
      //     file_map,
      //     file_name,
      //     status_delete,
      //     create_date,
      //     update_date,
      //     create_by,
      //     update_by,
      //     delete_by,
      
      //   });
      //  await inserts.save();
      //   console.log(inserts);
      //   res.json("ok");
     // }
    //}

    } catch (err) {
      console.log(err);
      res.status(400).send("Server Error!!");
    }
  };
  
exports.document_delivery_list = async (req,res) => {
  try {
   
      const id = req.params.id;
      const dtatCount = await document.find({pseudo_code:id}).count();
      
      if(dtatCount != 0)
      {
          const datalistContact = await document.find({pseudo_code:id});
         res.send({status:'Success', data:datalistContact});
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


exports.remov_document = async (req, res) => {
  try{
      const id = req.params.id;
      const dataDelete = await document.deleteOne({_id:id});
      res.send('ok');
     

  } catch (err){
       console.log(err)
       res.status(400).send('Server Error!!');
  }
}


exports.upload_file_documentdelivery = async (req, res) => {
  try {
    const id = req.body.data;
    const file_map = req.file.filename;
    const file_name = req.file.originalname;

    const update = await document.findOneAndUpdate({_id:id},{file_map: file_map,file_name: file_name},{ new: true });
    res.send({ status: "200", mes: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.delete_imgdocument = async (req,res) => {
  try {
    const id = req.params.id;
    const file_map = '';
    const file_name = '';

    const update = await document.findOneAndUpdate(
      { _id: id },
      {
        file_map: file_map,
        file_name: file_name
      },
      { new: true }
    );
   console.log("certificate", id);
    res.send({ status: "200", mes: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
}

exports.create_document_delivery = async (req ,res) =>
{
  
  try {
   // console.log("document",req.body.data);
    //console.log("document_file",req.body.data1);

    const pseudo_code = req.body.data;
    let fulladdress = req.body.data1;
    let province = req.body.data2;
    let province_name = req.body.data3;
    let ampur =req.body.data4;
    let ampur_name = req.body.data5;
    let tumbol = req.body.data8;
    let tumbol_name = req.body.data9;
    let zipcode = req.body.data6;
    let google_map = req.body.data7;
    let status_file = req.body.click;
    let partners_id = '';
    let status_delete= '';
    let create_date= '';
    let update_date= '';
    let create_by= '';
    let update_by= '';
    let delete_by= '';
    let file_map = '';
    let file_name = '';

    if(fulladdress === "") 
    {
      return res.send('Error');
      
    } else {

          const inserts_document = new document({
          partners_id,
          pseudo_code,
          fulladdress,
          province,
          province_name,
          ampur,
          ampur_name,
          tumbol,
          tumbol_name,
          zipcode,
          google_map,
          file_map,
          file_name,
          status_delete,
          create_date,
          update_date,
          create_by,
          update_by,
          delete_by,
      
        });
       await inserts_document.save();
        //console.log(inserts_document);
        res.send("ok");

    }

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
}