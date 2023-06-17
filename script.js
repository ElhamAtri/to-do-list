/* --------------- Dynamic Greetings  --------------------- */
let greetings = document.querySelector("#greetings");

let liveTime = new Date().getHours();
let greeting = liveTime >= 5 && liveTime < 12 ? "Good Morning<3" : 
liveTime >= 12 && liveTime < 18 ? "Good Afternoon<3" :
liveTime >= 18 && liveTime < 21 ? "Good Evening<3" : "Good Night<3";

greetings.innerHTML = greeting;
/* --------------- End Dynamic Greetings  --------------------- */
/* --------------- Date Time  --------------------- */

/* --------------- End Date Time  --------------------- */

/* --------------- To Do Web App  --------------------- */

/*  Create Vars   */
const newTaskInput = document.querySelector("#create_task input");
const tasksDiv = document.querySelector("#todo_list");
const deleteAll = document.querySelector("#delete_all");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

/*  When Window Load  */
window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

/* Display To-do List   */
const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

/* Display Delete All Button   */
  if (Object.keys(localStorage).length > 1) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }

  /*  Clear To-do List   */
  tasksDiv.innerHTML = "";

  /*  Fetch Keys in local storage   */
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";

    /*  Get All Values   */  
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task_list");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
    let editButton = document.createElement("button");
    editButton.classList.add("edit_task");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    if (!JSON.parse(value)) {
      editButton.style.visibility = "visible";
    } else {
      editButton.style.visibility = "hidden";
      taskInnerDiv.classList.add("task_completed");
    }
    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class="delete_task"><i class="fa-solid fa-trash"></i></button>`;
    tasksDiv.appendChild(taskInnerDiv);
  }

  /*  Task Completed   */
  tasks = document.querySelectorAll(".task_list");
  tasks.forEach((element, index) => {
    element.onclick = () => {
      if (element.classList.contains("task_completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });

  /*  Edit Task   */
  editTasks = document.getElementsByClassName("edit_task");
  Array.from(editTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      disableButtons(true);
      let parent = element.parentElement;
      newTaskInput.value = parent.querySelector("#taskname").innerText;
      updateNote = parent.id;
      parent.remove();
    });
  });
  
  /*  Delete Task  */
  deleteTasks = document.getElementsByClassName("delete_task");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      let parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

/*  Disable Edit Button   */
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit_task");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

/*  Delete Task From Local Storage   */
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

/*  Delete All From Local Storage   */
document.querySelector("#delete_all").addEventListener("click", () => {
  localStorage.clear();
  displayTasks();
});  

/*  Add Task To Local Storage   */
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

/*  Add New Task   */
document.querySelector("#add_task").addEventListener("click", () => {
  disableButtons(false);
  if (newTaskInput.value.length == 0) {
    alert("Please Add A Task");
  } else {
    if (updateNote == "") {
      updateStorage(count, newTaskInput.value, false);
    } else {
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }
});  

/* --------------- End To Do Web App  --------------------- */