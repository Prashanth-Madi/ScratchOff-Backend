"use strict";
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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
const Authentication_1 = __importDefault(require("./databaseConnections/Authentication"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//const port=4000;
app.use((0, cors_1.default)());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//     res.header('Access-Control-Allow-cartContextods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific cartContextods
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
//     next();
//   });
app.listen(4000, () => { console.log(`server running on port 4000`); });
app.get('/scratchOff', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.query('SELECT * FROM public."Books Info"');
        res.json(result.rows);
        // console.log(result.rows)
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.patch('/scratchOffs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(typeof(req.params.id),typeof(req.body.Currently_at));
    const id = req.params.id;
    console.log(typeof (req.params.id));
    try {
        console.log(`Trying to update item with ID: ${id}`);
        const result = yield database_1.default.query('UPDATE "Books Info" SET "Currently_at" = "Currently_at" + 1 WHERE "No" = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No item found with the given ID' });
        }
        console.log('Successfully updated:', result.rows[0]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating Currently_at:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = yield Authentication_1.default.query('SELECT * FROM public."Credential"');
        res.json(credentials.rows);
        console.log(credentials);
    }
    catch (error) {
        console.log(error);
    }
}));
