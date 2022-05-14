const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("add-task-button");
const taskList = document.querySelector("#task-list");

function saveListToLocal() {
  const taskListArray = [];
  const liArray = Array.from(taskList.children);

  liArray.forEach((li) => {
    let item = {};
    item.name = li.children[0].children[0].innerText;
    item.checked = li.classList.contains("checked");
    taskListArray.push(item);
  });
  localStorage.setItem("tasks", JSON.stringify(taskListArray));
}

function createTask(taskName, taskChecked = false) {
  //create li
  const newTask = document.createElement("li");
  if (taskChecked) {
    newTask.classList.add("checked");
  }

  //create container
  const newDiv = document.createElement("div");
  newDiv.classList.add("container");

  //create lbl
  const newLbl = document.createElement("label");
  newLbl.classList.add("task");
  // newLbl.innerText = taskName;

  //create input
  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  // newCheckbox.classList.add("checkbox");
  newCheckbox.checked = taskChecked;
  // newCheckbox.name = taskName;
  newCheckbox.addEventListener("click", (ev) => {
    const targetElement = ev.target;
    const liToChecked = targetElement.closest("li");
    liToChecked.classList.toggle("checked");
    saveListToLocal();
  });

  //create span
  const newSpan = document.createElement("span");
  newSpan.classList.add("task__span");
  // newSpan.classList.add("task");
  newSpan.innerText = taskName;

  //create button
  const newButton = document.createElement("button");
  newButton.classList.add("task__delete");
  // newButton.innerText = 'x';
  newButton.addEventListener("click", (ev) => {
    const targetElement = ev.target;
    const liToDelete = targetElement.closest("li");

    liToDelete.style.opacity = "0";
    liToDelete.style.transform = "translate(30px) scale(1, 0.01)";

    setTimeout(() => {
      liToDelete.style.display = "none";
      liToDelete.remove();
      saveListToLocal();
    }, 300);
  });

  //assemble task
  newLbl.appendChild(newCheckbox);
  newLbl.appendChild(newSpan);
  newDiv.appendChild(newLbl);
  newDiv.appendChild(newButton);
  newTask.appendChild(newDiv);
  taskList.appendChild(newTask);
}

btnAdd.addEventListener("click", (ev) => {
  if (inputTask.value) {
    ev.preventDefault();

    createTask(inputTask.value);

    inputTask.value = "";
    saveListToLocal();
  }
});

function restoreListFromLocal() {
  let taskListArray = JSON.parse(localStorage.getItem("tasks")) || [];
  taskListArray.forEach((item) => {
    createTask(item.name, item.checked);
  });
}

restoreListFromLocal();

// taskList.innerHTML = localStorage.getItem('tasks') || '';
