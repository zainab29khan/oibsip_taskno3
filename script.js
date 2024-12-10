const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

function createTaskElement(taskText, isCompleted = false, timestamp = new Date()) {
  const li = document.createElement("li");
  li.textContent = `${taskText} (Added: ${timestamp.toLocaleString()})`;
  
  if (!isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = () => completeTask(li, taskText);
    li.appendChild(completeBtn);
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => editTask(li, isCompleted);
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);

  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }
  
  const newTask = createTaskElement(taskText);
  pendingTasks.appendChild(newTask);
  taskInput.value = "";
}

function completeTask(taskElement, taskText) {
  taskElement.remove();
  const completedTask = createTaskElement(
    taskText,
    true,
    new Date()
  );
  completedTasks.appendChild(completedTask);
}

function editTask(taskElement, isCompleted) {
  const newTaskText = prompt("Edit your task:", taskElement.textContent.split("(")[0].trim());
  if (newTaskText) {
    taskElement.remove();
    const updatedTask = createTaskElement(
      newTaskText,
      isCompleted,
      new Date()
    );
    if (isCompleted) {
      completedTasks.appendChild(updatedTask);
    } else {
      pendingTasks.appendChild(updatedTask);
    }
  }
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
