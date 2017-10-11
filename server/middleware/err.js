module.exports = function(){
	return function(err, res, req, next){
		console.log(err.message);
		res.status(500);
	};
};