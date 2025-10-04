import mysql2 from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql2.createPool({
  uri: process.env.DATABASE_URL as string,
});

export const db = drizzle(pool);
