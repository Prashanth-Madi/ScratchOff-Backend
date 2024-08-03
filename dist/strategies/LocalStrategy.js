"use strict";
// import passport from "passport";
// import { Strategy } from "passport-local";
// import AuthDatabase from "../databaseConnections/Authentication";
// import axios from "axios";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const Authentication_1 = __importDefault(require("../databaseConnections/Authentication"));
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Authentication_1.default.query('SELECT * FROM public."Credentials" WHERE "Username" = $1', [username]);
        //console.log(result)
        if (result.rows.length === 0) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const user = result.rows[0];
        if (user.Password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user["Buyer Id"]);
});
passport_1.default.deserializeUser((buyerId, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Authentication_1.default.query('SELECT * FROM public."Credentials" WHERE "Buyer Id" = $1', [buyerId]);
        done(null, result.rows[0]);
    }
    catch (err) {
        done(err);
    }
}));
