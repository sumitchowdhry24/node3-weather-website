request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/51adad26f526d5bd96ec2ebf1c3aa069/" + latitude + "," + longitude + "?units=si"

    request( {url, json: true }, (error,{body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }
        else if(body.error) {
            callback('There was error with the input.', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees with a " + body.currently.precipProbability + "% chance of rain." + "The high today is " + 
            body.daily.data[0].temperatureHigh + " degrees with a low of " + body.daily.data[0].temperatureLow + " degrees.")
        }
     
    })
}

module.exports = forecast

