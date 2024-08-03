import  express,{Request,Response} from "express";
import pool from "../database";
import dotenv from 'dotenv';
import { Router } from "express";
import AuthDatabase from "../databaseConnections/Authentication";

const app=express();
app.use(express.json());
dotenv.config();
const router=Router();

app.get('/auth',async (req:Request,res:Response)=>{

    try{
    const credentials=await AuthDatabase.query('SELECT * FROM public."Credentials"')
    res.json(credentials.rows)
    console.log(credentials)
    }
    catch(error){
      console.log(error)
    }
  
  
  })

export default router;