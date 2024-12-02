import express from 'express';
const app = express();
import cors from "cors";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import Transcation from './models/transcationmodel.js';

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


app.get("/api/test",(req,res)=>
{
    res.json("hello this is transcation");
});


app.post("/api/transaction/create", (req, res) => {
    const { name,datetime, description ,price} = req.body;
    const transaction = new Transcation({ name, datetime, description ,price});
    transaction.save();
    res.json(req.body);
});

app.get("/api/transcations",async (req,res)=>
{
   const result= await Transcation.find()
   .then((result) => {res.json(result);})
   .catch((err) => {console.log(err);})
        
});

app.get("/api/transcations/:id",async (req,res)=>
    {
        const id=req.params.id;
        const result= await Transcation.findById(id)
       .then((result) => {res.json(result);})
       .catch((err) => {console.log(err);})
            
    });

app.put("/api/edit/:id", async (req, res) => {
        const id = req.params.id;
        try {
          const result = await Transcation.findByIdAndUpdate(id, req.body, { new: true } );
          if (!result) {
            return res.status(404).json({ error: "Transaction not found" });
          }
          res.json(result);
        } catch (err) {
          console.error("Error updating transaction:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      
    
app.delete("/api/deleteOne/:id", async (req, res) => {
        const id = req.params.id;
        try {
          const result = await Transcation.findByIdAndDelete(id);
          if (!result) {
            return res.status(404).json({ error: "Transaction not found" });
          }
          res.json({ message: "Transaction deleted successfully" });
        } catch (err) {
          console.error("Error deleting transaction:", err);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      





//password:QQgqjG0w3JJu3CrV //ipaddress:(106.193.68.171//username:dvrakshitha63
//mongocloudstring:mongodb+srv://dvrakshitha63:<db_password>@cluster0.yyptv.mongodb.net/(online-connectins)
//mongodb+srv://dvrakshitha63:<db_password>@cluster0.yyptv.mongodb.net/