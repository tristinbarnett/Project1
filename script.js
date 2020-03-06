$(document).ready(function(){
    $("#shounen").on("click", function() {

    });
    $("#supernatural").on("click", function() {
    
    });
    $("#slice of life").on("click", function() {
    
    });
    $("#romance").on("click", function() {
    
    });
    $("#magic").click(function() {

        var queryURL= "https://api.jikan.moe/v3/genre/anime/16/1";
        console.log("isbeenclicked");
        genre(queryURL);
        
        
    });
    
    $(".search").click(function(){
        event.preventDefault();
        var anime = $(".input").val();
        //console.log(anime)
        var queryURL ="https://api.jikan.moe/v3/search/anime?q="+anime+"&limit=10";
        // ajax call for what the user input into the textbox
        search(queryURL);
        
    });

})


function search(queryURL){
    $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $("#searchResults").html(" ");
            $("#recommendations").html("");
            $.each(response.results,function(index,value){
                $("#searchResults").append(`<div onclick="ID(${response.results[index].mal_id})"  class="animeName" value=${response.results[index].mal_id} > ${response.results[index].title}</div>`)
            });
        })

}

function genre(queryURL){
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        $.each(response.anime,function(index,value){
            var num = Math.floor(index/10);
            $("#recommendations").append(`<div onclick="ID(${response.anime[index].mal_id})" class='animeName' value='${response.anime[index].mal_id}'>  ${response.anime[index].title}</div>`)
            
        })
    })
}

// ajax call with anime id
function ID(animeID){
        $("#recommendations").html("");
        var queryIDURL = "https://api.jikan.moe/v3/anime/"+animeID+"/"
        $.ajax({
            url: queryIDURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            // clear searchResults
            $("#searchResults").html("");
            // append selected anime
            $("#searchResults").append(`<div class='animeName' value='${response.title}'> ${response.title}</div>`)
            $("#searchResults").append(`<a href= '${response.url}' class ='cards' style='float:left, box-sizing:border-box'><div class='card_image'> <img src='${response.image_url}'></div> </a>`);
            $("#searchResults").append(response.synopsis)
            // append recommendation 
        })
        // Ajax call for recommendations 
        var queryIDURL = "https://api.jikan.moe/v3/anime/"+animeID+"/recommendations"
        $.ajax({
            url: queryIDURL,
            method: "GET"
        }).then(function(response){
            //console.log(response)
            
            
            $.each(response.recommendations,function(index,value){
            $("#recommendations").append(`<div class='animeName' onclick="ID(${response.recommendations[index].mal_id})" value=${response.recommendations[index].mal_id}'> ${response.recommendations[index].title}</div>`)
            })
        });
    
}