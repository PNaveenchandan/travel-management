const Cancel = document.getElementById("Cancel");
const Confirm = document.getElementById("Confirm");

Cancel.addEventListener("click", (event) =>{
    window.location.replace("/home");
});

Confirm.addEventListener("click", (event) =>{
    //update booking status
    const bookingRefId = document.getElementById('summaryTable').rows[0].cells[1].innerHTML;
    console.log(bookingRefId);

        fetch('/booking?bookId='+bookingRefId,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
              }
        }).then((response)=>{});

    window.location.replace("/bookinghistory");
});