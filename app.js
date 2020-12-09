import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';
import 'dotenv/config';
import passport from 'passport';
const jwtStrategy = require('./strategies/jwt');
const app = express();

const atlasUri = process.env.ATLAS_URI;
mongoose.connect(atlasUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
  console.log('connected to DB');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/api/users', usersRoutes);

app.listen(3000, () => console.log('Server is up and running'));