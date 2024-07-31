import  { Pool } from "pg";
import {Request} from 'express';
const pool=new Pool({
    user:"jeshwanthleo",
    host:"localhost",
    database:"ScratchOff",
    password:"",
    port:5432

})
export default pool;