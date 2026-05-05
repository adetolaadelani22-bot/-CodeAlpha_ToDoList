// Add a task
function addTask(taskText, isDone) {

  // If called from button/Enter, get value from input
  if (!taskText) {
    var input = document.getElementById("task-input");
    taskText = input.value.trim();

    if (taskText === "") {
      alert("Please type a task first!");
      return;
    }
    input.value = "";
    input.focus();
  }

  // Create the list item
  var li = document.createElement("li");
  li.className = "task-item";

  // Create the task text
  var span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  // Restore done state if loading from localStorage
  if (isDone) {
    span.classList.add("done");
  }

  // Create the buttons container
  var div = document.createElement("div");
  div.className = "task-buttons";

  // Create Done button
  var doneBtn = document.createElement("button");
  doneBtn.textContent = "✔ Done";
  doneBtn.className = "btn-done";
  doneBtn.onclick = function() {
    span.classList.toggle("done");
    saveTasks();
  };

  // Create Edit button
  var editBtn = document.createElement("button");
  editBtn.textContent = "✏️ Edit";
  editBtn.className = "btn-edit";
  editBtn.onclick = function() {
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;
    editInput.className = "edit-input";
    li.replaceChild(editInput, span);

    editBtn.textContent = "💾 Save";
    editBtn.onclick = function() {
      span.textContent = editInput.value.trim() || span.textContent;
      li.replaceChild(span, editInput);
      editBtn.textContent = "✏️ Edit";
      saveTasks();
    };
  };

  // Create Delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑 Delete";
  deleteBtn.className = "btn-delete";
  deleteBtn.onclick = function() {
    li.remove();
    saveTasks();
  };

  // Put it all together
  div.appendChild(doneBtn);
  div.appendChild(editBtn);
  div.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(div);
  document.getElementById("task-list").appendChild(li);

  // Save after adding
  saveTasks();
}

// Save all tasks to localStorage
function saveTasks() {
  var tasks = [];
  var items = document.querySelectorAll(".task-item");

  items.forEach(function(item) {
    var text = item.querySelector(".task-text").textContent;
    var done = item.querySelector(".task-text").classList.contains("done");
    tasks.push({ text: text, done: done });
  });

  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Load tasks from localStorage when page opens
function loadTasks() {
  var saved = localStorage.getItem("myTasks");
  if (!saved) return;

  var tasks = JSON.parse(saved);
  tasks.forEach(function(task) {
    addTask(task.text, task.done);
  });
}

// Allow Enter key to add tasks
document.getElementById("task-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Load tasks when page first opens
loadTasks();