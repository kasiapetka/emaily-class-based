const mongoose = require('mongoose');
const {Schema} = mongoose;

const replySchema = new Schema({
    replies: [],
});

mongoose.model('replies', replySchema);
