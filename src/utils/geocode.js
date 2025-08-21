const request = require('postman-request');


const geocode = function(address,callback){
    const url = 'https://api.geocod.io/v1.9/geocode?q='+ encodeURIComponent(address) +'&api_key=bee4333334ed23623866747228823c733883382'

    request({ url, json: true},(error, {body} ) => {

        if(error){
            callback('Error while connecting to geocode service', undefined)
        }
        else if(body.error){
            callback('Error returned because of invalid address in request. Please try a valid search', undefined)

        }
        else{
            const {location,formatted_address} = body.results[0]
            callback(undefined, {
                lat: location.lat,
                lng: location.lng,
                location: formatted_address
            })
        }

    })

}


module.exports = geocode