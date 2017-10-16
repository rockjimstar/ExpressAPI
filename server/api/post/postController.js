var Post = require('./postModel');
var _ = require('lodash');

/*
exports.params = function(req, res, next, id){
	Post.findById(id)
		.populate('author categories')
		.exec()
		.then(function(post){
			if(!post){
				next(new Error('No post with that id'));
			}
			else{
				req.post = post;
				next();
			}
		}, function(err){
			next(err);
		});
};
*/

exports.get = function(req, res, next){
	Post.find({})
		.populate('author', 'username')
		.populate('categories')
		.exec()
		.then(function(posts){
			res.json(posts);
		}, function(err){
			next(err);
		});
};

exports.getOne = function(req, res, next){
	Post.findById(req.params.id)
		.populate('author', 'username')
		.populate('categories')
		.exec()
		.then(function(post){
			if(!post){
				next(new Error('No post with that id'));
			}
			else{
				res.json(post);
			}
		}, function(err){
			next(err);
		});
};

exports.put = function(req, res, next){

	Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, saved){
		if(err){
			next(err);
		}
		else{
			res.json(saved);
		}
	});
	/*
	Post.findById(req.params.id)
		.then(function(post){
			if(!post){
				next(new Error('No post with that id'));
			}
			else{

				var updatedPost = _.merge(post, req.body);

				updatedPost.save(function(err, saved){
					if(err){
						res.send(err);
						next(err);
					}
					else{
						res.json(saved);
					}
				});
			}
		}, function(err){
			next(err);
		});
		*/
};

exports.post = function(req, res, next){
	var newPost = req.body;

	Post.create(newPost)
		.then(function(post){
			res.json(post);
		}, function(err){
			next(err);
		});
};

exports.delete = function(req, res, next){
	req.post.remove(function(err, removed){
		if(err){
			next(err);
		}
		else{
			res.json(removed);
		}
	});
};