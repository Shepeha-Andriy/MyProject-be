import mongoose, { ConnectOptions } from "mongoose";
import fs from 'fs'
import Good from "../../models/Good.js";
import donent from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

donent.config()
const mongoURL = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/goodSeed.json`, 'utf-8'))

const loadData = async () => {
  try {
    await Good.create(users)
    console.log('data loaded')
    mongoose.disconnect();
  } catch (e) {
    console.log(e)
  }
}

const deleteData = async () => {
  try {
    await Good.deleteMany()
    console.log('data deleted')
    mongoose.disconnect();
  } catch (e) {
    console.log(e)
  }
}

if (process.argv[2] === '-l') {
  loadData().then()
} else if (process.argv[2] === '-d') {
  deleteData().then()
}
