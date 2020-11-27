const User = require('../models/User')
const express = require('express')
const jwt = require('jsonwebtoken');
const EmailSender = require('./EmailSender')
const validateFactoryDicctionary = require('../middleware/validateFactoryDictionary');
const checkExistence = require('../middleware/CheckExistence')
const { token } = require('morgan');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router()

router.post(
    '/register', checkExistence, async (req, res) => {
        const userData = req.body.userData
        let oauthExt = userData.oauthInfo
        if (oauthExt) {

            let idFromValidationResult = await validateFactoryDicctionary(oauthExt.provider, oauthExt.credentials)
            console.log(idFromValidationResult)
            await User.create({
                displayName: userData.displayName,
                email: userData.email,
                roleId: userData.roleId,
                password: null,
                oauthInfo: { provider: oauthExt.provider, id: idFromValidationResult }
            },
                (err, user) => {
                    if (err) { return res.status(500).send({ dbError: "There was a problem registering the user." }) }
                    // create a token

                    let token = jwt.sign({ id: user.email }, process.env.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });


                    res.status(200).send({ auth: true, token: token });
                });

        }


    });

router.post('/login', async (req, res) => {
    const userData = req.body.userData;
    let oauthExt = userData.oauthInfo
    let idFromValidationResult = await validateFactoryDicctionary(oauthExt.provider, oauthExt.credentials);
    if (!idFromValidationResult) {
        return res.status(500).send({ dbError: "User not found." })
    }

    console.log(idFromValidationResult)

    User.findOne({ 'oauthInfo.id': idFromValidationResult }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });

});
//@desc Logout user
//@route get /auth/logout
router.get(
    '/logout', (req, res) => {
        req.logOut()
        res.status(200).send("you're logged out now")
    })

module.exports = router

