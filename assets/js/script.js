let taskId = 1;
const tasks = [
    { id: taskId++, text: "Task 1", completed: false },
    { id: taskId++, text: "Task 2", completed: false },
    { id: taskId++, text: "Task 3", completed: false },
];

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

function updateSummary() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task ${task.completed ? 'completed' : ''}`;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.className = "task-text";
        taskDiv.appendChild(taskText);

        if (task.completed) {
            const status = document.createElement("span");
            status.textContent = "(Realizado)";
            status.className = "status";
            taskDiv.appendChild(status);
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => {
            task.completed = !task.completed;
            updateTaskList();
            updateSummary();
        });
        taskDiv.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            const index = tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                tasks.splice(index, 1);
                updateTaskList();
                updateSummary();
            }
        });
        taskDiv.appendChild(deleteButton);

        taskList.appendChild(taskDiv);
    });

    updateSummary();
}

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ id: taskId++, text: taskText, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateSummary();
    }
});

updateTaskList();
updateSummary();
