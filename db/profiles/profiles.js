const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sunset_dev')
    .then(() => console.log('Connected!'));
  

const Schema = mongoose.Schema;

//create schema collection
const Profiles = new Schema({
  username: String
}, {
    collection: 'Profile'
});

const ProfilesModel = mongoose.model('Profiles', Profiles);

//find() tìm kiếm

ProfilesModel.find({
    username: /Minh/   // like %PD%
}).limit(1) // limit
    .skip(1) // bỏ qua phần tử thứ 1  
    .sort() // sort
    .then((data) => console.log(data))
    .catch(err => console.log(err));

// create

// ProfilesModel.create({
//     username: 'MinhPD'
// }).then((data) => console.log(data))
//     .catch(err => console.log(err));


// inner join sử dụng populate