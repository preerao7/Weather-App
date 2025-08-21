
const weatherForm = document.querySelector('form');
const addressInputForm = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const address = addressInputForm.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + address)
    .then(response => response.json())
    .then((data) => {
        if(data.error){
            console.log(data.error)
            //throw new Error(data.error)
             message1.textContent = data.error
        }
        else{
        console.log('Location : ', data.location)
        console.log('Weather Forecast : ', data.Forecast)

        message1.textContent = 'Location : ' +  data.location;
        message2.textContent = "Weather Forecast:\n" + JSON.stringify(data.Forecast, null, 2);
        }

    })
    .catch( (error) => {
        console.log (error);
        message1.textContent = error;
    });

})
