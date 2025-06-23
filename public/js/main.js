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

document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    const task = button.getAttribute('data-task');
    const priority = button.getAttribute('data-priority');

    document.getElementById('todo-id').value = id;
    document.getElementById('task-input').value = task;
    document.getElementById('priority-input').value = priority;

    document.getElementById('method-override').value = 'PUT';
    document.getElementById('todo-form').action = `/edit/${id}?_method=PUT`;

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = 'Update';
    submitBtn.classList.remove('add-btn');
    submitBtn.classList.add('update-btn');
  });
});