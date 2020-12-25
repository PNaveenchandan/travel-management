
//const request = require('postman-request');

const loginForm = document.querySelector('form');
const emailField = document.getElementById('emailID');
const passwordField = document.getElementById('passwordID');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


loginForm.addEventListener('submit',(event)=>{
    console.log(event)
    event.preventDefault();
    const emailValue = emailField.value;
    const passwordValue = passwordField.value;

    const userDetailsJson = { email : emailValue, password: passwordValue};
    fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetailsJson)
    }).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error;
            }else{
                console.log('valid user found with provided credentials')
                messageOne.textContent = data.NAME+data.ADDRESS;
            }
        })
    });
})

