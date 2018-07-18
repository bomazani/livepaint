// Add logic to this script to poll server every second for updated pixels.
let updateQueue = [];
let userIndex = 0;

function pollForUpdates() {
    let clientUpdates = updateQueue;
    fetch('/updates', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "clientupdates": clientUpdates,
                "userIndex": userIndex
            })
        })
        .then(response => response.json())
        .then(serverUpdates => {
            console.log(serverUpdates);
            userIndex = serverUpdates.serverIndex;
            serverUpdates.updates.forEach(updateColor => {
                bitmap.updateColor(updateColor[0], updateColor[1], updateColor[2])
            })
            
            updateQueue = updateQueue.slice(clientUpdates.length);

            setTimeout(pollForUpdates, 1000);
            
        })

}
pollForUpdates();