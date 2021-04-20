const e = require('express');
const messageModel = require('../model/message');
const messageAuthenticator = require('../utilities/message-authenticator');

exports.GetUserMessages = async(req,res) => {
    //Read logged in session to get username for use
    var user = req.session.user;
    try{
        const sentMessages =  await messageModel.find({sender_username:user});
        const receivedMessages = await messageModel.find({recipient_username:user});

        res.status(200).json({
            message: `Sent Messages: ${sentMessages}, ReceivedMessages: ${receivedMessages}`
        });

    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occurred: ${err}`
        });
    }
    
}

exports.GetMessage = async(req,res) => {
    const id = req.params.id;
    try{
        const msg = await messageModel.find({message_id:id});
        if(msg.length >0)
        {
            res.status(200).json({
                message:msg
            });
        }
        else{
            res.status(200).json({
                message:`No message with ID of ${id} could be found.`
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:`An error has occurred: ${err}`
        })
    }
}

exports.SendMessage = async(req,res) => {
    const sender = req.session.user;
    const recipient = req.body.recipientUsername;
    const msg = req.body.message;

    //Check both sender & recipient usernames to make sure they exist in database
    const checked = await messageAuthenticator.AuthenticateUsernames(sender,recipient);
    if(checked)
    {
        try{
            const lastMsgId = await messageModel.find().sort({message_id:-1}).limit(1);
            if(lastMsgId.length>0)
            {
                msgId=lastMsgId[0].message_id +1;
                const newMessage = await messageModel.create(
                    {
                        message_id:msgId,
                        sender_username:sender,
                        recipient_username:recipient,
                        message_contents:msg
                    });
                res.status(201).json({
                    message:`New message created with ID of ${msgId}`
                });
            } else{
                msgId = 1001;
                const newMessage = await messageModel.create(
                    {
                        message_id:msgId,
                        sender_username:sender,
                        recipient_username:recipient,
                        message_contents:msg
                    });
                res.status(201).json({
                    message:`New message created with ID of ${msgId}`
                });
            }
        }catch(err)
        {
            console.log(err);
            res.status(500).json({
                message:`An error has occurred: ${err}`
            });
        }     
    } else{
        res.status(400).json({
            message:"Either the sender or recipient does not exist, please check names and try again"
        })
    }
}

exports.UpdateMessage = async(req,res) => {
    const msg = req.body.message;
    const id = req.params.id;
    try{
        const msgToUpdate = await messageModel.find({message_id:id});
        if(msgToUpdate.length >0)
        {
            const updatedMsg = await  messageModel.updateOne({message_id:id},{message_contents:msg},{new:true});
             res.status(200).json({
             message:`Message with ID ${id} has been updated successfully.`
             });
        }
        else{
            res.status(400).json({
                message:"No message with that ID found"
            });
        }
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occurred: ${err}`
        });
    }
}

exports.DeleteMessage = async(req,res) => {
    const msgId = req.params.id;
    console.log(msgId);
    try{
       await messageModel.findOneAndDelete({message_id:msgId})
            res.status(200).json({
                message:"Message has been deleted"
            });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message:`An error has occurred: ${err}`
        });
    }
}

