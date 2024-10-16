document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    addTasks();
  });

  loadTasks();
  updateTodoCounter();
});

function loadTasks() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear the list before loading

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");

    todoItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${todo.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            todo.completed ? "checked" : ""
          }/>
          <p>${todo.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" alt="Edit Task" onClick="editTask(${index})"/>
          <img src="./img/bin.png" alt="Delete Task" onClick="deleteTask(${index})"/>
        </div>
      </div>
    `;

    todoItem.querySelector(".checkbox").addEventListener("change", function () {
      toggleTaskComplete(index);
    });

    todoList.appendChild(todoItem);
  });

  updateTodoCounter();
}

let editIndex = null; // Track the task being edited
function addTasks() {
  const inputField = document.getElementById("todo-input");
  const todoText = inputField.value.trim();

  if (todoText) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (editIndex !== null) {
      todos[editIndex].text = todoText;
      editIndex = null;
    } else {
      todos.push({
        text: todoText,
        completed: false,
      });
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    loadTasks();
    updateTodoCounter();
    inputField.value = "";
    document.getElementById("add-btn").textContent = "+";
  }
}

function toggleTaskComplete(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTasks();
  updateTodoCounter();
}

function deleteTask(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTasks();
  updateTodoCounter();
}
function editTask(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  document.getElementById("todo-input").value = todos[index].text;
  editIndex = index;
}
function updateTodoCounter() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const progress = document.getElementById("progress");
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  progress.style.width = `${progressPercentage}%`;

  const numbersDisplay = document.getElementById("numbers");
  numbersDisplay.textContent = `${completedCount} / ${totalCount}`;

  if (totalCount == completedCount && todos.length) {
    window.confetti();
  }
}

const confetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
