import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';
// import postsRoutes from './routes/posts';
import 'dotenv/config';
import passport from 'passport';
import passportJWT, { ExtractJwt } from 'passport-jwt';
import User from './models/User';
const jwtStrategy = passportJWT.Strategy;
const app = express();

const atlasUri = process.env.ATLAS_URI;
mongoose.connect(atlasUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
  console.log('connected to DB');
});

passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, async (jwtPayload, cb) => {
  console.log(jwtPayload);
  try {
    const user = await User.findById(jwtPayload);
    console.log(user);
    if (user) return cb(null, user);
  } catch(err) {
    return cb(err);
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/api/users', usersRoutes);
// app.use('/api/posts', postsRoutes);

app.listen(3000, () => console.log('Server is up and running'));