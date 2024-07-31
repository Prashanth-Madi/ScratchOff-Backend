
import {Pool} from "pg"
const AuthDatabase=new Pool({
    user:"jeshwanthleo",
    host:"localhost",
    database:"ScratchOff",
    password:"",
    port:5432

})
export default AuthDatabase