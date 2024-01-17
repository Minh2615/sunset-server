const express = require('express');
const app = express();
const port = 8081;

var RouterSunSet = require('./api/router');

//function checkuserLogin
function checkuserLogin(req, res, next) {
    if (req.query.user === 'admin') {
        next();
    } else {
        res.send('Not allow');
    }
}

function checkIsAdmin(req, res, next) {
    if (res.user.role === 'admin') {
        next();
    } else {
        res.send('Not allow');
    }
}
// middleware chứa 4 tham số sẽ là middleware xử lí lỗi
//use router api
app.use('/sunset/api/v1', checkuserLogin, checkIsAdmin, RouterSunSet);


// server start
app.get('/',checkuserLogin, (req, res, next) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));