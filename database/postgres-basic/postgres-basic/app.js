var express = require("express");
var app = express();

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

// sequelize.sync()
// .then(() => User.create({
// 	username: 'janedoe',
// 	birthday: new Date(1980, 6, 20)
// }))
// .then(jane => {
// 	console.log(jane.toJSON());
// });

app.use(express.static("./public"));

app.get("/", function(req, res){
	res.sendFile("public/index.html", {root: __dirname});
})

app.get("/users", function(req, res){
	User.findAll().then((users)=>{
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

app.listen(3000);
console.log("Express app running on port 3000");

module.exports = app;

