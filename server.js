const express = require('express');
const app = express();
// const port = 8081;
const path = require('path');

app.use('/',express.static(path.join(__dirname, '/public')));

// body-parser
var bodyParser = require('body-parser')
var RouterSunSet = require('./api/user/users-api');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// api
app.use('/sunset/api/v1', RouterSunSet);

// server start
app.get('/', (req, res) => {
    const pathHtml = path.join(__dirname, 'public', 'index.html');
    res.sendFile(pathHtml);
});

app.listen(process.env.PORT, function(){

});