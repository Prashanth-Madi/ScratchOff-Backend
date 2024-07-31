"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const AuthDatabase = new pg_1.Pool({
    user: "jeshwanthleo",
    host: "localhost",
    database: "ScratchOff",
    password: "",
    port: 5432
});
exports.default = AuthDatabase;
