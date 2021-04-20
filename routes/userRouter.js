const express = require('express');

const routing = express.Router();
const userController = require('../controller/UserController');

routing.get('/login',userController.Login);
routing.post('/signup',userController.Signup);
routing.get('/logout',userController.Logout);
routing.all('*',invalid);
//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resource not Found'
    })
}

module.exports = routing;