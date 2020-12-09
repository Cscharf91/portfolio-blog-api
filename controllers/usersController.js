import User from '../models/User';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

exports.register = [
  body('name').escape(),
  body('email').trim().isLength({ min: 6 }).isEmail().escape(),
  body('password').isLength({ min: 6 }).escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ errors: "Email already exists" });

  const hashedPassword = await bcrypt
}