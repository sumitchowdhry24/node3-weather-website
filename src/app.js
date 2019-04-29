const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// PORT is env variable set by Heroku, for local testing use 3000
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Tell expess to use handle bars as the view engine in the app
app.set('view engine', 'hbs')
// Set up the views location
app.set('views', viewsPath)
// Set up path for hbs partials
hbs.registerPartials(partialsPath)

// Tell express to serve up the index.html in the public folder automatically
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather App', name: 'Sumit'})
})

app.get('/about', (req,  res) => {
    res.render('about', { title: 'About Page', name: 'Sumit'})
})

app.get('/help', (req,  res) => {
    res.render('help', { title: 'Help Page', name: 'Sumit'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Please enter an address !'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error: error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }
            
            const weatherData = {
                forecast: forecastData, 
                location: location,
                address: req.query.address }
            
            res.send(weatherData)
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{ title: '404', name: 'Sumit', message: 'Help Document not found !'})
})

app.get('*', (req, res) => {
    res.render('404',{ title: '404', name: 'Sumit', message: 'Page not found !'})
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

