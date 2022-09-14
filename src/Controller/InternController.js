const collegeModel=require("../Model/collageModel")
const internModel=require("../Model/internModel")
const validate=require("validator")
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
  
 
const createIntern= async function(req,res){
try {
    let reqbody=req.body
    let reqquery=req.query
    // if there is any request in query params
    if(isValidRequest(reqquery)) return res.status(400).send({status:false,msg:"invalidRequest"})
    // if the body is empty validation
    if(!isValidRequest(reqbody)) return res.status(400).send({status:false,msg:"body should not be empty"})
    const {name, mobile, email, collegeName}=reqbody
    if (Object.keys(reqbody).length>4) return  res.status(400).send({status:false,msg:"body should be less that 4 keys"})
    if(!isValid(name)) return  res.status(400).send({status:false,msg:"name is required"}) 
        if (!validator.isAlpha(value)) {
          return res.status(400).send({status:false,msg:"name should be valid"});
        }

} catch (error) {
    res.status(500).send({status:false,msg:error.message})
}
}



module.exports.createIntern=createIntern