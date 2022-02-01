
alert("estoy coneectado")
let taskTitle = document.getElementById("task");
let taskDescription = document.getElementById("description");
let taskResponsible = document.getElementById("responsible");
let createButton = document.getElementById("button");
let tasks=[];

button.addEventListener("click",function(){
    tasks.push({
        task: taskTitle.value,
        description: taskDescription.value,
        responsible: taskResponsible.value
    })
    console.log(tasks)
    localStorage.setItem('tasksList', JSON.stringify(tasks));
});
