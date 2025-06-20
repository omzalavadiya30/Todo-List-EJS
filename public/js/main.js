document.getElementById("priorityFilter").addEventListener("change", function () {
  const value = this.value;
  document.querySelectorAll("#todo-list li").forEach(item => {
    const priority = item.getAttribute("data-priority");
    item.style.display = (value === "All" || priority === value) ? "block" : "none";
  });
});

document.getElementById("todo-form").addEventListener("submit", function (e) {
  const taskInput = document.getElementById("task-input");
  const errorMsg = document.getElementById("validation-message");

  if (taskInput.value.trim() === "") {
    e.preventDefault(); // Stop form from submitting
    errorMsg.style.display = "block";
    taskInput.focus();
  } else {
    errorMsg.style.display = "none"; // Hide if corrected
  }
});
