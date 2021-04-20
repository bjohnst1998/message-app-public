
const sessionAuth = (req, res, next) =>{
    const user = req.session.user;
    if(!user)
    {
      res.status(401).send("Please log into your user");
    }else next();
  }

  module.exports = sessionAuth;