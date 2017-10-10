/*
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var lionRouter = require('./lions');
var tigerRouter = require('./tigers');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);


app.use(function(err, res, req, next){
	if(err){
		console.log(err.message);
		res.status(500).send(err);
	}
});
*/
var express = require('express');
var app = express();
var api = require('./api/api');


require('./middleware/appMiddleware')(app);


app.use('/api', api);


module.exports = app;