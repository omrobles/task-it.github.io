// Declaración de elementos y variables
let taskTitle = document.getElementById("task"),
    taskDescription = document.getElementById("description"),
    taskResponsible = document.getElementById("responsible"),
    createButton = document.getElementById("createButton"),
    updateButton = document.getElementById("updateButton"),
    errorMessage = document.getElementById("container1"),
    createMessage = document.getElementById("container4"),
    updateMessage = document.getElementById("container5"),
    removeMessage = document.getElementById("container6"),
    removeQuestion = document.getElementById("container7"),
    container = document.getElementById("main-container"),
    checkbox = document.getElementById("checkbox"),
    accept = document.getElementById("accept"),
    cancel = document.getElementById("cancel"),
    prevScrollpos = window.pageYOffset,
    list = document.getElementById("listaTareas");
let tasks=[],
    tasksOpen=[];

// Primera lectura de datos del LocalStorage
readData();

// función para crear nuevas tareas
createButton.addEventListener("click",function(){
    if(taskTitle.value == '' || taskDescription.value == '' || taskResponsible.value == ''){
        errorPrompt();
        taskTitle.select();
    } else {
        taskPush()
        storeData();
        readData();
        clearValues();
        createPrompt();
        taskTitle.select();
    }
});

// función para actualizar información
updateButton.addEventListener('click', function(){
    tasks[liIndex] = {
        task: taskTitle.value,
        description: taskDescription.value,
        responsible: taskResponsible.value,
        check: false
    };
    storeData();
    readData();
    clearValues();
    updatePrompt();
    createButton.setAttribute('class', 'show');
    updateButton.setAttribute('class', 'hide');
    taskTitle.select();
});

// función para seleccionar completados
checkbox.addEventListener('click',function(){
    tasksOpen = [];
    tasks.forEach(task => {
        if(task['check'] === false){
            tasksOpen.push(task);
        }
    });
    readData();
});

// funcion ocultar forma
window.addEventListener('scroll',function(){
    let currentScrollPos = window.pageYOffset;
   	if (prevScrollpos > currentScrollPos) {
            container.setAttribute('style', 'top: 70px;');
  		} else {
            container.setAttribute('style', 'top: -300px;');
  		}
  		prevScrollpos = currentScrollPos;
});

// Funcion para confirmar eliminar elemento
accept.addEventListener('click',function(){
    tasks.splice(liIndex,1);
    removePrompt();
    storeData();
    readData();
    removeQuestion.setAttribute('class', 'hide');
});

// funcion cancelar eliminar
cancel.addEventListener('click', function(){
    removeQuestion.setAttribute('class', 'hide');
});

// Funcion para empujar datos al array tasks
function taskPush(){
    tasks.push({
        task: taskTitle.value,
        description: taskDescription.value,
        responsible: taskResponsible.value,
        check: false
    });
};

// función para guardar en localStorage
function storeData(){
    localStorage.setItem('tasksList', JSON.stringify(tasks));
}

// función para desplegar las tareas guardadas
function readData (tasksArray){
    tasks = JSON.parse(localStorage.getItem('tasksList'));
    list.innerHTML = "<ul></ul>"
    if(tasks.length != 0){
        if(checkbox.checked === true){
            tasksOpen.forEach((task) => {
                list.appendChild(insertLi(task));
                });
        } else {
            tasks.forEach((task) => {
                list.appendChild(insertLi(task));
                });
        }
    } else{
        const message1 = document.createElement('li');
        message1.innerText = 'No existen tareas';
        list.appendChild(message1);
    }
};

// función para limpiar campos
function clearValues(){
    taskTitle.value = '';
    taskDescription.value = '';
    taskResponsible.value = '';
}

// función para crear los elementos li
function insertLi(task) {
    let liNew = document.createElement('li');    
    if((tasks.indexOf(task) + 1) % 2 === 1 || (tasksOpen.indexOf(task) + 1) % 2 === 1){
        liNew.setAttribute('style','background-color: #b6daf2;')
    }
    liNew.appendChild(taskTitleCreate(task));
    liNew.appendChild(divIconsCreate(task));
    liNew.appendChild(taskDescCreate(task));
    liNew.appendChild(divRespCreate(task));
    return liNew;
};

// Función para desplegar mensaje de error
function errorPrompt(){
    errorMessage.setAttribute('class','show');
    createMessage.setAttribute('class','hide');
    updateMessage.setAttribute('class','hide');
    removeMessage.setAttribute('class','hide');
    hidePrompt();
};

