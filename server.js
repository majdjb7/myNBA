// const APIManager = require('./dist/APIManager')

const express = require('express')
const path = require('path')
const urllib = require('urllib')

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

let port = 3000

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


app.get('/teams/:teamName', function (request, response) {
    const myTeam = request.params.teamName
    const myTeamId = teamToIDs[myTeam]

    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data, res) {
        const teamData = data.toString()
        const jsonData = JSON.parse(teamData)

        const matchingTeamName = (t) => ( t.teamId === myTeamId && t.isActive == true)
        let allPlayers = jsonData.league.standard.filter(matchingTeamName)

        const finalTeamInfo = allPlayers.map((player) => {
            return {
                firstName: player.firstName,
                lastName: player.lastName,
                jersey: player.jersey,
                position: player.pos
            }
        })
        response.send(finalTeamInfo)
    });
    
})



app.listen(port, function(request, response){
    console.log(`Server is up and running smoothly`)
})