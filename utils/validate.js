const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ({ dataIn = 'query', schema }) => {
  return (req, res, next) => {
    const data = req[dataIn];
    const validator = ajv.compile(schema);
    const valid = validator(data);
    if (!valid) {
      req.isValidationError = true;
      res.status(400).json({ error: true, message: validator.errors });
      throw validator.errors;
    }
    next();
  };
};

module.exports = { validate };
