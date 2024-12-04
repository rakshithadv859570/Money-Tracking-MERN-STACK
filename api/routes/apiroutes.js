import express from 'express';
const app=express();
import {test,create,getAllUser,getOne,editUser,deleteOne} from '../controllers/apicontroller.js';

const route=express.Router();

route.post("/transaction/create",create);

route.get("/api/transcations",getAllUser);

route.get("/transcations/:id",getOne);

route.put("/edit/:id",editUser);

route.delete("/deleteOne/:id",deleteOne);

route.post("/test",test);


export default route;