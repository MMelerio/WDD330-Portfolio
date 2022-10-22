// Set variables for each element
const list = document.getElementById("task-list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const newTask = document.getElementById("new-task");
const addBtn = document.getElementById("btn");
const activeBtn = document.getElementById("active");
const allBtn = document.getElementById("all");
const completedBtn = document.getElementById("completed");
const chkStatus = document.getElementById("status");

/****************************************
 * LOCAL STORAGE
 ***************************************/

// Variable for local storage
const localStorageTransactions = JSON.parse(localStorage.getItem("tasks"));
let tasks =
  localStorage.getItem("tasks") !== null ? localStorageTransactions : [];


// Update local storage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  countLefttasks();
}

/***************************************
 * CREATE NEW TASKS
 ***************************************/

// Add a new task
function addTask(event) {
  event.preventDefault();
  if (newTask.value === "") {
    alert("Please add a text.");
  } else {
    const task = {
      id: Date.now(),
      text: newTask.value,
      completed: false,
    };
    tasks.push(task);
    console.log(tasks);
    newTask.value = "";
    console.log(task);
    addTaskToList(task);
    updateLocalStorage();
  }
  countLefttasks(tasks);
}


// Add created task to list of tasks
function addTaskToList(task) {
  const item = document.createElement("li");
  item.innerHTML = `
    <input type="checkbox" id="status" ${
      task.completed === true ? "checked" : ""
    } onclick="updateTask(${task.id})"/>
    <label class="label-for-check" for="idinput">${
      task.text
    }</label> <button class="delete-btn" onclick="removeTask(${
    task.id
  })">x</button>
    `;
  list.appendChild(item);
}

/***************************************
 * UPDATE TASK WHEN COMPLETED
 **************************************/

// Update task when completed
function updateTask(id) {
  const tasksIndex = tasks.map((transaction) => transaction.id);
  const index = tasksIndex.indexOf(id);
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  init();
}

/**************************************
 * DELETE A TASK
 *************************************/

// Delete task
function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  updateLocalStorage();
  init();
}

/*************************************
 * FILTERS
 ************************************/

// Filter active tasks
function filterActiveTasks() {
  list.innerText = "";
  filteredTasks = tasks.filter((task) => task.completed === false);
  filteredTasks.forEach(addTaskToList);
}

// Filter completed tasks
function filterCompletedTasks() {
  list.innerText = "";
  filteredTasks = tasks.filter((task) => task.completed === true);
  filteredTasks.forEach(addTaskToList);
}

// Remove filters
function removeFilters() {
  init();
}

/**************************************
 * COUNT ACTIVE TASKS
 **************************************/

// Count tasks that are not completed
function countLefttasks() {
  document.getElementById("task-left").innerText = tasks.filter(
    (task) => task.completed === false
  ).length;
}

/************************************
 * RUN THE PROGRAM
 ************************************/

// Execute the program
function init() {
  list.innerHTML = "";
  tasks.forEach(addTaskToList);
  countLefttasks(tasks);
}

/**********************************
 * LISTEN FOR EVENTS
 **********************************/

// Listen to buttons being clicked
addBtn.addEventListener("click", addTask);
activeBtn.addEventListener("click", filterActiveTasks);
allBtn.addEventListener("click", removeFilters);
completedBtn.addEventListener("click", filterCompletedTasks);

init();