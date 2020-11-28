const mongoose = require('mongoose');
const passport = require('passport');
const Survey = mongoose.model('surveys');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = app => {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        });

    app.get('/api/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.get('/api/current_user',
        (req, res) => {
            res.send(req.user);
        });

    app.post('/api/surveys/:surveyId', jsonParser,async (req, res) => {
        const buff = Buffer.from(req.params.surveyId, 'base64');
        const id = buff.toString('utf-8');
        try {
            const password = req.body.password;
            //Check if password is given
            if(!password) return res.status(400).send("Give password!");

            //Check if password is valid
            const survey= await Survey.findOne({_id: id});
            if(survey.password !== password) return res.status(400).send("Wrong password!");

            //Create and assign token for 2h
            const token = jwt.sign({
                _id: id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 *2)
            },keys.tokenSecret);

            res.header('token',token).send(token);

        } catch (err) {
            res.status(400).send(err);
        }
    });
};

