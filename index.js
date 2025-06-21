const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method")); // override method based on query param or hidden input

app.get("/", (req, res) => {
  res.render("list", { todos, error: req.query.error });
});

app.post("/add", (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) return res.redirect("/?error=1");
  todos.push({ id: Date.now(), task, priority });
  res.redirect("/");
});

app.put("/edit/:id", (req, res) => {
  const { task, priority } = req.body;
  const todo = todos.find(todo => todo.id === Number(req.params.id));
  if (todo) {
    todo.task = task;
    todo.priority = priority;
  }
  res.redirect("/");
});

app.delete("/delete/:id", (req, res) => {
  todos = todos.filter(todo => todo.id !== Number(req.params.id));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
