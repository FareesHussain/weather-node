console.log("index.js")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temp = document.getElementById('temp')
const desc = document.getElementById('desc')
const windspeed = document.getElementById('windspeed')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')
const time = document.getElementById('time')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    // messageOne.textContent = 'Loading...'
    loading.textContent = "Loading . . ."
    time.textContent = ''
    sunrise.textContent = ''
    sunset.textContent = ''
    temp.textContent = ''
    desc.textContent = ''
    windspeed.textContent = ''
    pressure.textContent = ''
    humidity.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                temp.textContent = data.error
                loading.textContent = ""
            } else {

                var timeE = new Date(data.time*1000)
                var sunriseE = new Date(data.sunrise*1000)
                var sunsetE = new Date(data.sunset*1000)

                temp.textContent = "Temperature : " +data.temp
                desc.textContent = "Updates : " +data.weatherDesc
                windspeed.textContent = "windspeed : " +data.windspeed
                pressure.textContent = "pressure : " +data.pressure
                humidity.textContent = "humidity : " +data.humidity
                time.textContent = "time : \n" +timeE.toGMTString()+"<br>"+timeE.toLocaleString()
                sunrise.textContent = "sunrise : \n" +sunriseE.toGMTString()+"<br>"+sunriseE.toLocaleString()
                sunset.textContent = "sunset : \n" +sunsetE.toGMTString()+"<br>"+sunsetE.toLocaleString()
                loading.textContent = ""
            }
        })
    })
})
