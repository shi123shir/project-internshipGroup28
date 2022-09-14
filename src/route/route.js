const express = require("express")
const router  = express.Router()
const collageController = require("../Controller/CollegeController")


router.post("/functionup/colleges",collageController.createcollage)










module.exports = router;