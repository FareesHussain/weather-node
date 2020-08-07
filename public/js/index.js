console.log("index.js")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const loading = document.querySelector('#loading')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    // messageOne.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    loading.textContent = "Loading . . ."


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                loading.textContent = ""
            } else {
                messageOne.textContent = "Temperature : " +data.temp
                messageTwo.textContent = "Updates : " +data.weatherDesc
                loading.textContent = ""
            }
        })
    })
})
