const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = async (req, res, next) => {
    const buff = Buffer.from(req.params.surveyId, 'base64');
    const id = buff.toString('utf-8');

    try {
        const {password} = await Survey.findOne({_id: id});
        if(password){
            const token = req.header('token');
            if (!token) return res.status(401).send({error: 'You must provide password to fill the survey'});
            try {
                const verified = jwt.verify(token, keys.tokenSecret);
                req.surveyAuth = verified;
                next();
            } catch (err) {
                res.status(400).send('Invalid token');
            }
        }else{
            next();
        }
    }catch (err) {
        res.status(404).send('Invalid URL!');
    }


};
