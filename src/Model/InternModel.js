const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true ,
        unique: true,
        trim: true
    },
    email:
    {
        type: String,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    collegeId: {
        type: ObjectId,
        ref: "college",
        trim: true
    },
    isDeleted: { type: Boolean, default: false, trim: true }
}, { timestamps: true })
module.exports = mongoose.model('intern', internSchema)