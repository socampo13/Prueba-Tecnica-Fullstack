import mongoose from "mongoose";
import config from "./config.mjs";

(async () => {
    try{
        const db = await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("MongoDB is connected to", db.connection.host);
    }catch (error){
        console.error(error);
    }
})();