var router = require('express').Router();

var userRouter = require('./user/userRouter');
var categoryRouter = require('./category/categoryRouter');
var postRouter = require('./post/postRouter');

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);


module.exports = router;