module.exports = function(){
	return function(err, res, req, next){
		console.log(err.message);
		res.send(err).status(500);
	};
};