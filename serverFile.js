
var express = require('express');
var app = express();

var path = require('path');
var fs=require('fs');
//var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join((__dirname,"public"))));
app.get('/index.html', function (request, respond) {
  // res.send('Hello World!');
  respond.sendFile(path.join( __dirname + '/index.html'));
});
app.get('/page.json', function (req, res) {
   console.log("inside get request");
   var content=fs.readFileSync('./public/page.json');
   res.json(content.toString());
   console.log("Res::"+res);
});


app.post('/update',urlencodedParser,function(request, respond) {
    var content=JSON.parse(fs.readFileSync('./public/page.json'));var obj = {};

console.log('Inside delete..' + request.body.Title);
for(var i=0;i<content.length;i++)
      {
        if(content[i].Title==request.body.Title)
        {
          content[i].Title=request.body.Title;
        content[i].Poster=request.body.Poster;
          content[i].Year=request.body.Year;
          content[i].Actors=request.body.Actors;
          content[i].Director=request.body.Director;
          content[i].Plot=request.body.Plot;
          content[i].Released=request.body.Released;
          content[i].imdbRating=request.body.imdbRating;
          content[i].Awards=request.body.Awards;
        }
      }
  fs.writeFile('./public/page.json', JSON.stringify(content, null, 4), function(err) {
                                if(err) {
                                    console.log(err);
                       }
    });

    respond.sendFile(path.join( __dirname+'/public/index.html'));
});




app.post('/delete', urlencodedParser,function(request, respond) {
    var content=JSON.parse(fs.readFileSync('./public/page.json'));
     var obj = {};
     var newContent=[];
    obj.Title=request.body.Title;
    //console.log('Inside delete..' +  request.body.Title);
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
fs.writeFile('./public/page.json', JSON.stringify(newContent, null, 4), function(err) {
      if(err) {
      console.log(err);
      }
  });
  respond.sendFile(path.join( __dirname+'/public/index.html'));
});



app.post('/add',urlencodedParser,function(request, respond) {
    var content=JSON.parse(fs.readFileSync('./public/page.json'));
  console.log('Inside add..');
  console.log("title in add is "+request.body.Title);
    var obj = {};
    obj.Title=request.body.Title;
    obj.Poster=request.body.Poster;
    obj.Year=request.body.Year;
    obj.Actors=request.body.Actors;
    obj.Director=request.body.Director;
    obj.Plot=request.body.Plot;
    obj.Released=request.body.Released;
    obj.imdbRating=request.body.imdbRating;
    obj.Awards=request.body.Awards;
//console.log(obj);
content.push(obj);
fs.writeFile('./public/page.json', JSON.stringify(content, null, 4), function(err) {
      if(err) {
      console.log(err);
      }
  });
  respond.sendFile(path.join( __dirname+'/public/index.html'));
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
