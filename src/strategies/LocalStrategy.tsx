import passport from "passport";
import { Strategy } from "passport-local";
import AuthDatabase from "../databaseConnections/Authentication";
import axios from "axios";

export default passport.use(new Strategy(async(username,password,done)=>{
    const allCredentials=await AuthDatabase.query('SELECT * from public."Credentials');
    resizeBy.json(allCredentials.rows)


}))