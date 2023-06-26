const mongoose = require('mongoose')
const companyReview = new mongoose.Schema({
    
    companySubject : {
        type : String,
        require : true
    },

    companyReview : {
        type : String,
        require : true
    },

    companyRating : {
        type : String,
        require : true
    },


    isActive : {
        type: String,
        default : true,
    },

    
});

companyReview.set("timestamps", true);
module.exports = mongoose.model("review", companyReview);