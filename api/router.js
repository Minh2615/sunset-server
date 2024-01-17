const express = require('express');
var RouterSunSet = express.Router();

//create router
RouterSunSet.get('/', (req, res) => {
    res.send('Router Api');
});

// router and params
RouterSunSet.get('/:id', (req, res) => {
    res.send('Router Api' + req.params.id);
});

// router nào được khai báo trước sẽ được ưu tiên xử lí trước.
// khai báo router có params thì phải khai báo sau router không có params
module.exports = RouterSunSet;