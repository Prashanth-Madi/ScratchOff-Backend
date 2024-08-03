import  express,{Request,Response} from "express";
import pool from "./database";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from "passport";

import AuthDatabase from "./databaseConnections/Authentication";
import scratchOffRouter from "./routers/scratchOff";
import scratchOffIDRouter from "./routers/scratchOffId";
import authRouter from "./routers/auth";
import signUprouter from "./routers/signUp";
import './strategies/LocalStrategy'
import "./strategies/LocalStrategy";




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



app.use(scratchOffRouter);
app.use(scratchOffIDRouter);
app.use(authRouter);
app.use(signUprouter)
app.post('/signin',passport.authenticate('local'),(req:Request,res:Response)=>{
  if(req.user){
    console.log(req.user['Buyer Id']);
  }
  
res.redirect('http://localhost:3000/')
  

})

// app.get('/signup',(req:Request,res:Response)=>{
//   res.redirect('http://localhost:3000/signup')
// })


app.listen(process.env.PORT,()=>{console.log(`server running on port 4000`)})