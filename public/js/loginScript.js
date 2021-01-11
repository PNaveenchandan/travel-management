
//const request = require('postman-request');

const loginForm = document.querySelector('form');
const emailField = document.getElementById('emailID');
const passwordField = document.getElementById('passwordID');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

window.localStorage.clear();

loginForm.addEventListener('submit',async (event)=>{
    console.log(event)
    event.preventDefault();
    const emailValue = emailField.value;
    const passwordValue = passwordField.value;

    const userDetailsJson = { email : emailValue, password: passwordValue};

    try{

     fetch('/validateuser',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetailsJson)
    }).then((response)=>{
        response.json().then((data)=>{
            if(data.status === 500){
                messageOne.textContent = data.msg;
            }else{
                window.localStorage.clear();
                window.localStorage.setItem("loggedInUser",JSON.stringify({'ID':data.ID,'NAME':data.NAME,'EMAIL':data.EMAIL}))
                window.location.replace("/home");
            }
        })
    });
}catch(error){
    messageOne.textContent = "Username or password is wrong !!"
}
});
