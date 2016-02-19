var express = require('express');
var router = express.Router();
var pg = require('pg');
var random = require('./random');

var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/week_4_assessment';
}

router.get('/', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM zoo ORDER BY id ASC;');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

router.post('/', function(req, res) {
    var animal_numbers = random.randomNumber(1, 100);

    var addAnimal = {
        animal_type: req.body.animal_type
    };
    pg.connect(connectionString, function (err, client, done) {
        client.query("INSERT INTO zoo (animal_type, type_total) VALUES ($1, $2) RETURNING id",
            [addAnimal.animal_type, animal_numbers],
            function (err, result) {
                done();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;