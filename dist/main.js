var source = $('#players-template').html();
var template = Handlebars.compile(source);
let wasAPICalled = false

$("#submit").on("click", function () {
    wasAPICalled = true
    let teamName = $("#team").val()


    $.get(`teams/${teamName}`, function (response) {
        let dataAboutTeams = {"allPlayers": response}

        if(wasAPICalled == true) {
            setTimeout(function() {
                $(".NBARoster").empty();
    
                var newHTML = template(dataAboutTeams);
                $('.NBARoster').append(newHTML);
                }, 500);
            ;}
      });
})