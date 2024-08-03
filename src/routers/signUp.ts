import  express,{Request,Response} from "express";
import pool from "../database";
import dotenv from 'dotenv';
import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import AuthDatabase from "../databaseConnections/Authentication";

const app=express();
app.use(express.json());
dotenv.config();
const router=Router();
router.post('/signup',async(req:Request,res:Response)=>{
    console.log(req.body.userName);
    console.log(req.body.passWord);
    const Buyer_id=uuidv4();
    try{
      const Credential=await AuthDatabase.query('INSERT INTO public."Credentials" ("Username","Password","Buyer Id") VALUES ($1,$2,$3)',[req.body.userName,req.body.passWord,Buyer_id])
  
  
    }
    catch(error){
      console.log(error)
    }
  
  })


export default router;