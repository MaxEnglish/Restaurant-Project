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
    break;  
    case "get-num-of-tables":
      return res.json(numOfTables);
      break;
    case "get-tables":
      return res.json(tables);
      break;
    case "get-table":
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
      let msg = replaceTable(req.body);
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
  var newTableName = newTable.name;
  var done = false;
  var index = 0;
  while (index < tables.length && !done) {
    if (newTableName === tables[index].name) {
      done = true;
      tables.splice(index, 1, newTable);
    }
    index++;
  }
  if (done) {
    return "Sucess!";
  } else {
    return "Failure";
  }
}

//Menu Data

class MenuItem {

  constructor(name, price, type, sides = []) {
      this.name = name;
      this.sides = sides;
      this.price = price;
      this.type = type;
  }
}

//add new Menu items here

const chicken = new MenuItem("Chicken","$14.00", "entree",["French Fries", " Pickle"]);
const steak = new MenuItem("Steak","$20.00","entree");
const clamChowder = new MenuItem("Clam Chowder","$9.00", "appetizer", ["Oyster Crackers"]);

var menuItems = [
chicken,
steak,
clamChowder
];




