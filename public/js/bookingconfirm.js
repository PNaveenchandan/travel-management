const Cancel = document.getElementById("Cancel");
const Confirm = document.getElementById("Confirm");

Cancel.addEventListener("click", (event) =>{
    window.location.replace("/home");
});

Confirm.addEventListener("click", (event) =>{
    //update booking status
    window.location.replace("/bookinghistory");
});