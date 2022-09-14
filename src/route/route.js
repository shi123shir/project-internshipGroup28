const express = require("express")
const router  = express.Router()
const internController=("../Controller/internController.js")

 router.post("/functionup/interns",internController.createIntern)









module.exports = router;