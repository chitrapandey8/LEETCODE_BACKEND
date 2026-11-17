import mongoose from 'mongoose'
import { serverConfig } from '.'
import logger from './logger.config';

export async function connectDB(){
    try{
       await mongoose.connect(serverConfig.MONGO_URL);
       logger.info("connected to mongodb successfully");

       mongoose.connection.on("error", (error)=>{
        logger.error("MongoDB connection error", error);
       });

       mongoose.connection.on("disconnected", ()=>{
        logger.warn("MongoDB disconnected");
       })

    }catch(error){
        console.log("DB couldnt connect", error);
        process.exit(1);
    }
}