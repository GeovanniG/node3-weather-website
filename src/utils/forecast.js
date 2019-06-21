const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/60681dcfff8efde7df2e811a67e2e9ad/${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temp = body.currently.temperature;
            const precip = body.currently.precipProbability;
            callback(undefined, { temp, precip });
        }
    });
    
}

module.exports = forcast;