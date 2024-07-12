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

function editTask(id){
    const taskIndex = taskArray.findIndex(task => task.id === id);
    if(taskIndex!== -1){
        const taskElement = document.getElementById(id).closest('li');
        const taskLabel = document.querySelector('label');
        const originalLabel = taskLabel.textContent;

        taskElement.innerHTML = `
        <button onclick="saveEdit(${id})">Salvar</button>
        <input type="text" id="edit-${id}" value="${originalLabel}" class="edit-input">
        <button onclick="cancelEdit()">Cancelar</button>
        `;
    }
}

function saveEdit(id){
    const editInput = document.getElementById(`edit-${id}`);
    const newLabel = editInput.value.trim();

    if(newLabel !== '' ){

        taskArray = taskArray.map(task=>{
            if(task.id === id){
                task.title = newLabel;
            }
            return task;

        });

        loadTasks();

    } else{
        createErrorAlert();
    }

}

function createErrorAlert(){
    alert("Você não pode salvar uma tarefa vazia!");
}

function cancelEdit(){
    //It will also generates a toast
    loadTasks();
}

function deleteTask(id) {
    taskArray = taskArray.filter(task => task.id !== id);
    loadTasks();
}

function deleteAllCompleted(){
    taskArray = taskArray.filter(task=> !task.completed);
    loadTasks();
}

function loadTasks(){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    taskArray.forEach(task =>{
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
        <input
            type="checkbox"
            title="Marcar como concluída"
            id="${task.id}"
            onclick="toggleTask(${task.id})"
            class="toggleTask-button"
            ${task.completed ? 'checked' : ''}
        >
        <label from="${task.id}">${task.title}</label>

        <div class="button-container">

        <button 
        class="editButton"
        onclick="editTask(${task.id})">
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        x="0px" 
        y="0px" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
        >
            <path
            fill="#B5BAC1"
            d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875
             6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625
              2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z">
            </path>
        </svg>
        </button>
        <button
        class="deleteButton deleteTask-button"
        onclick="deleteTask(${task.id})"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 50 59"
                class="bin"
            >
                <path
                fill="#B5BAC1"
                d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                ></path>
                <path
                fill="#B5BAC1"
                d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                ></path>
                <path
                fill="#B5BAC1"
                d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
                ></path>
                <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
            </svg>

            <span class="tooltip">Excluir</span>
        </button>

        </div>
        `;
        taskItem.classList.add('task-item')
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