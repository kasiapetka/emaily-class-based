const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: String,
    answers: [String],
    id: Number
});

module.exports = questionSchema;
