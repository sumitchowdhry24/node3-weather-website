request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic3VtaXRjaG93ZGhyeTI0IiwiYSI6ImNqdTE2MnZ3MzIyZHE0NHBnNW9sMXJieGwifQ.WWOPcuZqcJB9keAY3diuCA"

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if( body.features.length === 0 ) {
            callback('No matches for your input.', undefined)
        }
        else {
            const data = { latitude: body.features[0].center[1],
                           longitude: body.features[0].center[0],
                           location: body.features[0].place_name
                         }   
            callback(undefined,data)    
        }
     })
}

module.exports = geocode
