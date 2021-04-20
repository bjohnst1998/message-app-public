const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,'Required Field']
        },
        password:{
            type:String,
            required:[true,'Required Field']
        }
    }
)

module.exports = mongoose.model('users',userSchema);