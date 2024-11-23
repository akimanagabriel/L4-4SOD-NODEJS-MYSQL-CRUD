const express = require("express");
const mysql2 = require("mysql2");

const app = express();
app.listen(5000, () => console.log("Served at port 5000"));

app.use(express.json());

const pool = mysql2
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "acodes",
  })
  .promise();

// create a todo items
app.post("/todo", async (req, res) => {
  const task = req.body.task || null;
  const data = await pool.query("INSERT INTO `todo`(`task`) VALUES (?)", [
    task,
  ]);
  res.json({ msg: "todo saved successfully" });
});

// read all todo data
app.get("/todo", async (req, res) => {
  const [todos] = await pool.query("select * from todo");
  res.json(todos);
});

// delete todo
