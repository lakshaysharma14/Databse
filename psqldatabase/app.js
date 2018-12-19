var express = require("express");
var app = express();
var bodyParser =require('body-parser');

//------------------------------------------------------------------------------------------------
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'lakshay', {
  host: 'localhost',
  dialect: 'postgres', // 'mysql'|'sqlite'|'postgres'|'mssql',
  //port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = sequelize.define('user', {
	username: Sequelize.STRING,
	birthday: Sequelize.DATE
});

	sequelize.sync()
 	.then(() => User.create({
 	username: 'janedoe',
 	birthday: new Date(1980, 6, 20)
 	}))
	.then(jane => {
 	console.log(jane.toJSON());
 	});

 	sequelize.sync()
 	.then(() => User.create({
 	username: 'johndoe',
 	birthday: new Date(1999, 2, 1)
 	}))
	.then(jane => {
 	console.log(jane.toJSON());
 	});

 	// Parses the text as JSON and exposes the resulting object on req.body.
	app.use(bodyParser.json());
	
	// Parses the text as URL encoded data and exposes the resulting object 
	// (containing the keys and values) on req.body.
	// (This is how browsers tend to send form data from regular forms set to POST) 
	app.use(bodyParser.urlencoded({ extended: false }));

//-----------------------------------------------------------------------------------------------------------
	app.use(express.static("./public"));

	app.get("/", function(req, res){
	res.sendFile("public/index.html", {root: __dirname});
	})

	app.get("/users", function(req, res){
	User.findAll().then((users)=>{               //asychronous call .then will be executen when findAll will fetch all the data
		//console.log(users);
		res.json(users);
	});
	})

	// The order of mathing URLs matters 
	app.get("/users/:id", function(req, res){
	let id = req.params.id; // This is a string
	User.findAll({
  		where: { id: id }
	}).then((users)=>{
		//console.log(users);
		res.json(users);
	});
	})

	// Use POSTMAN Chrome extension
	// x-www-form-urlencoded
	
	app.post("/users/:id", function(req, res){
	let id = req.params.id;
	let data = req.body;
	console.log(data);

	User.update({
		username: data.username,
	}, 
	{
		where: { id: id }
	}).then((result)=>{                //result came fro update function
		//console.log(result);
		res.json(result);
	});
})
	



app.listen(3000);
console.log("Express app running on port 3000");

module.exports = app;

