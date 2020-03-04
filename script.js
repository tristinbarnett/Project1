

$(document).ready(function(){
    

    
    $(".button").click(function(){
        var anime = $(".input").val();
        console.log(anime)
        var queryURL ="https://api.jikan.moe/v3/search/anime?q="+anime+"&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $("#searchResults").html(" ");
            $("#recommendations").html("");
            $.each(response.results,function(index,value){
                $("#searchResults").append("<div class='animeName' value="+response.results[index].mal_id+ ">"+ response.results[index].title+"</div>")
                
                // $("#searchResults").append("<a href='"+response.results[index].url+"' class ='cards'>"
                //     +"<div class='card_image'> <img src='"+ response.results[index].image_url+"'></div>"
                //     +"<div class='card_name'> "+ response.results[index].title+"</div>"+
                // "</a>");
            });
            $(".animeName").click(function(){
                var animeID = $(this).attr("value");
                var queryIDURL = "https://api.jikan.moe/v3/anime/"+animeID+"/"
                $.ajax({
                    url: queryIDURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response)
                    // clear searchResults
                    $("#searchResults").html("");
                    // append selected anime
                    $("#searchResults").append("<div class='animeName' value="+response.title+ ">"+ response.title+"</div>")
                    $("#searchResults").append("<a href='"+response.url+"' class ='cards' style='float:left, box-sizing:border-box'>" +"<div class='card_image'> <img src='"+ response.image_url+"'></div> </a>");
                    $("#searchResults").append(response.synopsis)
                    // append recommendation 
                })
                var queryIDURL = "https://api.jikan.moe/v3/anime/"+animeID+"/recommendations"
                $.ajax({
                    url: queryIDURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response)
                    $.each(response.recommendations,function(index,value){
                    $("#recommendations").append("<div class='animeName' value="+response.recommendations[index].mal_id+ ">"+ response.recommendations[index].title+"</div>")
                    })
                });
            })
        })
        
    })


})
