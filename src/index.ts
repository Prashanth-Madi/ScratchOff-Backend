import  express,{Request,Response} from "express";
import pool from "./database";
import cors from "cors";
import exp from "constants";
import AuthDatabase from "./databaseConnections/Authentication";


const app=express();
app.use(express.json());
//const port=4000;
app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//     res.header('Access-Control-Allow-cartContextods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific cartContextods
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
//     next();
//   });
app.listen(4000,()=>{console.log(`server running on port 4000`)})
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
   console.log(typeof(req.params.id))
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