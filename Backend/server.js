//import TableProfile from './BEconstructors/TableProfile';
//import MenuItem from './BEconstructors/MenuItem';

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
  return res.json(menuItems);    
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

const numOfTables = 12;     //if more tables are added, change this number

const startingArrOfTables = (num) => {      //initializes array of tables so it's length is the same as the number of tables
  var arr = [];
  arr.length = num - 1;
  return arr;}
 
var tables = startingArrOfTables(numOfTables);    //initialization



//Menu Data

class MenuItem {

  constructor(name, sides = []) {
      this.name = name;
      this.sides = sides;
  }
}

var menu = [];    //initialization

const chicken = new MenuItem("Chicken",["French Fries", "Pickle"]);
const steak = new MenuItem("Steak");
const clamChowder = new MenuItem("Clam Chowder",["Oyster Crackers"]);

var menuItems = [
chicken,
steak,
clamChowder
];




