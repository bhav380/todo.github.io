var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');




function addTaskToDom(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        
             <input type="checkbox" id= "${task.id}" ${task.done ? "checked":""} class="custom-checkbox">
             <label for="${task.id}">${task.text}</label>
        
             <i class="fa-solid fa-trash-can" data-id="${task.id}"></i>

    
    `;

    taskList.append(li);
}

function renderList() {

    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerText = tasks.length;


}

function toggleTask(taskId) {

    const tmpTask = tasks.filter(function(task) {
        return task.id == taskId;
    });

    if (tmpTask.length > 0) {
        const currentTask = tmpTask[0];

        currentTask.done = !currentTask.done;


        renderList();

        showNotification("Task Toggled successfully");
        return;
    }

    showNotification("TAsk could not be toggled");
}

function deleteTask(taskId) {

    const newTask = tasks.filter(function(task) {
        return task.id != taskId;
    });

    tasks = newTask;

    showNotification("Task deleted Successfully");
    renderList();
}

function addTask(task) {
    if (task) {
        tasks.push(task);

        showNotification('Task added successfully');
        renderList();
        return;
    }
    showNotification('Task cannot be added');
}

function showNotification(text) {
    alert(text);

}


function handleInputKeyPress(e) {
    if (e.key == 'Enter') {
        const text = e.target.value;

        if (!text) {
            showNotification("task text cannot be empty...");
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false,
        }

        e.target.value = "";
        addTask(task);

    }
}


function handleClickListener(e) {
    const target = e.target;

    if (target.className == 'fa-solid fa-trash-can') {
        const taskId = target.dataset.id;

        deleteTask(taskId);
        return;


    } else if (target.className == 'custom-checkbox') {

        const taskId = target.id;


        toggleTask(taskId);
        return;


    }
}



function initializeApp() {


    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickListener);


}

initializeApp();