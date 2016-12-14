var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//fixme: need to be fixed to working on the cloud.
mongoose.connect('mongodb://127.0.0.1:27017/db');
//mongoose.connect('mongodb://localstoriz:prime199@ds147497.mlab.com:47497/localstoriz');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    title: {type: String, required: true},
    content: String,
    author: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/get-data', function(req, res, next) {
    UserData.find()
        .then(function(doc) {
            res.render('index', {items: doc});
            console.log("result is "+doc);
        });
});

router.post('/insert', function(req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    var data = new UserData(item);
    data.save();

    res.redirect('/');
});

router.post('/update', function(req, res, next) {
    var id = req.body.id;

    UserData.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
    })
    res.redirect('/');
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
});

module.exports = router;