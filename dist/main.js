const apiManager = new APIManager();
var source = $('#players-template').html();
var template = Handlebars.compile(source);
let wasAPICalled = false


$("#submit").on("click", function () {
    wasAPICalled = true
    let teamName = $("#team").val()

    apiManager.generateNBATeam(teamName)
    console.log(apiManager.data)

    if(wasAPICalled == true) {
        setTimeout(function() {
            $(".NBARoster").empty();

            var newHTML = template(apiManager.data);
            $('.NBARoster').append(newHTML);
            }, 500);
        ;}



})