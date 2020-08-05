const path = require('path')
const express = require('express')
const hbs = require('hbs')

const weather = require('./weather.js')

const app = express()
const port = process.env.PORT || 3000

//Define Paths
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up handlers
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static Directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author: "Piyush Patel"
    })
})

app.get('/queries', (req, res) => {
    res.send(req.query)
})

app.get('/grapes', (req, res) => {
    res.send([
        {
            name: "Prateek",
            age: 26,
            degrees: [
                {
                    degree: "BA",
                    university: "BHU"
                },
                {
                    degree: "MA",
                    university: "MGKVP"
                }
            ]
        },{
            name: "Aparna",
            age: 35
        }
    ])
})

app.get('/:city', (req, res) => {
    const city = req.params.city

    weather(city, (error, response) => {
        if (error) {
            res.send({error: error})
        } else {
            const {temperature, humidity} = response
            res.send({
                city: city,
                temperature: temperature,
                humidity: humidity
            })
        }
    })

})


app.get('*', (req, res) => {
    res.send("Ye raha 404")
})


app.listen(port, () => {
    console.log("Server running.")
})