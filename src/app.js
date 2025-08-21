const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express()

const publicDirPath = path.join(__dirname, '../public')
//const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../views/partials')


// To serve static files, expose a folder as public, public folder is exposed at root / path
app.use(express.static(publicDirPath))


app.set('view engine','hbs')
//app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.get('/about',(req, res)=>{
    res.render('About',{
        title: 'About Me',
        name: 'Preetham'
    })
    
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Please contact Armond for rain check :p',
        name: 'Preetham'
        
    })

})

app.get('/', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Preetham'
    })
})

app.get('/weather',(req, res)=>{
    const address = req.query.address;
    // const {address} = req.query;
    if(!address){
        return res.send({
            error: "Please enter an Address.."
        })
    }
    geocode(address,(error, {lat, lng, location }={}) => {
        if(error){
           return res.send({
            error : error
        })
        }
        //forecast(data.lat, data.lng, (error, forecastdata) 
        console.log({lat, lng, location})
        forecast(lat, lng, (error, forecastdata) => {
           if(error){
            return res.send({
                error : error
            })
          }
           console.log(location)
           console.log(forecastdata)
           res.send({
            Address: address,
            location: location,
            Forecast: forecastdata,

           })
        })
    })

})

app.get('/help/{*any}', (req,res)=>{
    console.log('Path that triggered * route:', req.originalUrl);
    res.render('404', {
        title: '404',
        message: 'Help article Not Found. please visit either of the urls',
        name: 'Preetham'
    })

})

app.get('/{*any}', (req,res)=>{
    console.log('Path that triggered * route:', req.originalUrl);
    res.render('404', {
        title: '404',
        message: 'Page Not Found. please visit either of the urls',
        name: 'Preetham'
    })
})


app.listen(3000, () => {
    console.log('App is up & listening on port 3000')
}).on('error', (err) => {
    console.log('Something went wrong:', err)
})