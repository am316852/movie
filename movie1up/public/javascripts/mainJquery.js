var max;
$.ajax({
url:'page1',
datatype:'json',
type:'get',
cache:false,
success:function(maxRecord){
max = maxRecord;
}
});

var count = 0;
if(count==0)
{
  nextImg(count);
}

$("#next").click(function() {
  if(count<max){
      count++;
      nextImg(count);
    }

});

$("#prev").click(function() {
  if(count>0){
    count--;
      nextImg(count);
    }
});

function nextImg (count)
{
$.ajax({
url:'page',
data:'count='+count,
datatype:'json',
type:'get',
cache:false,
success:function(data){
  if(count == 0)
  {
  $("#prev").prop( "disabled", true );
  }
  else {
  $("#prev").prop( "disabled", false );
  }

  if(count==(max-1))
  {
    $("#next").prop( "disabled", true );
  }
  else {
    $("#next").prop( "disabled", false );
  }
  console.log("in side"+data);
 // $.getJSON( "page.json", function( data ) {
 //    });
 //var data = $.parseJSON(data);
//  console.log("in side next "+ datale);
     $("#Title").text(data.Title);
    //  $('.col-md-3').prepend('<img alt="No Image Found" src="' + data[count].Poster +'" />');
    $('#myImg').attr("src", data.Poster);
     $('#Year').text("Year : " + data.Year);
     $('#Actors').text("Actors : " + data.Actors);
     $('#Director').text("Director : "+ data.Director);
     $('#Plot').text(data.Plot);
     $('#Released').text(data.Released);
     if((data.imdbRating >= 0) && (data.imdbRating <=10))
     {
    $('#imdbRating').empty();
     var temp=parseInt((parseInt(data.imdbRating))/2);
     var str = "";
     for(var i=0;i<temp;i++){
       str += '<span class=\"glyphicon glyphicon-star\"></span>';
     }
   }
     $('#imdbRating').append(str);
     $('#Awards').text(data.Awards);

     $('#deleteTitle').val(data.Title);

     $("#frmCadastre").click(function(){
      $("#Title1").val(data.Title);
    //  $('#myImg1').val(data.Poster);
      $('#Year1').val(data.Year);
      $('#Actors1').val(data.Actors);
      $('#Director1').val(data.Director);
      $('#Plot1').val(data.Plot);
      $('#Released1').val(data.Released);
      $('#imdbRating1').val(data.imdbRating);
      $('#Awards1').val(data.Awards);
    });
  }

     });

}
