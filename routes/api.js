const express = require('express')
const urllib = require('urllib')

const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
router.get('/teams/:teamName', function (request, response) {
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
                position: player.pos,
                photo: `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`
            }
        })
        response.send(finalTeamInfo)
    });
    
})

// ------------------------------------------------ NBA Part II ------------------------------------------------
router.put('/team', function(req, res) {
    let teamName = req.body.teamName
    let teamId = req.body.teamId
    teamToIDs[`${teamName}`] = teamId
    res.end()
})

let dreamTeam = []

router.get('/dreamTeam', function(req, res) {
    res.send(dreamTeam)
    

    res.end()
})

router.post('/addPlayer', function(req, res) {
    let player = req.body
    if(dreamTeam.length<5) {
        dreamTeam.push(player)
    }
    else{
        console.log("More than 5")
    }
    res.end()
})

module.exports = router