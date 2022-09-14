const collegeModel = require("../Model/collageModel")
const isvalid = require ("validator")
const { model } = require("mongoose")

const createcollage = async function(req,res){
    try {
        const nameregex = /^[a-z\s]+$/i
        const collage = req.body
        if(Object.keys(collage)==0)return res.status(400).send({status:false,message:"body required"})

        if(!collage.name) return res.status(400).send({status:false,message:"name required"})

        if(!collage.name.match(nameregex)) return res.status(400).send({status:false , message:"name is not valid format"})

        if(!collage.fullName) return res.status(400).send({status:false,message:"fullName required"})

        if(!collage.logoLink) return res.status(400).send({status:false,message:"logolink is required"})

        let collagecreate = await collegeModel.create(collage)

        res.status(201).send({status:true,message:"collage created" ,data:collagecreate})

    } catch (err) {
        res.status.send({status:false,error:err.message})
    }
}

module.exports.createcollage = createcollage