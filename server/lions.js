var lionRouter = require('express').Router()
var _ = require('lodash');

var lions = [];
var id = 0;

var updateId = function(req, res, next){
	id++;
	req.body.id = id + '';
	next();
};

lionRouter.param('id', function(req, res, next, thisId){
	var lion = _.find(lions, {id: thisId});

	if(lion){
		req.lion = lion;
		next();
	}
	else{
		res.send();
	}
});

lionRouter.route('/')
	.get(function(req, res){
		res.json(lions);
	})
	.post(updateId, function(req, res){
		var lion = req.body;
		lions.push(lion);
		res.json(lion);
	});

lionRouter.route('/:id')
	.get(function(req, res){
		res.json(req.lion);
	})
	.put(function(req, res){
		var update = req.body;
		if(update.id){
			delete update.id;
		}

		var lion = _.findIndex(lions, {id: req.params.id});
		if(!lions[lion]){
			res.send();
		}
		else{
			var updatedLion = _.assign(lions[lion], update);
			res.json(updatedLion);
		}

	})
	.delete(function(req, res){
		var lion = _.findIndex(lions, {id: req.params.id});
		if(!lions[lion]){
			res.send();
		}
		else{
			var deletedLion = lions[lion];
			lions.splice(lion, 1);
			res.json(deletedLion);
		}
	});

module.exports = lionRouter;