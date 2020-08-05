const request = require('request')

const weather = (city, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bf443b83610798ccc6a74b56591db683&query=" + city
    request({url: url}, (error, response) => {
        if(error){
            callback("Unable to connect", undefined)
        } else {
            const data = JSON.parse(response.body)
            if(data.error) {
                callback("No location found", undefined)
            } else {
                callback(undefined, data.current)
            }
        }
    })
}

module.exports = weather