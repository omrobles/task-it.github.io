let taskTitle = document.getElementById("task"),
    taskDescription = document.getElementById("description"),
    taskResponsible = document.getElementById("responsible"),
    createButton = document.getElementById("createButton"),
    updateButton = document.getElementById("updateButton"),
    h2Message = document.querySelector('h2'),
    list = document.getElementById("listaTareas");
let tasks=[];

// función para crear nuevas tareas
createButton.addEventListener("click",function(){
    if(taskTitle.value == '' || taskDescription.value == '' || taskResponsible.value == ''){
        alert('Para crear una tarea es necesario llenar todos los campos.');
        taskTitle.select();
    } else {
        tasks.push({
            task: taskTitle.value,
            description: taskDescription.value,
            responsible: taskResponsible.value
        });
        storeData();
        readData();
        clearValues();
        taskTitle.select();
    }
});

// función para actualizar información
updateButton.addEventListener('click', function(){
    tasks[liIndex] = {
        task: taskTitle.value,
        description: taskDescription.value,
        responsible: taskResponsible.value
    };
    storeData();
    readData();
    clearValues();
    taskTitle.select();
});

// función para limpiar campos
function clearValues(){
    taskTitle.value = '';
    taskDescription.value = '';
    taskResponsible.value = '';
}

// función para guerdar en localStorage
function storeData(){
    localStorage.setItem('tasksList', JSON.stringify(tasks));
}

// función para desplegar las tareas guardadas
function readData (){
    tasks = JSON.parse(localStorage.getItem('tasksList'));
    list.innerHTML = "<ul></ul>"
    tasks.forEach((task) => {
        list.appendChild(insertLi(task));
    });
}

// función para crear los elementos li
function insertLi(task) {
    // Crear los elementos del li
    let liNew = document.createElement('li'),
        divTaskTitle = document.createElement('div'),
        divTaskDescription = document.createElement('div'),
        divResponsible = document.createElement('div'), 
        editIcon = document.createElement('ion-icon'),
        removeIcon = document.createElement('ion-icon');
        
        // Agrega el contenido de los valores del localStorage
        divTaskTitle.innerText = task['task'];
        divTaskDescription.innerText = task['description'];
        divResponsible.innerText = task['responsible'];

        // Funcionamiento icono edit
        editIcon.setAttribute('name', 'create-outline');
        editIcon.addEventListener('click', function (){
            liIndex = tasks.indexOf(task);
            taskTitle.value = tasks[liIndex].task;
            taskDescription.value = tasks[liIndex].description;
            taskResponsible.value = tasks[liIndex].responsible;
            createButton.setAttribute('class', 'hide');
            updateButton.setAttribute('class', 'show');
        });

        // Funcionamiento icono eliminar
        removeIcon.setAttribute('name', 'trash-outline');
        removeIcon.addEventListener('click', function (){
            liIndex = tasks.indexOf(task);
            tasks.splice(liIndex,1);
            storeData();
            readData();
        });

        liNew.appendChild(divTaskTitle);
        liNew.appendChild(divTaskDescription);
        liNew.appendChild(divResponsible);
        liNew.appendChild(removeIcon);
        liNew.appendChild(editIcon);
        return liNew;
};




