var responseArray;
$(document).ready(function () {
    
    // check if genre buttons are clicked
    $(".buttonGenre").click(function(){
        var d = $(this).data("value")
        console.log(d)
        var genreURL ="https://api.jikan.moe/v3/genre/anime/"+d+"/1"
        // ajax call for the genre
        genre(genreURL)
         
    })
        
        

    // check if search button are clicked
    $(".searchButton").click(function(){
        var anime = $(".input").val();
        //console.log(anime)
        var queryURL ="https://api.jikan.moe/v3/search/anime?q="+anime+"&limit=10";
        // ajax call for what the user input into the textbox
        search(queryURL);
        
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://community-manga-eden.p.rapidapi.com/list/0",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-manga-eden.p.rapidapi.com",
            "x-rapidapi-key": "006e809b87msh0c1cbdaccb16659p12b8d5jsn35e1032a8f6a",
            "Access-Control-Allow-Origin": "*"
        }
    }
    //calling response from manga api
    $.ajax(settings).done(function (response) {
        console.log(response);
        responseArray = response;
    });


});

    function genre(queryURL){
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            $("#recommendations").html("");
            $.each(response.anime,function(index,value){
                $("#recommendations").append(`<div onclick="ID(${response.anime[index].mal_id},'${response.anime[index].title}')" class='animeName' value='${response.anime[index].mal_id}'>  ${response.anime[index].title}</div>`);
                console.log(response.anime[index].title);
            })
        })
    };

    // ajax call with anime id
    function ID(animeID, mangaTitle) {
        $("#recommendations").html("");
        var queryIDURL = "https://api.jikan.moe/v3/anime/" + animeID + "/"
        $.ajax({
            url: queryIDURL,
            method: "GET"
        }).then(function (response) {
            // clear searchResults
            $("#searchResults").html("");
            // append selected anime
            $("#searchResults").append(`<div class='animeName' value='${response.title}'> ${response.title}</div>`)
            $("#searchResults").append(`<a href= '${response.url}' class ='cards' style='float:left, box-sizing:border-box'><div class='card_image'> <img src='${response.image_url}'></div> </a>`);
            $("#searchResults").append(response.synopsis)
            
        })
        // Ajax call for recommendations 
        var queryIDURL = "https://api.jikan.moe/v3/anime/" + animeID + "/recommendations"
        $.ajax({
            url: queryIDURL,
            method: "GET"
        }).then(function(response){    
            $.each(response.recommendations,function(index,value){
            $("#recommendations").append(`<div class='animeName' onclick="ID(${response.recommendations[index].mal_id},'${response.recommendations[index].title}')" value=${response.recommendations[index].mal_id}'> ${response.recommendations[index].title}</div>`)
            })
        });

        console.log("title is "+mangaTitle);

        //getting manga with matching title
        var matchedElementsArray = responseArray.manga.filter(function (item) {
            return item.t.toLowerCase().replace(/\s/g, '') === mangaTitle.toLowerCase().replace(/\s/g, '');
        })
        var mangaId;
        if (matchedElementsArray.length > 0) {
            console.log(matchedElementsArray);
            mangaId = matchedElementsArray[0].i;
        }
        console.log(mangaId);
        if (mangaId) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cors-anywhere.herokuapp.com/https://www.mangaeden.com/api/manga/" + mangaId + "/",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-manga-eden.p.rapidapi.com",
                    "x-rapidapi-key": "006e809b87msh0c1cbdaccb16659p12b8d5jsn35e1032a8f6a"
                }
            }
            
            $.ajax(settings).then(function (response) {
                console.log(response);
                $("#noManga").empty();
                if (response.url) {
                    mangaLink = $("<a>").attr("href", response.url);
                    mangaLink.text("Click to see manga!");
                    $("#noManga").append(mangaLink);
                } else {
                    var noURL = $("<p>").text("There's a Manga!");
                    $("#noManga").append(noURL);
                }
            });
        } else {
            $("#noManga").empty();
            var noMangaText = $("<p>").text("There's no Manga for this Anime!");
            console.log(noMangaText);
            $("#noManga").append(noMangaText);
        };
    };


    function search(queryURL) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#searchResults").html(" ");
            $("#recommendations").html("");
            $("#noManga").empty();
            $.each(response.results, function (index, value) {
                $("#searchResults").append(`<div class="animeName${index}" value=${value.mal_id}> ${value.title}</div>`);
                $(".animeName" + index).on("click", function () {
                    ID(value.mal_id, value.title);
                })
            });

        })

    }

