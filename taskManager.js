let taskArray = [];

function addTask(){
    const taskTitle = document.getElementById('taskTitle-input').value.trim();
    if (taskTitle !== ''){
        taskArray.push({id:Date.now(), title: taskTitle, completed: false});
        loadTasks();
        document.getElementById('taskTitle-input').value='';
    }
}

function toggleTask(id){
    taskArray = taskArray.map(task=>{
        if (task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });
    loadTasks();
}

function deleteTask(id) {
    taskArray = taskArray.filter(task => task.id !== id);
    loadTasks();
  }

function loadTasks(){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    taskArray.forEach(task =>{
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
        <input type="checkbox" id="${task.id}" onclick="toggleTask(${task.id})">
        <label>${task.title}</label>
        <button onclick="deleteTask(${task.id})"> X </button>
        `;
        if(task.completed){
            taskItem.classList.add('task-completed');
        }
        taskList.appendChild(taskItem);
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('taskTitle-input').addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            addTask();
        }
    });
});