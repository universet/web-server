var express = require('express');
var app = express();
var PORT = 3000; //In js when var is in all caps -> its value shold not change throught the program
var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('Private route hit');
		next();
	},
	logger: function(req, res, next) {
		var date = new Date().toString();
		console.log('Request: ' + req.method + ' ' + date +' ' + req.originalUrl);
		next();
	}
};

app.use(middleware.logger);
//app.use(middleware.requireAuthentication); //Here we are adding middleware to an app
//middleware should be defined above about route


/*app.get('/', function(req, res) {
	res.send('Hello Express!');
});
*/



app.get('/about', middleware.requireAuthentication, function(req, res) {
	res.send('About us!');
});

app.use(express.static(__dirname + '/public'));
//console.log(__dirname); --> to get directory

//app.listen(3000); //on which port you will listen

app.listen(PORT, function () {
	console.log('Express server started at ' + PORT);
})