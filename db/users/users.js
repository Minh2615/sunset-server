const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sunset_dev')
    .then(() => console.log('Connected!'));
  

const Schema = mongoose.Schema;

//create schema collection
const Users = new Schema({
    username: String,
    password: String,
    email : String,
});

const UserModal = mongoose.model('User', Users);

module.exports = UserModal;