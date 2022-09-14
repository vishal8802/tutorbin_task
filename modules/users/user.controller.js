const { userModel } = require('../../db/models');
const { hashPassword, comparePassword } = require('../../utils/passwordHash');
const { createJWT } = require('../../utils/jwt');

const loginUser = async (req, res) => {
  try {
    const response = { code: 200, message: 'Login success' };
    const { username, password } = req.body;
    const user = await userModel.findOne(
      { username },
      { username: 1, password: 1 },
    );
    const hashedPassword = user?.password;
    if (!user || !comparePassword(hashedPassword, password)) {
      response.code = 400;
      response.message = 'Invalid username and password';
    } else {
      const userObj = user.toJSON();
      const jwtToken = createJWT({ data: userObj });
      response.token = jwtToken;
    }

    res
      .status(response.code)
      .send({ message: response.message, token: response.token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Error' });
  }
};

const singupUser = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      res.status(400).send({ message: 'Password mismatch' });

    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: 'User created' });
  } catch (err) {
    if (err && err.code === 11000)
      res.status(400).send({ message: 'username already in use' });
    else res.status(500).send({ message: 'Internal Error' });
  }
};

module.exports = { loginUser, singupUser };
