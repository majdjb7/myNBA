class APIManager {
    constructor() {
        this.data = {}
    }
  
     generateNBATeam(teamName) {
        $.ajax({
          method: "GET",
          url: 'http://data.nba.net/10s/prod/v1/2018/players.json',
          success: (response) => {
            const matchingTeamName = (t) => (t.teamId === teamName)
            let allPlayers = response.league.standard.filter(matchingTeamName)

            let getPlayerInfo = allPlayers.map((player) => {
                return {
                    firstName: player.firstName,
                    lastName: player.lastName,
                    jersey: player.jersey,
                    position: player.pos
                }
            })
      
    
            this.data.allPlayers = getPlayerInfo.splice(0, 6);
            console.log(this.data.allPlayers)
          },
          error: function (xhr, text, error) {
            console.log(text);
          },
        });
      }
}