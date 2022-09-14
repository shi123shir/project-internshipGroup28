const collegeModel = require("../Model/collageModel")
const validator = require ("validator")

const createcollage = async function(req,res){
    try {
        const nameregex = /^[a-zA-Z ]*$/;
        
        const collage = req.body
        if(Object.keys(collage)==0)return res.status(400).send({status:false,message:"body required"})

        if(!collage.name) return res.status(400).send({status:false,message:"name required"})

        if(!collage.name.match(nameregex)) return res.status(400).send({status:false , message:"name is not valid format"})

        if(!collage.fullName) return res.status(400).send({status:false,message:"fullName required"})
        if(!collage.fullName.match(nameregex)) return res.status(400).send({status:false, message:"fullName must in valid format"})

        if(!collage.logoLink) return res.status(400).send({status:false,message:"logolink is required"})

        if (!validator.isURL(collage.logoLink)) { return res.status(400).send({ status: false, msg: "logoLink should be valid URL" })}
      
        let collagecreate = await collegeModel.create(collage)

        res.status(201).send({status:true,message:"collage created successfully" ,data:collagecreate})

    } catch (err) {
        res.status(500).send({status:false,error:err.message})
    }
}

module.exports.createcollage = createcollage