const User = require('../models/User')


const checkExistence = async (req, res, next) => {
    const userData = req.body.userData
   
    let userInDb = null;
    await User.findOne({ email: userData.email }, (err, user) => {

        if (err) { return res.status(500).send({ dbError: "There was a problem registering the user." }) }

        if (user) { 
            return res.status(401).send({

                error: 'The user is already registered',
            });
         }
        else {
            
            return next();
        }
    });





};

module.exports = checkExistence;