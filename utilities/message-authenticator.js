const userModel = require('../model/user');

//checks if both usernames exist in database
exports.AuthenticateUsernames = async(sender,recipient) =>{
    try{
        const existSender = await userModel.find({username:sender});
        const existRecipient = await userModel.find({username:recipient});
        console.log(existSender[0] +' ' + existRecipient[0])
        if(existSender[0] !=null && existRecipient[0] !=null)
        {
            console.log("Both users exist!")
            return true;
        } else {
            return false;
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
   

}