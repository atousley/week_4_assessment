var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var ajaxmods = require('./routes/ajaxmods');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/ajaxmods', ajaxmods);

app.get('/*', function  (req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});