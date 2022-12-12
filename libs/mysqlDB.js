import mysql from "mysql2/promise";

// MySQL database connection
export const connect = async ({ query, values = [] }) => {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "caricom",
    user: "root",
    password: "svz1",
    waitForConnections: true,
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    return error.message;
  }
};
