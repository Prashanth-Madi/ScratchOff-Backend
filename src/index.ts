import  express,{Request,Response} from "express";
import pool from "./database";
import cors from "cors";
import exp from "constants";
import AuthDatabase from "./databaseConnections/Authentication";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from "passport";



const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(cookieParser("hello world"));
app.use(
  session({
    secret:"Prashanth Madisehtti",
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:60000*2
    }
  })
)
app.use(passport.initialize());
app.use(passport.session());



app.listen(process.env.PORT,()=>{console.log(`server running on port 4000`)})
app.get('/scratchOff',async (req:Request,res:Response)=>{
    try{
        const result= await pool.query('SELECT * FROM public."Books Info"')
        res.json(result.rows);
       // console.log(result.rows)
    }
    catch(error){
        res.status(500).send(error)

    }}
)
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
app.post('/signin',)


app.post('/signup',async(req:Request,res:Response)=>{
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