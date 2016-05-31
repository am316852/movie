var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');


router.get('/', function (req, res) {
    console.log("inside get request");
    var count=req.param("count");

    var content=JSON.parse(fs.readFileSync('./json/page.json'));
    res.json(content[count]);
    console.log("data of content     " + content[0]);

});


// router.get('/nextMovie', function (req, res) {
//     console.log("inside get request");
//     var content=fs.readFileSync('./public/page.json');
//     res.json(content.toString());
//     //console.log("data of content     " + content[0].toString());
// });
//
// router.get('/prevMovie', function (req, res) {
//     console.log("inside get request");
//     var content=fs.readFileSync('./public/page.json');
//     res.json(content.toString());
//     console.log("data of content     " + content[0].Title);
// });
module.exports = router;
