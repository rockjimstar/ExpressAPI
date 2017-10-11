var router = require('express').Router();

router.use('/users', require('./user/userRouter'));
router.use('/categories', require('./category/categoryRouter'));
router.use('/posts', require('./post/postRouter'));

module.exports = router;