import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('connected');
        console.log(`MONODB connecte : ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`CONNECTION FAILED ERROR:  ${error}`);
        process.exit(1);
    }
}

export default connectDB;