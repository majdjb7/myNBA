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

$("#dreamTeam").on("click", function() {
    $.get("dreamTeam", function (response) {
        let dreamTeam = {"allPlayers": response}
        console.log(dreamTeam)

        $(".NBARoster").empty();

        var newHTML = template(dreamTeam);
        $('.NBARoster').append(newHTML);
    })
})

$("body").on("click", ".playerDiv", function() {
    let firstName = $(this).find('#firstName')[0].innerHTML
    let lastName = $(this).find('#lastName')[0].innerHTML
    let jersey = $(this).find('#jersey')[0].innerHTML
    let photo = $(this).find('.clickable').find('#photoHolder').attr('src')
    let position = $(this).find('#position')[0].innerHTML

    let data = {
        "firstName": firstName,
        "lastName": lastName,
        "jersey": jersey,
        "position": position,
        "photo": photo
    }
    console.log(data)
    $.post("addPlayer", data, function (response) {
        response.send(data)

    })
})