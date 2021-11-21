// import APIManager from "./dist/APIManager.js"

const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// const apiManager = new APIManager();
let port = 3000


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get('/', function(request, response) {
    // apiManager.generateNBATeam()



    let priceObj = {price: 500}
    response.send(priceObj)
})

//Exercise 4
// app.get('/buy/:name', function(request, response) {
//     let name = request.params.name
//     for(let obj of store) {
//         if(obj.name === name) {
//             obj.inventory -= 1
//             response.send(`Congrats! You've just bought ${obj.name} for ${obj.price}. There are ${obj.inventory} left in stock.`)
//         }
//     }


//     response.end()
// })

// app.get('/sale', function(request, response) {
//     let q = request.query
//     if(q.admin) {
//         for(let obj of store) {
//             if(obj.inventory > 10){
//                 obj.price *= 0.5


//             }
//             console.log(obj.price)
//         }
//     }


//       console.log(users)
//     response.end()
// })



app.listen(port, function(request, response){
    console.log(`Server is up and running smoothly`)
})