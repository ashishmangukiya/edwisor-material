let movieTitle;
let movieYear;
let imdb;
$(document).ready(() => {
  $("#submit").click(function () {
    movieTitle = document.getElementById("name").value;
    movieYear=document.getElementById("year").value;
    if(movieTitle!="" && movieYear!="")
  	{  	 	$(".back").css("display","block");
    	getDetailByTitle("t="+movieTitle,"&y="+movieYear);
	}
	else if(movieTitle!="" && movieYear=="")
	{
			$(".back").css("display","block");
		getDetailByTitle("t="+movieTitle,movieYear);
	}
	else if(movieTitle=="" && movieYear!="")
	{
		alert("information is not available");
		getDetailByTitle(movieTitle,"&y="+movieYear);
	}
	else
	{
		alert("you have not searched anything")
	}
   });

   $("#secondsubmit").click(()=> {
 	imdb=document.getElementById("imdb").value;
 	if(imdb!="")
 	{	$(".back").css("display","block");
 	getDetailByImdbId(imdb);
 	}
 	else
 		alert("you have not searched anything");

	});

});


let getDetailByImdbId = (imdb) =>{


	$.ajax({

		type:"GET",
		dataType:"json",
		async:true,
		url:`https://www.omdbapi.com/?i=`+imdb+ `&apikey=68f936a4`,
		success:(response) =>{
			if(response.Title!= undefined)
			{
			$("#title").empty().append("<b>Title:</b>"+ response.Title);
			}
			else{
				alert("movie is not available");
				$(".back").css("display","none");
			}
			$("#yearofmovie").empty().append("<b>Year:</b>"+response.Year);
			$("#rated").empty().append("<b>Rated:</b>"+response.Rated);
			$("#released").empty().append("<b>Released:</b>"+response.Released);
			$("#runtime").empty().append("<b>Runtime:</b>"+response.Runtime);
			$("#genre").empty().append("<b>Genre:</b>"+response.Genre);
			$("#director").empty().append("<b>Director:</b>"+response.Director);
			$("#writer").empty().append("<b>Writer:</b>"+response.Writer);
			$("#actors").empty().append("<b>Actors:</b>"+response.Actors);
			$("#plot").empty().append("<b>Plot:</b>"+response.Plot);
			$("#language").empty().append("<b>Language:</b>"+response.Language);
			$("#country").empty().append("<b>Country:</b>"+response.Country);
			$("#awards").empty().append("<b>Awards:</b>"+response.Awards);
			if(response.Poster!="N/A")
			{
			$("#poster").empty().html('<img class="center postero"  src="' + response.Poster  +`"/>`);
			}
			else
			{
			$("#poster").empty().html('<img src="dummy.jpg" class="center postero"/>' );
			}
			$("#ratings").empty();
			for(data of response.Ratings)
			{
				let temp=` <div class="col-7 col-sm-6 col-xl-4">${data.Source}</div>
                           <div class="col-5 col-sm-6 col-xl-8">${data.Value}</div>`
			$("#ratings").append(temp);
			}
			$("#metascore").empty().append("<b>Metascore:</b>"+response.Metascore);
			$("#imdbRating").empty().append("<b>imdbRating:</b>"+response.imdbRating);
			$("#imdbVotes").empty().append("<b>imdbVotes:</b>"+response.imdbVotes);
			$("#imdbID").empty().append("<b>imdbID:</b>"+response.imdbID);
			$("#Type").empty().append("<b>Type:</b>"+response.Type);
			$("#DVD").empty().append("<b>DVD:</b>"+response.DVD);
			$("#BoxOffice").empty().append("<b>BoxOffice:</b>"+response.BoxOffice);
			$("#Production").empty().append("<b>Production:</b>"+response.Production);
			$("#website").empty().append(`<b>Website:</b><a style="color:red" href="`+response.Website+`">`+response.Website+`</a>`);
			$("#response").empty().append("<b>Response:</b>"+response.Response); 
    		

		},
		error: (response) => {

            console.log(err.responseJSON.error.message);



		},
		 



	});


} 

let getDetailByTitle = (movieTitle=null,movieYear=null) =>{


	$.ajax({

		type:"GET",
		dataType:"json",
		async:true,
		url:`https://www.omdbapi.com/?`+movieTitle+movieYear+ `&apikey=68f936a4`,
		success:(response) =>{
			if(response.Title!= undefined)
			{
			$("#title").empty().append("<b>Title:</b>"+ response.Title);
			}
			else{
								alert("movie is not available");

				$(".back").css("display","none");
			}
			$("#yearofmovie").empty().append("<b>Year:</b>"+response.Year);
			$("#rated").empty().append("<b>Rated:</b>"+response.Rated);
			$("#released").empty().append("<b>Released:</b>"+response.Released);
			$("#runtime").empty().append("<b>Runtime:</b>"+response.Runtime);
			$("#genre").empty().append("<b>Genre:</b>"+response.Genre);
			$("#director").empty().append("<b>Director:</b>"+response.Director);
			$("#writer").empty().append("<b>Writer:</b>"+response.Writer);
			$("#actors").empty().append("<b>Actors:</b>"+response.Actors);
			$("#plot").empty().append("<b>Plot:</b>"+response.Plot);
			$("#language").empty().append("<b>Language:</b>"+response.Language);
			$("#country").empty().append("<b>Country:</b>"+response.Country);
			$("#awards").empty().append("<b>Awards:</b>"+response.Awards);
			if(response.Poster!="N/A")
			{
			$("#poster").empty().html('<img class="center postero"  src="' + response.Poster  +`"/>`);
			}
			else
			{
			$("#poster").empty().html('<img src="dummy.jpg" class="center postero"/>' );
			}
			$("#ratings").empty();
			for(data of response.Ratings)
			{
				let temp=` <div class="col-7 col-sm-6 col-xl-4">${data.Source}</div>
                           <div class="col-5 col-sm-6 col-xl-8">${data.Value}</div>`
			$("#ratings").append(temp);
			}
			$("#metascore").empty().append("<b>Metascore:</b>"+response.Metascore);
			$("#imdbRating").empty().append("<b>imdbRating:</b>"+response.imdbRating);
			$("#imdbVotes").empty().append("<b>imdbVotes:</b>"+response.imdbVotes);
			$("#imdbID").empty().append("<b>imdbID:</b>"+response.imdbID);
			$("#Type").empty().append("<b>Type:</b>"+response.Type);
			$("#DVD").empty().append("<b>DVD:</b>"+response.DVD);
			$("#BoxOffice").empty().append("<b>BoxOffice:</b>"+response.BoxOffice);
			$("#Production").empty().append("<b>Production:</b>"+response.Production);
			$("#website").empty().append(`<b>Website:</b><a style="color:red" href="`+response.Website+`">`+response.Website+`</a>`);
			$("#response").empty().append("<b>Response:</b>"+response.Response); 
    		

		},
		error : (response) => {
			console.log(err.responseJSON.error.message);

		},
		 



	});




}