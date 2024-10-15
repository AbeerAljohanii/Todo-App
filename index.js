document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-btn").addEventListener("click", () => {
    const inputField = document.getElementById("todo-input");
    const todoText = inputField.value;

    if (todoText) {
      const todoList = document.getElementById("todo-list");

      // Create a new todo item
      const todoItem = document.createElement("li");

      // Check for completing the todo
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // Mark todo as complete
      checkbox.addEventListener("change", () => {
        if (this.checked) {
          todoItem.classList.add("completed");
        } else {
          todoItem.classList.remove("completed");
        }
      });

      // Task description
      const taskDescription = document.createElement("span");
      taskDescription.textContent = todoText;

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";

      // Remove todo on delete button click
      deleteBtn.addEventListener("click", () => {
        todoList.removeChild(todoItem);
      });

      // Append checkbox and task description to todo item
      todoItem.appendChild(checkbox);
      todoItem.appendChild(taskDescription);
      todoItem.appendChild(deleteBtn);

      // Add the todo item to the list
      todoList.appendChild(todoItem);

      // Clear the input field
      inputField.value = "";
    }
  });
});
