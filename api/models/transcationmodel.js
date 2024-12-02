import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({

    name:{type:String,required:true},
    price:{type:Number,required:true},
    datetime:{type:Date,required:true},
    description:{type:String,required:true},
    
});

export default mongoose.model("Transcation",transactionSchema);