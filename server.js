// const APIManager = require('./dist/APIManager')

const express = require('express')
const path = require('path')
const urllib = require('urllib')
const teamData = require('./dist/data')

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

let port = 3000

app.get('/', function(request, response) {
    let priceObj = {price: 500}
    response.send(priceObj)
})

app.get('/teams/:teamName', function (request, response) {
    const myTeam = request.params.teamName
    const myTeamId = teamData.teamToIDs[myTeam]

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