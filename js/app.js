let taskTitle = document.getElementById("task");
let taskDescription = document.getElementById("description");
let taskResponsible = document.getElementById("responsible");
let createButton = document.getElementById("button");
let list = document.getElementById("listaTareas");
let tasks=[];

createButton.addEventListener("click",function(){
    tasks.push({
        task: taskTitle.value,
        description: taskDescription.value,
        responsible: taskResponsible.value
    })
    storeData();
    readData();
});

function storeData(){
    localStorage.setItem('tasksList', JSON.stringify(tasks));
}

function readData (){
    tasks = JSON.parse(localStorage.getItem('tasksList'));
    list.innerHTML = "<ul></ul>"
    tasks.forEach(task => {
        list.innerHTML += '<li><div >' + task['task'] + '<br>' + task['description'] + '</div><div>' + task['responsible'] + '</div><div class="icon"><ion-icon name="create-outline"></ion-icon><ion-icon name="trash-outline"></ion-icon></div></li>'; 
    });
}