var express = require('express');
var router = express.Router();

function randomNumber(min, max){ return Math.floor(Math.random() * (1 + max - min) + min); }

exports.router = router;
exports.randomNumber = randomNumber;