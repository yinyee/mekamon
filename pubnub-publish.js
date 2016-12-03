var pubnub = new PubNub({
    publishKey : 'pub-c-f7f5d38a-de2c-4f96-b69e-a2674cf1abc0',
    subscribeKey : 'sub-c-a746e424-b962-11e6-a856-0619f8945a4f'
})
   
function publish(coords) {
    
    var publishConfig = {
        channel : "mekamon",
        message : coords
    }

    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
}
   
pubnub.addListener({    
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            publish();
        }
    },
    message: function(message) {
        console.log("New Message!!", message);
    },
    presence: function(presenceEvent) {
        // handle presence
    }
})

console.log("Subscribing..");
pubnub.subscribe({
    channels: ['mekamon'] 
});