const interModel = require("../Model/InternModel")
const collegeModel = require("../Model/collegeModel")


const createinterns = async function (req, res){
    try {
        const nameregex = /^[a-zA-Z ]*$/
        const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const mobileregex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
  
      let interdata = req.body
      let collegeid = interdata.collegeId
  
      if(Object.keys(interdata).length == 0) return res.status(400).send({status:false, message:"body is required"})
  
      if(!interdata.name) return res.status(400).send({status:false, msg: "name is required"})
  
      if(!interdata.name.match(nameregex)) return res.status(400).send ({status:false, msg:"name must be a valid format"})
  
      if(!interdata.email) return res.status(400).send({status:false, msg:"email is required"})
  
      if(!interdata.email.match(emailregex)) return res.status(400).send({status:false, msg:"email must in valid format"})
  
      if(!interdata.mobile) return res.status(400).send({status:false, msg:"mobile number must be prasent"})
  
      if(!interdata.mobile.match(mobileregex)) return res.status(400).send({status:false, msg:"mobile number must be a valid format"})
  
      let checkid = await collegeModel.findById(collegeid)
      if(checkid == undefined) return res.status(404).send({status:false,msg:"college not found"})
  
      let createintern = await interModel.create(interdata)
      return res.status(201).send({status:true,message:"interns created successfully",data:createintern})
    } 
    catch (err) {
       return res.status(500).send({status:false,msg:"server error",error:err.message})
    }

}

module.exports.createinterns = createinterns