import mysql from "mysql2/promise";

// Configura según tu base de datos
export const db = mysql.createPool({
  host: "localhost",   // solo host
  port: 3306,  
  user: "root",
  password: "root",
  database: "mesa_partes_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
