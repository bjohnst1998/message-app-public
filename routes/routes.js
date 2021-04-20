const express = require('express');

const routing = express.Router();
const userController = require('../controller/UserController');
const messageController = require('../controller/MessageController');

routing.get('/login',userController.Login);

routing.get('/messages',messageController.GetUserMessages);
routing.get('/messages/:id',messageController.GetMessage);

routing.post('/signup',userController.Signup);
routing.post('/messages',messageController.SendMessage);

routing.put('/messages/:id',messageController.UpdateMessage);

routing.delete('/messages/:id',messageController.DeleteMessage);


//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resource not Found'
    })
}

module.exports = routing;