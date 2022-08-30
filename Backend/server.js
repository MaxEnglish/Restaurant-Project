const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.get('/api', function(req, res){   //handle get requests
  switch (req.headers.reqtype) {
    case "get-menu":
    return res.json(menuItems);   
    case "get-num-of-tables":
      return res.json(numOfTables);
    case "get-tables":
      return res.json(tables);
  }
   
});


app.post('/api', function (req, res) {    //handle post requests
  switch (req.headers.reqtype) {
    case "new-table":
      tables.push(req.body);
      res.send("Table Added!");
      break;
    case "replace-table":
      //console.log(tables)
      let msg = replaceTable(req.body);
      console.log(tables)
      res.json(msg);
      break;
  }
});


app.listen(5000, () => console.log("server started on port 5000"));

//////////////////////////////////////////////////////////////////////////////////

//Table Data

const numOfTables = 12;     //if more tables are added to restaurant, change this number

var tables = [];    //initialization of where table data is stored

const replaceTable = (newTable) => {
  var tableName = newTable.name;
  var done = false;
  var count = 0;
  while (count < tables.length && !done) {
    if (tableName === tables[count].name) {
      done = true;
      tables.splice(count, 1, newTable);
    }
    count++;
  }
  if (done) {
    return "Sucess!";
  } else {
    return "Failure";
  }
}

//Menu Data

class MenuItem {

  constructor(name, sides = []) {
      this.name = name;
      this.sides = sides;
  }
}

//add new Menu items here

const chicken = new MenuItem("Chicken",["French Fries", "Pickle"]);
const steak = new MenuItem("Steak");
const clamChowder = new MenuItem("Clam Chowder",["Oyster Crackers"]);

var menuItems = [
chicken,
steak,
clamChowder
];




