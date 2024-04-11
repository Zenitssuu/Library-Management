import express, { response } from "express"
import { apiResponse } from "./utils/apiResponse.js";
import bookRoute from './routes/books.routes.js'
import { apiError } from "./utils/apiError.js";
import cors from "cors";


const app = express();
//middleware for parsing request body
app.use(express.json());

//cors
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods :['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type']
    })
)

app.get('/',(req,res)=>{
    // console.log(req);

    // return new apiResponse(234,"WELCOME TO MERN LIBRARY MANAGEMENT SYSTEM")

    return res.status(234).send("WELCOME TO MERN LIBRARY MANAGEMENT SYSTEM")
    
});

app.use('/books',bookRoute)

export {app};


