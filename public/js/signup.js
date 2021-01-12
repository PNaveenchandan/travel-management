const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const dob = document.getElementById("dob");
const password = document.getElementById("password");

const submitBtn = document.getElementById("submitbtn");

dob.addEventListener("focus", (event)=>{
    let myPicker = new SimplePicker();
    myPicker.open(); 
    myPicker.on('submit', function(date, readableDate){
        dob.value = moment(date).format('DD-MMM-YYYY');
      })
});

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    fetch('/user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getUserDetails())
    }).then((response)=>{
        if(response){
            window.location.replace("/login")
        }
    });
  });


  function getUserDetails(){
    return {
        "NAME": name.value,
        "EMAIL": email.value,
        "PASS": password.value,
        "DOB": moment(dob.value,"DD-MMM-YYYY").format("YYYY-MM-DD"),
        "PHONE_NUM": phone.value,
        "ADDRESS":"Default"
    }
  }