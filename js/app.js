// Declaración de elementos
let taskTitle = document.getElementById("task"),
    taskDescription = document.getElementById("description"),
    taskResponsible = document.getElementById("responsible"),
    createButton = document.getElementById("createButton"),
    updateButton = document.getElementById("updateButton"),
    h2Message = document.querySelector('h2'),
    errorMessage = document.getElementById("errorMessage"),
    form = document.getElementById("form"),
    prevScrollpos = window.pageYOffset,
    list = document.getElementById("listaTareas");
let tasks=[];

// Primera lectura de datos del LocalStorage
readData();

// función para crear nuevas tareas
createButton.addEventListener("click",function(){
    if(taskTitle.value == '' || taskDescription.value == '' || taskResponsible.value == ''){
       error();
        taskTitle.select();
    } else {
        errorMessage.setAttribute('class','hide');
        taskPush()
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
    createButton.setAttribute('class', 'show');
    updateButton.setAttribute('class', 'hide');
    taskTitle.select();
});

// funcion ocultar forma
window.addEventListener('scroll',function(){
    let currentScrollPos = window.pageYOffset;
   	if (prevScrollpos > currentScrollPos) {
        form.setAttribute('style', 'top: 70px;');
  	 	//  form.setAttribute('style', 'top: ' + currentScrollPos + 'px;');
  		} else {
  	 	 form.setAttribute('style', 'top: -300px;');
  		}
  		prevScrollpos = currentScrollPos;
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
function readData (){
    tasks = JSON.parse(localStorage.getItem('tasksList'));
    list.innerHTML = "<ul></ul>"
    if(tasks.length != 0){
        tasks.forEach((task) => {
        list.appendChild(insertLi(task));
        });
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
    // Crear los elementos del li
    let liNew = document.createElement('li'),
        divTaskTitle = document.createElement('div'),
        divIcons = document.createElement('div'),
        divTaskDescription = document.createElement('div'),
        divResponsible = document.createElement('div'),
        checkIcon = document.createElement('ion-icon'), 
        editIcon = document.createElement('ion-icon'),
        copyIcon = document.createElement('ion-icon'),
        removeIcon = document.createElement('ion-icon');
        
        // Agrega el contenido de los valores del localStorage
        divTaskTitle.innerText = task['task'];
        divTaskDescription.innerText = task['description'];
        divResponsible.innerText = task['responsible'];

        // Funcionamiento icono check
        checkIcon.setAttribute('name', 'checkmark-outline');
        checkIcon.setAttribute('class', 'noCheck');
        checkIcon.addEventListener('click', function (){
            liIndex = tasks.indexOf(task);
            checkIcon.setAttribute('class', 'checked');
            console.log('estas presionanso el check')
        });

        // Funcionamiento icono edit
        editIcon.setAttribute('name', 'create-outline');
        editIcon.setAttribute('class', 'editIcon');
        editIcon.addEventListener('click', function (){
            liIndex = tasks.indexOf(task);
            taskTitle.value = tasks[liIndex].task;
            taskDescription.value = tasks[liIndex].description;
            taskResponsible.value = tasks[liIndex].responsible;
            createButton.setAttribute('class', 'hide');
            updateButton.setAttribute('class', 'show');
            form.setAttribute('style', 'top: 70px;');
        });

        // Funcionamiento icono copy
        copyIcon.setAttribute('name', 'copy-outline');
        copyIcon.setAttribute('class', 'copyIcon');
        copyIcon.addEventListener('click', function (){
            liIndex = tasks.indexOf(task);
            taskTitle.value = tasks[liIndex].task;
            taskDescription.value = tasks[liIndex].description;
            taskResponsible.value = tasks[liIndex].responsible;
            form.setAttribute('style', 'top: 70px;');
        });

        // Funcionamiento icono eliminar
        removeIcon.setAttribute('name', 'trash-outline');
        removeIcon.setAttribute('class', 'removeIcon');
        removeIcon.addEventListener('click', function (){
            liIndex = tasks.indexOf(task);
            tasks.splice(liIndex,1);
            storeData();
            readData();
        });

        divIcons.appendChild(checkIcon);
        divIcons.appendChild(editIcon);
        divIcons.appendChild(copyIcon);
        divIcons.appendChild(removeIcon);

        liNew.appendChild(divTaskTitle);
        liNew.appendChild(divIcons);
        liNew.appendChild(divTaskDescription);
        liNew.appendChild(divResponsible);
        return liNew;
};

// Función para desplegar mensaje de error
function error(){
    errorMessage.setAttribute('class','show');
};




