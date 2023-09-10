const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeesRoutes");
const cafeRoutes = require("./routes/cafesRoutes");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./db/cafe_project.db"); // Provide the path to your SQLite database file

// Create an "employees" table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      employee_id VARCHAR,
      name VARCHAR,
      gender VARCHAR,
      email VARCHAR,
      phone VARCHAR,
      join_date DATE,
      cafe_id VARCHAR
    )
  `);
});

// Create an "cafes" table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cafes (
      cafe_id VARCHAR,
      cafe_name VARCHAR,
      description VARCHAR,
      location VARCHAR,
      logo VARCHAR
    )
  `);
});

// Mount the employeeRoutes module under '/employees' path
app.use("/employees", employeeRoutes(db));
app.use("/cafes", cafeRoutes(db));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
