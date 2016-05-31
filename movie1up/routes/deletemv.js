var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var fs=require('fs');

/* delete movie. */
router.post('/',function(request, respond) {
  var content=JSON.parse(fs.readFileSync('./json/page.json'));var obj = {};
     var obj = {};
     var newContent=[];

        for(var i=0; i<content.length; i++){
    if(content[i].Title==request.body.Title)
    {
      continue;
    }
else
{
  console.log("in else   "+content[i]);
  newContent.push(content[i]);
  }
}
fs.writeFile('./json/page.json', JSON.stringify(newContent, null, 4), function(err) {
      if(err) {
      console.log(err);
    }
  
        respond.redirect("/");
  });


});

module.exports = router;
