
$(document).ready(function(){
    
    
    console.log("inside ready");
    $(".button").click(function(){
        var anime = $(".input").val();
        console.log(anime)
        var queryURL ="https://api.jikan.moe/v3/search/anime?q="+anime+"&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $(".animeSearchResults").html(" ");
            $.each(response.results,function(index,value){
                
                $(".animeSearchResults").append("<a href='"+response.results[index].url+"' class ='cards'>"
                    +"<div class='card_image'> <img src='"+ response.results[index].image_url+"'></div>"
                    +"<div class='card_name'> "+ response.results[index].title+"</div>"+
                "</a>");
            })
        })
    })
})