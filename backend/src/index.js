import connectDB from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'

dotenv.config({
    path: './env'
})

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("App encounterd an error");
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error!!!");
  });