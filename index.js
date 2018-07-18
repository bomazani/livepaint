const express = require("express")
const port = 3000
const app = express()
let updates = [];


app.use(express.static('public'))
app.use(express.json())

// Fill in your request handlers here
app.post('/updates', (request, response)=>{
    console.log(request.body);
    request.body.clientupdates.forEach(colorUpdate => {
        updates.push(colorUpdate);
    })
    let serverIndex = updates.length;
    let clientUpdates = updates.slice(request.body.userIndex)
    response.status(201);
    response.send({
        "updates": clientUpdates,
        "serverIndex": serverIndex,
    })

});

app.listen(port)
