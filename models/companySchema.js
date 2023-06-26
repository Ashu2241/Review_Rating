const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    
    companyName : {
        type : String,
        require : true
    },

    city : {
        type : String,
        require : true
    },

    location : {
        type : String,
        require : true
    },


    isActive : {
        type: String,
        default : true,
    },

    
});

companySchema.set("timestamps", true);
module.exports = mongoose.model("company", companySchema);