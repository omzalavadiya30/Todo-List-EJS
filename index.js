const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("list", { todos });
});

app.post("/add", (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) return res.redirect("/?error=1");
  todos.push({ id: Date.now(), task, priority });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  todos = todos.filter(todo => todo.id !== Number(req.body.id));
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const { id, task, priority } = req.body;
  const todo = todos.find(todo => todo.id === Number(id));
  if (todo) {
    todo.task = task;
    todo.priority = priority;
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
