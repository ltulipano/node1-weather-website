const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/41ec69dc0ac4f18b67262ce604521b3e/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude); 
    request({url, json: true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to weather service', undefined);
        } 
        else if(body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' Currently: ' + body.currently.temperature + ' / ' + body.currently.precipProbability + '% chance rain. High: ' + body.daily.data[0].temperatureHigh + ' Low: ' + body.daily.data[0].temperatureLow);
        }
    });
}

module.exports = forecast;