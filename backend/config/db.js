// connect to dataabse:
import dotenv from "dotenv";
import {neon} from "@neondatabase/serverless";

dotenv.config();

const {PGHOST , PGDATABASE , PGUSER , PGPASSWORD}  = process.env;

// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely
// creates a SQL connection using our env variables
export const sql = neon(
    `postgrEsql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

