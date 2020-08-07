const request = require('request')
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZmFyZWVzaHVzc2FpbiIsImEiOiJja2Q3cXMxaXUwNWVoMnRxcjBzejdhZmowIn0.gq_Te6U9PJiMJGJYf9okHg"
    request ({ url:url,json:true },(err,{body})=>{
        if(err){
            callback("Unable to connect to Location services",undefined)
        }else if(body.features.length<1){
            callback("No such location detected try something else",undefined)
        }else{
            const data = {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode