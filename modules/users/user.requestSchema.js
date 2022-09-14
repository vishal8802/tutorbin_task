const signupUserRequestSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string', minLength: 8 },
    confirmPassword: { type: 'string', minLength: 8 },
  },
  required: ['username', 'password', 'confirmPassword'],
  additionalProperties: false,
};

const loginUserRequestSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

module.exports = { signupUserRequestSchema, loginUserRequestSchema };
