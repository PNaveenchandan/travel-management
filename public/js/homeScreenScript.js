const userObj = window.localStorage.getItem('loggedInUser');
//call booking history API 
//iterate and form table of history ordered by booking date
const user = JSON.parse(userObj);
if(!user){
    window.location.replace("/login");
}

const fromPlaceField = document.getElementById("FromPlaceID");
const toPlaceField = document.getElementById("ToPlaceID");
const dateField = document.getElementById("DateID");
const search = document.getElementById("search");


let placeNameIdMap = new Map();

search.addEventListener("click", (event) => {
  if (fromPlaceField.value === "" || toPlaceField.value === "") {
    alert("Select From and To Places");
  }
  const startPlaceId = placeNameIdMap.get(fromPlaceField.value);
  const endPlaceId = placeNameIdMap.get(toPlaceField.value);
  fetch(
    "/transport-routes?start_place=" +
      startPlaceId +
      "&dest_place=" +
      endPlaceId
  ).then((response) => {
    response.json().then((routes) => {
      console.log(routes);
      generate_table(routes);
    });
  });
});

fromPlaceField.addEventListener("keyup", (event) => {
  let arr = [];
  if (fromPlaceField.value !== "") {
    autoCompletePlaces("FROM", fromPlaceField.value);
  }
});

toPlaceField.addEventListener("keyup", (event) => {
  if (toPlaceField.value !== "") {
    autoCompletePlaces("TO", toPlaceField.value);
  }
});

dateField.addEventListener("focus", (event)=>{
    let myPicker = new SimplePicker();
    myPicker.open(); 
    myPicker.on('submit', function(date, readableDate){
        dateField.value = moment(date).format('DD-MM-YYYY');
        console.log(moment(date).format('DD-MM-YYYY'))
      })
});

function generate_table(routes) {
  // get the reference for the body
  //var body = document.getElementsByTagName("body")[0];
  var body = document.getElementById("searchresults");
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  //create header of table
  var headerRow = document.createElement("tr");
  for (column of ["Route Id","Transport Type", "Distance in KM","Choose"]) {
    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    var cell = document.createElement("th");
    cell.style.backgroundColor = 'grey';
    var cellText = document.createTextNode(column);
    cell.appendChild(cellText);
    headerRow.appendChild(cell);
  }
  tblBody.appendChild(headerRow);
  // creating all cells
  for (route of routes) {
    // creates a table row
    var row = document.createElement("tr");

    for (column of [route.ID,route.TRANSPORT_TYPE, route.DIST_KM, "SELECT"]) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
     if (column === "SELECT") {
        addSelectButton(row,cell);
      } else {
        var cellText = document.createTextNode(column);
        cell.appendChild(cellText);
      }
      row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "1");
  tbl.setAttribute("width","100%");
}

function addSelectButton(row,td) {
  var btn = document.createElement("input");
  btn.type = "button";
  btn.className = "btn";
  btn.value = "Select";
  btn.onclick = (function() {return function(row) {selectRoute(row);}})(row);
  td.appendChild(btn);
}

async function selectRoute(row){
    console.log(dateField.value);
    console.log(row.target.parentNode.parentNode.firstChild)
    const userObj = window.localStorage.getItem('loggedInUser');
    if(!userObj){
      window.location.replace("/login")
    }else{
      const userId = JSON.parse(userObj).ID;
      window.location.replace("/bookingsummary?route="+row.target.parentNode.parentNode.firstChild.innerHTML+"&date="+dateField.value+"&userId="+userId);
    }
    
}

async function autoCompletePlaces(field, prefix) {
  let arr = [];
  let inp;
  await fetch("/places/filter?prefix=" + prefix).then((response) => {
    response.json().then((places) => {
      for (const place of places) {
        arr.push(place.NAME);
        if (!placeNameIdMap.has(place.NAME)) {
          placeNameIdMap.set(place.NAME, place.ID);
        }
      }
    });
  });
  if (field === "FROM") {
    inp = fromPlaceField;
  } else {
    inp = toPlaceField;
  }
  autocomplete(inp, arr);
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
