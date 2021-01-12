const rawUserHeader = window.localStorage.getItem('loggedInUser');
//call booking history API 
//iterate and form table of history ordered by booking date
const headerUser = JSON.parse(rawUserHeader);
if(!headerUser){
    window.location.replace("/login");
}
const greeting = document.getElementById("greeting");
greeting.innerHTML = "Hello "+headerUser.NAME+",";


