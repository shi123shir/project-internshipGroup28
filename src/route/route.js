const express = require("express")
const router  = express.Router()
const collageController = require("../Controller/CollegeController")
const getcontroller = require("../Controller/getController")


router.post("/functionup/colleges",collageController.createcollage)

router.get("/functionup/collegeDetails",getcontroller.getcollegeDetails)








module.exports = router;