import dotenv from "dotenv";
import { readFileSync } from "fs";
import { createConnection } from "mysql2/promise";

dotenv.config();

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
  await connection.query(`CREATE DATABASE ${DB_NAME}`);
  await connection.query(`USE ${DB_NAME}`);

  const sql = readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  await migrate();
} catch (err) {
  console.error(err);
}