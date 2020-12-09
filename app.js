import express from 'express';
import mongoose, { mongo } from 'mongoose';
import routes from './routes';
const app = express();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to DB");
});

app.use(express.json());

//Routes
app.use('/users', routes.users);

app.listen(3000, () => console.log('Server is up and running'));