const express = require("express");
const router = express.Router();

function generateUniqueId() {
  const min = 1000000; // Minimum value for a 7-digit number
  const max = 9999999; // Maximum value for a 7-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomString = randomNumber.toString();
  return "UI" + randomString;
}

module.exports = function (db) {
  // Define the REST API endpoints
  router.get("/", (req, res) => {
    const filterByCafeName = req.query.cafe;
    // /employees?cafe=<cafe>
    if (filterByCafeName) {
      console.info("Get get request fetch employees by cafe");
      db.all(
        "SELECT employee_id, name, email, phone, join_date, CAST((julianday('now') - julianday(join_date)) AS INTEGER) AS days_worked, cafe_name FROM employees LEFT JOIN cafes ON employees.cafe_id=cafes.cafe_id WHERE cafe_name=? ORDER BY days_worked DESC;",
        [filterByCafeName],
        (err, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.info(
              `Select all employees by cafe name ${filterByCafeName}`
            );
            res.json(rows);
          }
        }
      );
    } else {
      db.all(
        "SELECT employee_id, name, email, phone, join_date, CAST((julianday('now') - julianday(join_date)) AS INTEGER)  AS days_worked, cafes.cafe_id, cafe_name FROM employees LEFT JOIN cafes ON employees.cafe_id=cafes.cafe_id ORDER BY days_worked DESC;",
        (err, rows) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
          } else {
            console.info("Select all employees");
            return res.json(rows);
          }
        }
      );
    }
  });

  router.post("/", (req, res) => {
    console.info("Get post request to add a new employee");
    const {
      name,
      gender,
      email,
      phone,
      selectedDate: joinDate,
      selectedCafeId,
    } = req.body;

    // if same employee name or email
    db.all(
      "SELECT * FROM employees WHERE name=? OR email=?;",
      [name, email],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          if (rows.length > 0) {
            const existingEmployee = rows.find(
              (employee) => employee.name === name || employee.email === email
            );
            if (existingEmployee.name === name) {
              console.log("Employee name already exists");
              res.status(409).send("Employee name already exists!");
            } else {
              console.log("Employee email already exists");
              res.status(400).send("Employee email already exists!");
            }
          } else {
            // can add
            const employee_id = generateUniqueId();
            db.run(
              "INSERT INTO employees (employee_id, name, gender, email, phone, join_date, cafe_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                employee_id,
                name,
                gender,
                email,
                phone,
                joinDate,
                selectedCafeId,
              ],
              function (err) {
                if (err) {
                  console.error(err);
                  res.status(500).send("Internal Server Error");
                } else {
                  console.info("Added a new employee");
                  res.status(200).send("Employee added!");
                }
              }
            );
          }
        }
      }
    );
  });

  router.put("/", (req, res) => {
    console.info("Get put request to edit a employee");
    const {
      employee_id,
      name,
      gender,
      email,
      phone,
      selectedDate: joinDate,
      selectedCafeId,
    } = req.body;
    db.run(
      "UPDATE employees SET name=?, gender=?, email=?, phone=?, join_date=?, cafe_id=? WHERE employee_id=?",
      [name, gender, email, phone, joinDate, selectedCafeId, employee_id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.info("Edited a new employee");
          res.json({ success: true });
        }
      }
    );
  });

  // DELETE route for deleting an employee
  router.delete("/:id", (req, res) => {
    const employeeId = req.params.id;
    console.info(`Get delete request to delete employee id ${employeeId}`);
    // SQLite DELETE query
    const deleteQuery = "DELETE FROM employees WHERE employee_id = ?";

    // Run the query with the employee ID as a parameter
    db.run(deleteQuery, employeeId, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete the employee." });
      } else {
        res.status(200).json({
          message: `Employee with ID ${employeeId} has been deleted.`,
        });
      }
    });
  });

  return router;
};
