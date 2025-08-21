const request = require('postman-request');

const forecast = (lat, lng, callback) => {

    const url = 'https://api.weatherstack.com/current?access_key=2460f34e09f8e0270bab4fb424e90921&query='+ lat + ','+ lng +'&units=f';
    
    request({url, json: true},(error,{ body } = {}) => {
        if(error){
            callback('Error while connecting to the weather service', undefined)
        }
        else if(body.error){
            callback('Error occured because of invalid co-ordinates in the request', undefined)
        }
        else{

            const { weather_descriptions:weather,temperature,feelslike, precip } = body.current;
            callback(undefined, {
                weather: weather[0],
                temperature,
                feelslike,
                rainProbability: precip
            })  
        }

    })
}

module.exports = forecast