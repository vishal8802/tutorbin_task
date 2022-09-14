const router = require('express').Router();
const { singupUser, loginUser } = require('./user.controller');
const { validate } = require('../../utils/validate');
const {
  signupUserRequestSchema,
  loginUserRequestSchema,
} = require('./user.requestSchema');

router.post(
  '/signup',
  validate({ schema: signupUserRequestSchema, dataIn: 'body' }),
  singupUser,
);
router.post(
  '/login',
  validate({ schema: loginUserRequestSchema, dataIn: 'body' }),
  loginUser,
);

module.exports = router;
