 const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    message_id: {
        type: Number,
        required: [true, 'Required Field']
    },
    sender_username: {
        type:String,
        required: [true,'Required Field']
    },
    recipient_username: {
        type:String,
        required:[true,'Required Field']
    },
    message_contents: {
        type:String,
        required:[true,'Required Field']
    }
})

module.exports = mongoose.model('messages',messageSchema);
