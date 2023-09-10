const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

module.exports = function (db) {
  // Define the REST API endpoints
  router.get("/", (req, res) => {
    const cafeLocation = req.query.location;
    // /cafes?location=<location>
    if (cafeLocation) {
      console.info("Get get request fetch cafes by location");
      db.all(
        "SELECT cafe_name, description, COUNT(employee_id) as employees, logo, location, cafes.cafe_id FROM cafes LEFT JOIN employees ON cafes.cafe_id=employees.cafe_id WHERE location=? GROUP BY cafes.cafe_id ORDER BY employees DESC;",
        [cafeLocation],
        (err, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.info(`Select all cafes by location ${cafeLocation}`);
            res.json(rows);
          }
        }
      );
    }
    // /cafes
    else {
      console.info("Get get request fetch cafes");
      db.all(
        "SELECT cafe_name, description, COUNT(employee_id) as employees, logo, location, cafes.cafe_id FROM cafes LEFT JOIN employees ON cafes.cafe_id=employees.cafe_id GROUP BY cafes.cafe_id ORDER BY employees DESC;",
        (err, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.info("Select all cafes");
            res.json(rows);
          }
        }
      );
    }
  });

  router.post("/", (req, res) => {
    console.info("Get post request to add a new cafe");
    const { cafe_name, description, location, logo } = req.body;
    // uuid
    const cafe_id = uuidv4();
    db.run(
      "INSERT INTO cafes (cafe_id, cafe_name, description, location, logo) VALUES (?, ?, ?, ?, ?)",
      [cafe_id, cafe_name, description, location, logo],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.info("Added a new cafe");
          res.json({ success: true });
        }
      }
    );
  });

  router.put("/", (req, res) => {
    console.info("Get put request to edit a cafe");
    const { cafe_id, cafe_name, description, location, logo } = req.body;
    db.run(
      "UPDATE cafes SET cafe_name=?, description=?, location=?, logo=? WHERE cafe_id=?",
      [cafe_name, description, location, logo, cafe_id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          console.info("Edited a cafe");
          res.json({ success: true });
        }
      }
    );
  });

  // DELETE route for deleting an cafe
  router.delete("/:id", (req, res) => {
    const cafeId = req.params.id;
    console.info(`Get delete request to delete cafe id ${cafeId}`);
    // SQLite DELETE query
    const deleteQuery = "DELETE FROM cafes WHERE cafe_id = ?";

    // Run the query with the cafe ID as a parameter
    db.run(deleteQuery, cafeId, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete the cafe." });
        return;
      }
      // delete the emplyees worked in the cafe
      else {
        db.run(
          "DELETE FROM employees WHERE cafe_id = ?",
          cafeId,
          function (err) {
            if (err) {
              console.error(err);
              res.status(500).json({ error: "Failed to delete employees" });
              return;
            }
            console.log("Employees worked in the cafe are deleted");
            res.sendStatus(204); // Success, no content
          }
        );
      }
    });
  });

  return router;
};
