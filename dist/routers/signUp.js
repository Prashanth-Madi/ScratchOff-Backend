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
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("express");
const uuid_1 = require("uuid");
const Authentication_1 = __importDefault(require("../databaseConnections/Authentication"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const router = (0, express_2.Router)();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.userName);
    console.log(req.body.passWord);
    const Buyer_id = (0, uuid_1.v4)();
    try {
        const Credential = yield Authentication_1.default.query('INSERT INTO public."Credentials" ("Username","Password","Buyer Id") VALUES ($1,$2,$3)', [req.body.userName, req.body.passWord, Buyer_id]);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
