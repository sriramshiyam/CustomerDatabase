const mysql = require("mysql");
const express = require("express");

const server = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  server.get("/customers", (req, res) => {
    connection.query(`SELECT * FROM customers`, function (err, result) {
      if (err) return res.send("Error");
      res.send(result);
    });
  });

  server.get("/customers/:id", (req, res) => {
    connection.query(
      `SELECT * FROM customers WHERE id = ${req.params.id}`,
      function (err, result) {
        if (err) return res.send("Error");
        res.send(result.length ? result : "Error 404");
      }
    );
  });

  server.post("/create", (req, res) => {
    connection.query(
      `INSERT INTO customers(name, address, email) VALUES('${req.query.name}','${req.query.address}','${req.query.email}')`,
      function (err, result) {
        if (err) return res.send("Error");
        res.send("one row affected");
      }
    );
  });

  server.put("/update/:id/:column", (req, res) => {
    connection.query(
      `UPDATE customers SET ${req.params.column} = '${req.query.value}' WHERE id = ${req.params.id}`,
      function (err, result) {
        if (err) return res.send("Error");
        res.send("one row affected");
      }
    );
  });

  server.delete("/delete/:id", (req, res) => {
    connection.query(
      `DELETE FROM customers WHERE id = ${req.params.id}`,
      function (err, result) {
        if (err) return res.send("Error");
        res.send("one row affected");
      }
    );
  });
});

server.listen(3000, () => {
  console.log("server started");
});
