const router = require('express').Router();
const { userRoutes } = require('./modules');

router.use('/user', userRoutes);

module.exports = router;
