const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.get('/api', function(req, res){   //handle get requests
  switch (req.headers.reqtype) {
    case "get-menu":
    return res.json(menuItems);   
    case "get-num-of-tables":
      return res.json(numOfTables)
  }
   
});


app.post('/api', function (req, res) {    //handle post requests
  console.log(req.body);
  var table = req.body;
  tables.push(table);
  console.log(tables);
  return res.send('Table has been added successfully');
});


app.listen(5000, () => console.log("server started on port 5000"));

//////////////////////////////////////////////////////////////////////////////////

//Table Data

const numOfTables = 12;     //if more tables are added to restaurant, change this number

var tables = [];    //initialization of where table data is stored

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




