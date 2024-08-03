// import passport from "passport";
// import { Strategy } from "passport-local";
// import AuthDatabase from "../databaseConnections/Authentication";
// import axios from "axios";

// export default passport.use(
//     new Strategy(async(username,password,done)=>{
//     const allCredentials=await AuthDatabase.query('SELECT * from public."Credentials WHERE "Username"=$1',[username]);
//     console.log(allCredentials)
    
//     passport.serializeUser((user, done) => {
//         done(null, (user as any).id);
//       });
      
//       passport.deserializeUser(async (id, done) => {
//         try {
//           const result = await AuthDatabase.query(
//             'SELECT * FROM public."Credentials" WHERE "id" = $1',
//             [id]
//           );
//           done(null, result.rows[0]);
//         } catch (err) {
//           done(err);
//         }
//       });

// }))

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthDatabase from "../databaseConnections/Authentication";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await AuthDatabase.query(
        'SELECT * FROM public."Credentials" WHERE "Username" = $1',
        [username]
      );
      //console.log(result)

      if (result.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const user = result.rows[0];

      if (user.Password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as any)["Buyer Id"]);
});

passport.deserializeUser(async (buyerId, done) => {
  try {
    const result = await AuthDatabase.query(
      'SELECT * FROM public."Credentials" WHERE "Buyer Id" = $1',
      [buyerId]
    );
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});
