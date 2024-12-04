import express from 'express';
const app = express();
import cors from "cors";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
// import Transcation from './models/transcationmodel.js';
import route from './routes/apiroutes.js';

import dotenv from 'dotenv';
dotenv.config();
const PORT = 8080;

app.use(cors());//cross origin data while backend and frontend intearcting 
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dvrakshitha63:QQgqjG0w3JJu3CrV@cluster0.yyptv.mongodb.net")
.then(()=>
{   console.log("MongoDB connected succesfully");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err)=> console.log(err));

app.use("/api",route);


//password:QQgqjG0w3JJu3CrV //ipaddress:(106.193.68.171//username:dvrakshitha63
//mongocloudstring:mongodb+srv://dvrakshitha63:<db_password>@cluster0.yyptv.mongodb.net/(online-connectins)
//mongodb+srv://dvrakshitha63:<db_password>@cluster0.yyptv.mongodb.net/