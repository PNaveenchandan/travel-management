const userObj = window.localStorage.getItem('loggedInUser');
//call booking history API 
//iterate and form table of history ordered by booking date
const user = JSON.parse(userObj);
if(!user){
    window.location.replace("/login");
}
 fetch("/price").then((response) => {
    response.json().then((rateList) => {
      generate_table(rateList);
    });
  });



  function generate_table(rateList) {
    // get the reference for the body
    //var body = document.getElementsByTagName("body")[0];
    var body = document.getElementById("rateCard");
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    //create header of table
    var headerRow = document.createElement("tr");
    for (column of ["ID","Transport Type", "Price Per KM(INR)"]) {
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
    rateList.forEach(rate=>{
    // creates a table row
    var row = document.createElement("tr");
      for (column of [rate.ID,rate.TRANSPORT_TYPE,rate.PRICE_PER_KM]) {
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
    })
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "1");
    tbl.setAttribute("width","100%");
  }