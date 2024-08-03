import  express,{Request,Response} from "express";
import pool from "../database";
import dotenv from 'dotenv';
import { Router } from "express";

const app=express();
app.use(express.json());
dotenv.config();
const router=Router();



app.patch('/scratchOffs/:id',async(req:Request,res:Response)=>{
    // console.log(typeof(req.params.id),typeof(req.body.Currently_at));
    const id=req.params.id;
   //  console.log(typeof(req.params.id))
    try {
     console.log(`Trying to update item with ID: ${id}`);
     const result = await pool.query(
       'UPDATE "Books Info" SET "Currently_at" = "Currently_at" + 1 WHERE "No" = $1 RETURNING *',
       [id]
     );
 
     if (result.rowCount === 0) {
       return res.status(404).json({ error: 'No item found with the given ID' });
     }
 
     console.log('Successfully updated:', result.rows[0]);
     res.status(200).json(result.rows[0]);
   } catch (error) {
     console.error('Error updating Currently_at:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });

 export default router;