// Función para desplegar mensaje de creacion
function createPrompt(){
    errorMessage.setAttribute('class','hide');
    createMessage.setAttribute('class','show');
    updateMessage.setAttribute('class','hide');
    removeMessage.setAttribute('class','hide');
    hidePrompt();
};

// Función para desplegar mensaje de actualizacion
function updatePrompt(){
    errorMessage.setAttribute('class','hide');
    createMessage.setAttribute('class','hide');
    updateMessage.setAttribute('class','show');
    removeMessage.setAttribute('class','hide');
    hidePrompt();
};

// Función para desplegar mensaje de eliminar
function removePrompt(){
    errorMessage.setAttribute('class','hide');
    createMessage.setAttribute('class','hide');
    updateMessage.setAttribute('class','hide');
    removeMessage.setAttribute('class','show');
    removeQuestion.setAttribute('class', 'hide');
    hidePrompt();
};

function hidePrompt(){
    setTimeout(() => {
        errorMessage.setAttribute('class','hide');
        createMessage.setAttribute('class','hide');
        updateMessage.setAttribute('class','hide');
        removeMessage.setAttribute('class','hide'); 
    }, 1500);
}

// función crea titulo del li
function taskTitleCreate(task){
    let divTaskTitle = document.createElement('div');
    checkStatus = task['check'];
    checkStatus === true ? divTaskTitle.innerText = task['task'] + ' - Completado' : divTaskTitle.innerText = task['task'];
    return divTaskTitle;
}

// función crea div de iconos
function divIconsCreate(task){
    let divIcons = document.createElement('div');
    divIcons.appendChild(checkIconCreate(task));
    divIcons.appendChild(editIconCreate(task));
    divIcons.appendChild(copyIconCreate(task));
    divIcons.appendChild(removeIconCreate(task));
    return divIcons;
}

// función crea descripcion del li
function taskDescCreate(task){
    let divTaskDescription = document.createElement('div');
    divTaskDescription.innerText = task['description'];
    return divTaskDescription;
}

// función crea responsable del li
function divRespCreate(task){
    let divResponsible = document.createElement('div');
    divResponsible.innerText = task['responsible'];
    return divResponsible;
}

function checkIconCreate(task){
    let checkIcon = document.createElement('ion-icon'); 
    checkIcon.setAttribute('name', 'checkmark-outline');
    checkStatus = task['check'];
    checkStatus === true ? checkIcon.setAttribute('class', 'checked') : checkIcon.setAttribute('class', 'noCheck');
    checkIcon.addEventListener('click', function (){
        checkIcon.setAttribute('class', 'checked');
        liIndex = tasks.indexOf(task);
        tasks[liIndex] = {
            task: task['task'],
            description: task['description'],
            responsible: task['responsible'],
            check: true
        };
        storeData();
        readData();
    });
    return checkIcon;
}

function editIconCreate(task){
    let editIcon = document.createElement('ion-icon');
    editIcon.setAttribute('name', 'create-outline');
    editIcon.setAttribute('class', 'editIcon');
    if (checkStatus === true) {editIcon.setAttribute('class', 'hide')};
    editIcon.addEventListener('click', function (){
        liIndex = tasks.indexOf(task);
        taskTitle.value = tasks[liIndex].task;
        taskDescription.value = tasks[liIndex].description;
        taskResponsible.value = tasks[liIndex].responsible;
        createButton.setAttribute('class', 'hide');
        updateButton.setAttribute('class', 'show');
        container.setAttribute('style', 'top: 70px;');
    });
    return editIcon;
}

function copyIconCreate(task){
    let copyIcon = document.createElement('ion-icon');
    copyIcon.setAttribute('name', 'copy-outline');
    copyIcon.setAttribute('class', 'copyIcon');
    copyIcon.addEventListener('click', function (){
        liIndex = tasks.indexOf(task);
        taskTitle.value = tasks[liIndex].task;
        taskDescription.value = tasks[liIndex].description;
        taskResponsible.value = tasks[liIndex].responsible;
        container.setAttribute('style', 'top: 70px;');
    });
    return copyIcon;
}

function removeIconCreate(task){
    let removeIcon = document.createElement('ion-icon');
    removeIcon.setAttribute('name', 'trash-outline');
    removeIcon.setAttribute('class', 'removeIcon');
    removeIcon.addEventListener('click', function (){
        liIndex = tasks.indexOf(task);
        container.setAttribute('style', 'top: 70px;');
        removeQuestion.setAttribute('class', 'show'); 
         });
        

    return removeIcon;
}
    



