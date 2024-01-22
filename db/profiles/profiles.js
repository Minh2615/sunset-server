const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sunset_dev')
    .then(() => console.log('Connected!'));
  

const Schema = mongoose.Schema;


//create schema collection
const Profiles = new Schema(
  {
    User: Array,
    Status: String,
    Ranking: String,
    Name: String,
    Type: String,
    Region: Array,
    City: Array,
    District: Array,
    Location: Array,
    Subtype: String,
    Rooms: String,
    BedRooms: String,
    Sleeps: String,
    Price: Array,
    Rates: Array,
    Area: Array,
    Category: String,
    Address: String,
    Residence: Array,
    View: Array,
    Construction: Array,
    Floor: Array,
    Heating: Array,
    Water: Array,
    Condition: String,
    Availability: String,
    Pictures: Array,
    Medias: Array,
    Comment: Array,
    Areas: Array,
    Financial: Array,
    Regulations: Array,
    ID: String,
  },
  {
    collection: "Profiles",
  }
);

const ProfilesModel = mongoose.model('Profiles', Profiles);

module.exports = ProfilesModel;

//find() tìm kiếm

// ProfilesModel.find({
//     username: /Minh/   // like %PD%
// }).limit(1) // limit
//     .skip(1) // bỏ qua phần tử thứ 1  
//     .sort() // sort
//     .then((data) => console.log(data))
//     .catch(err => console.log(err));

// create

// ProfilesModel.create({
//     username: 'MinhPD'
// }).then((data) => console.log(data))
//     .catch(err => console.log(err));


// inner join sử dụng populate