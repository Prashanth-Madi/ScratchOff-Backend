"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const scratchOff_1 = __importDefault(require("./routers/scratchOff"));
const scratchOffId_1 = __importDefault(require("./routers/scratchOffId"));
const auth_1 = __importDefault(require("./routers/auth"));
const signUp_1 = __importDefault(require("./routers/signUp"));
require("./strategies/LocalStrategy");
require("./strategies/LocalStrategy");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)("hello world"));
app.use((0, express_session_1.default)({
    secret: "Prashanth Madisehtti",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 2
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(scratchOff_1.default);
app.use(scratchOffId_1.default);
app.use(auth_1.default);
app.use(signUp_1.default);
app.post('/signin', passport_1.default.authenticate('local'), (req, res) => {
    if (req.user) {
        console.log(req.user['Buyer Id']);
    }
    res.redirect('http://localhost:3000/');
});
// app.get('/signup',(req:Request,res:Response)=>{
//   res.redirect('http://localhost:3000/signup')
// })
app.listen(process.env.PORT, () => { console.log(`server running on port 4000`); });
