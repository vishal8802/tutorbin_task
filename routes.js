const router = require('express').Router();
const { userRoutes, taskRoutes } = require('./modules');

router.use('/user', userRoutes);
router.use('/task', taskRoutes);
module.exports = router;
