const path = require('path')
const express  = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocodes')
const forecast = require('./utils/forcast')

//define paths for Express config
const pathToPublic = path.join(__dirname,"../public")
const pathToViews = path.join(__dirname,"../templates/views")
const pathToPartials = path.join(__dirname,"../templates/partials")

//setup handlerbars and views location 
app.set('view engine','hbs')
app.set('views',pathToViews)
hbs.registerPartials(pathToPartials)
//setup static directory to serve 
app.use(express.static(pathToPublic))
 
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Farees Hussain'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Farees Hussain'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: "this is some helpful text",
        title: 'Help',
        name: 'Farees Hussain'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"Help page not found",
        name: "farees hussain"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }

        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                temp: forecastData.temp,
                weatherDesc: forecastData.weatherDesc,
                address: req.query.address
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404 page not found",
        name: "farees hussain"
    })
})

app.listen(3000,()=>{

    //!to kill the port use "ps aux | grep node " command on terminal and 
    //! kill it using the command "kill -9 <digit_code>"

    //* to get ip address of localhost enter command "ip addr show"
    //* in the result find the one with 192.168......
    console.log('open https://localhost:3000')
})


