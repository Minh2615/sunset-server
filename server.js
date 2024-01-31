const express = require('express');
const app = express();
const path = require('path');

var cors = require('cors');
app.use(cors());

app.use('/',express.static(path.join(__dirname, '/public')));

// body-parser
var bodyParser = require('body-parser')
var RouterUserSunSet = require('./api/user/users-api');
var RouterProfileSunset = require('./api/profile/profiles-api');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// api
app.use("/sunset/api/users/v1", RouterUserSunSet);
app.use("/sunset/api/profiles/v1", RouterProfileSunset);
app.get('/sunset/api/v1', (req, res) => {
    res.send('Hello World!');
});

// server start
app.get('/', (req, res) => {
    const pathHtml = path.join(__dirname, 'public', 'index.html');
    res.sendFile(pathHtml);
});

//get port from ecosystem.config.js
const port = process.env.port || 1001;
app.listen(port, () => {
    console.log(`Sunset server listening at http://localhost:${port}`);
});