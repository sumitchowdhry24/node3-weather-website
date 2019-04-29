console.log('Client side javascript file!')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value
    const weatherURL = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(weatherURL).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }    
        })
    })
    
})
