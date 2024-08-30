const shipping = require("../models/ShippingAddress");
exports.create_shipping = async (req, res) => {
  try {
    
    let pseudo_code = req.body.pseudo_code;
    let location = req.body.data1;
    let fulladdress = req.body.data2;
    let tumbol = req.body.data3;
    let tumbol_name = req.body.data4;
    let ampur = req.body.data5;
    let ampur_name = req.body.data6;
    let province = req.body.data7;
    let province_name = req.body.data8;
    let zipcode = req.body.data9;
    let google_map = req.body.data10;
    //let statusfile = req.body.data11;
    let partners_id = "";
    let status_delete = "0";
    let create_date= "";
    let update_date= "";
    let create_by= "";
    let update_by= "";
    let delete_by= "";

    let file_google = "";
    let file_name = "";
    console.log(pseudo_code);
    // if(statusfile !== "undefined") {
     
    //   file_google = "";
    //   file_name = "";
    //   console.log("sssssss");
    // }
    // else{

    //   file_google = req.file.filename;
    //   file_name = req.file.originalname;
    // console.log("22");
    // }

    if(location === "" || fulladdress === "") 
    {
      return res.send('error');
            
    } else {
      // const dtatCount = await shipping.find({location:location,fulladdress:fulladdress,province:province,ampur:ampur,tumbol:tumbol,zipcode:zipcode,pseudo_code:pseudo_code}).count();
      // if(dtatCount != 0)
      // {
      //   return res.json('error');
        
      // }
      // else
      // {
          const inserts_shipping = new shipping({
            partners_id,
            pseudo_code,
            location,
            fulladdress,
            tumbol,
            tumbol_name,
            ampur,
            ampur_name,
            province,
            province_name,
            zipcode,
            google_map,
            file_google,
            file_name,
            status_delete,
            create_date,
            update_date,
            create_by,
            update_by,
            delete_by
        });
       await inserts_shipping.save();
        
       console.log(inserts_shipping);
        res.json("ok");
     // }
    }

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

exports.shipping_list = async (req, res) => {
  try {
   
    const id = req.params.id;
    const dtatCount = await shipping.find({pseudo_code:id}).count();
    
    if(dtatCount != 0)
    {
        const datalistDShipping = await shipping.find({pseudo_code:id});
       res.send({status:'Success', data:datalistDShipping});
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

exports.remov_shipping = async (req, res) => {
  try {

    const id = req.params.id;
    const dataDelete = await shipping.deleteOne({_id:id});
    res.send("ok");

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};
exports.delete_file_shipping = async (req, res) => {
  try {

    const id = req.params.id;
    const file_google = "";
    const file_name = "";

    const update = await shipping.findOneAndUpdate({_id:id},{file_google: file_google, file_name: file_name },{ new: true });
    res.send({ status: "200", mes: "Success" });

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};


exports.upload_file_shipping = async (req, res) => {
  try {
    const id = req.body.data;
    const file_google = req.file.filename;
    const file_name = req.file.originalname;

    const update = await shipping.findOneAndUpdate({_id:id},{ file_google: file_google, file_name: file_name},{ new: true });
   
    res.send({ status: "200", mes: "Success" });

  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error!!");
  }
};

