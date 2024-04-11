import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    // console.log(1);
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is listening on port ${process.env.PORT || 3000}`);        
    })
    app.on('error',(err)=>{
        console.log("error in app: ", err);
        throw err;        
    })
})
.catch((err)=>{
    console.log("DB connection error: ",err);
})
