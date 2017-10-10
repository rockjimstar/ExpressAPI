var tigerRouter = require('express').Router()
var _ = require('lodash');

var tigers = [];
var id = 0;

var updateId = function(req, res, next){
	id++;
	req.body.id = id + '';
	next();
};

tigerRouter.param('id', function(req, res, next, thisId){
	var tiger = _.find(tigers, {id: thisId});

	if(tiger){
		req.tiger = tiger;
		next();
	}
	else{
		res.send();
	}
});

tigerRouter.route('/')
	.get(function(req, res){
		res.json(tigers);
	})
	.post(updateId, function(req, res){
		var tiger = req.body;
		tigers.push(tiger);
		res.json(tiger);
	});

tigerRouter.route('/:id')
	.get(function(req, res){
		res.json(req.tiger);
	})
	.put(function(req, res){
		var update = req.body;
		if(update.id){
			delete update.id;
		}

		var tiger = _.findIndex(tigers, {id: req.params.id});
		if(!tigers[tiger]){
			res.send();
		}
		else{
			var updatedtiger = _.assign(tigers[tiger], update);
			res.json(updatedtiger);
		}

	})
	.delete(function(req, res){
		var tiger = _.findIndex(tigers, {id: req.params.id});
		if(!tigers[tiger]){
			res.send();
		}
		else{
			var deletedtiger = tigers[tiger];
			tigers.splice(tiger, 1);
			res.json(deletedtiger);
		}
	});

module.exports = tigerRouter;