
const collegeModel = require("../Model/collegeModel")
const interModel = require("../Model/InternModel")
const InternModel = require("../Model/InternModel");
const mongoose=require("mongoose");
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };
  
  const isValidRequest = function (object) {
    return Object.keys(object).length > 0
  };
  
  const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
  };
const createinterns = async function (req, res){
    try {
        const nameregex = /^[a-zA-Z ]*$/
        const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const mobileregex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
       let reqquery=req.query
      let interdata = req.body
      
      let collegeid = interdata.collegeId
      if(isValidRequest(reqquery)) return res.status(400).send({status:false,msg:"invalidRequest"})
      if(!isValidRequest(interdata)) return res.status(400).send({status:false,msg:"body should not be empty"})
      if(!isValidObjectId(collegeid))return res.status(400).send({status:false,msg:"collegeId should be valid"})
  
      if(!isValid(interdata.name)) return res.status(400).send({status:false, msg: "name is required"})
      
  
      if(!interdata.name.match(nameregex)) return res.status(400).send ({status:false, msg:"name must be a valid format"})
  
      if(!isValid(interdata.email)) return res.status(400).send({status:false, msg:"email is required"})
      if(!interdata.email.match(emailregex)) return res.status(400).send({status:false, msg:"email must in valid format"})
      const isEmailAlreadyUsed = await InternModel.findOne({email:interdata.email})
      if(isEmailAlreadyUsed){
        return res.status(400).send({status: false, msg: "email already registered"})
      }
      
  
      if(!isValid(interdata.mobile)) return res.status(400).send({status:false, msg:"mobile number must be prasent"})
  
      if(!interdata.mobile.match(mobileregex)) return res.status(400).send({status:false, msg:"mobile number must be a valid format"})
      const isMobileAlreadyUsed = await InternModel.findOne({mobile:interdata.mobile})
      if(isMobileAlreadyUsed){
        return res.status(400).send({status: false, msg: "mobile number already registered"})
      }
      let checkid = await collegeModel.findById(collegeid)
      if(!checkid)  return res.status(404).send({status:false,msg:"college not found"})
  
      let createintern = await interModel.create(interdata)
      return res.status(201).send({status:true,message:"interns created successfully",data:createintern})
    } 
    catch (err) {
       return res.status(500).send({status:false,msg:"server error",error:err.message})
    }

}

module.exports.createinterns = createinterns

