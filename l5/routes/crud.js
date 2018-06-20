var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var connectToMongo = 'mongodb://127.0.0.1:27017/test';

/* GET CRUD page. */
router.get('/', function (req, res, next) {
    res.render('crud', {
        items: [],
    });
    req.session.errors = null;
});

router.get('/get-data', function (req, res, next) {
    var resultArr = [];

    mongo.connect(connectToMongo, function (err, db) {
        assert.equal(null, err);

        var cursor = db.collection('user-data').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);

            resultArr.push(doc);
        }, function () {
            db.close();

            res.render('crud', {items: resultArr});
        });
    });
});

router.post('/insert', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    };

    mongo.connect(connectToMongo, function (err, db) {
        assert.equal(null, err);

        db.collection('user-data').insertOne(item, function (err, res) {
            assert.equal(null, err);

            console.log('Item Created');

            db.close();
        });
    });

    res.redirect('/crud/get-data');
});

router.post('/update', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    };
    var id = req.body.id;

    mongo.connect(connectToMongo, function (err, db) {
        assert.equal(null, err);

        db.collection('user-data').updateOne({
            "_id": objectId(id),
        }, {
            $set: item
        }, function (err, res) {
            assert.equal(null, err);

            console.log('Item Updated');

            db.close();
        });
    });

    res.redirect('/crud/get-data');
});

router.post('/delete', function (req, res, next) {
    var id = req.body.id;

    mongo.connect(connectToMongo, function (err, db) {
        assert.equal(null, err);

        db.collection('user-data').deleteOne({
            "_id": objectId(id),
        }, function (err, res) {
            assert.equal(null, err);

            console.log('Item Deleted');

            db.close();
        });
    });

    res.redirect('/crud/get-data');
});

module.exports = router;
