import User from '../models/User';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

exports.register = async (req, res) => {
  [
    body('name').escape(),
    body('email').trim().isLength({ min: 6 }).isEmail().escape(),
    body('password').isLength({ min: 6 }).escape()
  ]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ errors: "Email already exists" });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.json({ json: user });
  } catch(err) {
    res.status(400).json(err);
  }
}

exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ errors: "Email doesn't exist" })
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ errors: "Invalid password" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json(token);
}