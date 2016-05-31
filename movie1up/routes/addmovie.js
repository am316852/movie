var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var multiparty=require('multiparty');

var fs=require('fs');
/* add movie details. */
router.post('/',function(req, res) {
      var content=JSON.parse(fs.readFileSync('./json/page.json'));

      var form=new multiparty.Form();
        form.parse(req,function(err,fields,files){
          console.log("***************at add_details img upload"+err);
          fs.readFile(files.Poster[0].path,function(err,data){
            var newPath="./public/img/"+fields.Title[0]+".jpg";
            fs.writeFile(newPath,data,function(err){
               console.log("******************at add_details img upload error"+err);
           })
          })
            var obj={};
            obj.Title=fields.Title[0];
            console.log('-----------obj.Title-------------'+obj.Title);
            obj.Poster="/img/"+fields.Title[0]+".jpg";
            obj.Year=fields.Year[0];
            obj.Actors=fields.Actors[0];
            obj.Director=fields.Director[0];
            obj.Plot=fields.Plot[0];
            obj.Released=fields.Released[0];
            obj.imdbRating=fields.imdbRating[0];
            obj.Awards=fields.Awards[0];
       //console.log(obj);
          content.push(obj);

          fs.writeFile('./json/page.json', JSON.stringify(content, null, 4), function(err) {
                if(err) {
                console.log("--------------error----------------"+err);

                }res.redirect( "/" );
          });



        })

});
module.exports = router;
