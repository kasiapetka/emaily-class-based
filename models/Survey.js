const mongoose = require('mongoose');
const {Schema} = mongoose;
const QuestionSchema = require('./Question');

const surveySchema = new Schema({
    password: String,
    limit: Number,
    title: String,
    subject: String,
    body: String,
    _reply: {type: Schema.Types.ObjectId, ref: 'Reply'},
    repliesCount: { type: Number, default: 0},
    questions: [QuestionSchema],
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSend: Date,
    lastResponded: Date,
    URL: String
});

mongoose.model('surveys', surveySchema);
