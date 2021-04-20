const express = require('express');

const routing = express.Router();
const messageController = require('../controller/MessageController');

routing.get('/',messageController.GetUserMessages);
routing.get('/:id',messageController.GetMessage);

routing.post('/',messageController.SendMessage);

routing.put('/:id',messageController.UpdateMessage);

routing.delete('/:id',messageController.DeleteMessage);

routing.all('*',invalid);
//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resource not Found'
    })
}

module.exports = routing;