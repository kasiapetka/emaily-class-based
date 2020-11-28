const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireSurveyPassword = require('../middlewares/requireSurveyPassword');
const Survey = mongoose.model('surveys');
const Reply = mongoose.model('replies');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

module.exports = app => {
    app.post('/api/surveys', requireLogin, jsonParser, async (req, res) => {
        const {password, limit, title, subject, body, questions} = req.body;
        let pass;
        if (password === "true")
            pass = Math.random().toString(36).slice(-10);
        const survey = new Survey({
            password: pass,
            limit: parseInt(limit, 10),
            title,
            subject,
            body,
            questions: questions.map(({question, answers, id}) => ({
                question: question.trim(),
                answers: answers,
                id: id
            })),
            _user: req.user.id,
            dateSend: Date.now()
        });

        const buff = Buffer.from(survey._id.toString(), 'utf-8');
        survey.URL = buff.toString('base64');

        try {
            const reply = new Reply(
                {
                replies: questions.map(({answers, id,question}) => {
                    if(id === 0) {
                        return {
                            id: id,
                            question: question,
                            values: []
                        }
                    } else {  return {
                        answers: answers.map(a =>({
                                    value: a,
                                    count: 0
                                })
                        ),
                        id: id,
                        question: question
                    }}
                }),
            }
            );
            await reply.save(function (err, reply) {
                survey._reply = reply.id;
                survey.save();
            });

            res.status(200).send({URL: survey.URL, password: survey.password});
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys/:surveyId', requireSurveyPassword, jsonParser, async (req, res) => {
        const buff = Buffer.from(req.params.surveyId, 'base64');
        const id = buff.toString('utf-8');
        try {
            const {limit, title, subject, body, questions, dateSend, repliesCount} = await Survey.findOne({_id: id});
            const survey = {
                limit,
                title,
                subject,
                body,
                questions,
                dateSend,
            };

            if (survey.limit === repliesCount) {
                res.status(409).send();
            } else {
                res.status(200).send(survey);
            }
        } catch (err) {
            res.status(404).send(err);
        }
    });

    app.post('/api/surveys/reply/:surveyId', requireSurveyPassword, jsonParser, async (req, res) => {
        const reply = req.body;
        const buff = Buffer.from(req.params.surveyId, 'base64');
        const id = buff.toString('utf-8');
        try {

            const {repliesCount, _reply, questions} = await Survey.findOne({_id: id});
            const {replies} = await Reply.findOne({_id: _reply});
            const questionIds = [];
            questions.map(q => questionIds.push(q.id));

            reply.answers.map( (a, index) => {
                if(questionIds[index] === 0){
                    replies[index].values.push(a);
                } else if (questionIds[index] === 2){
                    a.answer.map((b,i) => {
                        if(b){
                            return replies[index].answers[i].count = replies[index].answers[i].count + 1;
                        }
                    })
                } else {
                    return replies[index].answers[+a].count = replies[index].answers[+a].count + 1;
                }
            });

            await Survey.update({_id: id}, {
                $set: {lastResponded: Date.now(), repliesCount: repliesCount + 1}
            });

            await Reply.update({_id: _reply}, {
                $set: {replies: replies},
            });

            res.status(200).send('oki');
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys/reply/:surveyId', requireLogin, jsonParser, async (req, res) => {
        const buff = Buffer.from(req.params.surveyId, 'base64');
        const id = buff.toString('utf-8');
        try {
            const {_reply, questions} = await Survey.findOne({_id: id});

            const {replies} = await Reply.findOne({_id: _reply});
            const fullReplies=[];

            questions.map((question, index) => {
                fullReplies.push({
                    answers: replies[index],
                    id: question.id
                })
            });

            res.status(200).send(fullReplies);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys', requireLogin, jsonParser, async (req, res) => {
        let user = req.user.id;
        try {
            const surveys = await Survey.find({_user: user}).select({
                questions: false
            });
            res.status(200).send(surveys);
        } catch (err) {
            res.status(422).send(err);
        }
    });

};

//recipients.split(',').map(email => ({email: email.trim()})),
