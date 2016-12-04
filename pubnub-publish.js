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
            console.log("We are connected!");
        }
    },
    message: function(message) {
        message = message.message;
        // console.log("New Message!!", message);
        // console.log("message.from", message.from);
        // console.log("message.type", message.type);
        // if not myself AND not robot AND is a translation message
        if (message.from != window.user && message.from != "mekamon" && message.type == "translation") {
            if (window.user == "user_left") {
                window.other_coordX = (message.translation.rotate - 49) / 50;
                window.other_coordY = 0;
                // console.log("window.user", window.user);
                // console.log("window.other_coordX", window.other_coordX);
                // console.log("window.other_coordY", window.other_coordY);
                GameController.setPosition(1, window.other_coordX, window.other_coordY);
            } else {
                window.other_coordX = (message.translation.strideLenX - 49) / 50;
                window.other_coordY = (message.translation.strideLenY - 49) / 50;
                // console.log("window.user", window.user);
                // console.log("window.other_coordX", window.other_coordX);
                // console.log("window.other_coordY", window.other_coordY);
                GameController.setPosition(0, window.other_coordX, window.other_coordY);
            };
        }
    },
    presence: function(presenceEvent) {
        // handle presence
    }
})

console.log("Subscribing..");
pubnub.subscribe({
    channels: ['mekamon'] 
});