import  express,{Request,Response} from "express";
import pool from "../database";
import dotenv from 'dotenv';
import { Router } from "express";

const app=express();
app.use(express.json());
dotenv.config();
const router=Router();


router.get('/scratchOff',async (req:Request,res:Response)=>{
    try{
        const result= await pool.query('SELECT * FROM public."Books Info"')
        res.json(result.rows);
       // console.log(result.rows)
    }
    catch(error){
        res.status(500).send(error)

    }}
)

export default router;
