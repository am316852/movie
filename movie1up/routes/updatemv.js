var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multiparty=require('multiparty');
var jsonfile = require('jsonfile');
var fs=require('fs');
/* update movie details. */
router.post('/',function(request, respond) {
   jsonfile.readFile("./json"+"/"+"page.json",function(err,content){


     var form=new multiparty.Form();
       form.parse(request,function(err,fields,files){
         console.log("***************at add_details img upload"+err);
         fs.readFile(files.Poster[0].path,function(err,data){
           var newPath="./public/img/"+fields.Title[0]+".jpg";
           fs.writeFile(newPath,data,function(err){
             console.log("******************at add_details img upload error"+err);
           });
         });

for(var i=0;i<content.length;i++)
     {
       if(content[i].Title==fields.Title[0])
       {
         content[i].Title=fields.Title[0];
        // if(fields.Poster[0])
      //  console.log(fields.Poster);
         content[i].Poster="/img/"+fields.Title[0]+".jpg";
         content[i].Year=fields.Year[0];
         content[i].Actors=fields.Actors[0];
         content[i].Director=fields.Director[0];
         content[i].Plot=fields.Plot[0];
         content[i].Released=fields.Released[0];
         content[i].imdbRating=fields.imdbRating[0];
         content[i].Awards=fields.Awards[0];
       }
     }
 fs.writeFile('./json/page.json', JSON.stringify(content, null, 4), function(err) {
   console.log("in write");
                               if(err) {
                                   console.log(err);
                      }
   });
 });
   respond.redirect("/");
 });


});
module.exports = router;
