document.addEventListener("DOMContentLoaded", (event) => {
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
        tasks = [
            { text: "First Task", completed: false },
            { text: "Second Task", completed: false },
            { text: "Third Task", completed: false },
        ];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks();

    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        taskInput.value = "";
    }

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
    <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
    <div class="right-controls">
      <input class="checkbox" type="checkbox" ${task.completed ? "checked" : ""}>
      <span class="edit-task">✎</span>
      <span class="delete-task">x</span>
    </div>
  `;

            taskList.appendChild(listItem);

            const checkbox = listItem.querySelector(".checkbox");
            checkbox.addEventListener("change", () => {
                toggleTaskCompletion(index);
            });

            const deleteTaskButton = listItem.querySelector(".delete-task");
            deleteTaskButton.addEventListener("click", () => {
                deleteTask(index);
            });

            const editTaskButton = listItem.querySelector(".edit-task");
            editTaskButton.addEventListener("click", () => {
                editTask(index, listItem);
            });
        });
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function editTask(index, listItem) {
        const taskTextSpan = listItem.querySelector(".task-text");
        const originalTaskText = taskTextSpan.textContent;

        const newTaskText = prompt("Edit task:", originalTaskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            tasks[index].text = newTaskText.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }
});