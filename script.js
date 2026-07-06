/* ==========================================================
   SCALEO PRODUCTION DASHBOARD
   SCRIPT.JS
   PART 1 / 3
========================================================== */

/*==========================================================
GLOBAL VARIABLES
==========================================================*/

const clientContainer = document.getElementById("clientContainer");
const newClientBtn = document.getElementById("newClient");

const reminders = document.getElementById("reminders");
const brain = document.getElementById("brain");

const globalProgress = document.getElementById("globalProgress");
const globalPercent = document.getElementById("globalPercent");

const totalClients = document.getElementById("totalClients");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const clientTemplate = document.getElementById("clientTemplate");
const taskTemplate = document.getElementById("taskTemplate");

let dashboard = {
    clients: [],
    reminders: "",
    brain: ""
};

/*==========================================================
START APP
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

    updateClock();

    setInterval(updateClock,1000);

    renderClients();

    updateStatistics();

    updateGlobalProgress();

});

/*==========================================================
CLOCK
==========================================================*/

function updateClock(){

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        });

    document.getElementById("date").textContent =
        now.toDateString();

}

/*==========================================================
LOCAL STORAGE
==========================================================*/

function saveDashboard(){

    dashboard.reminders = reminders.value;

    dashboard.brain = brain.value;

    localStorage.setItem(
        "scaleo-dashboard",
        JSON.stringify(dashboard)
    );

}

function loadDashboard(){

    const saved =
    localStorage.getItem("scaleo-dashboard");

    if(saved){

        dashboard = JSON.parse(saved);

    }

    reminders.value = dashboard.reminders || "";

    brain.value = dashboard.brain || "";

}

/*==========================================================
AUTO SAVE NOTES
==========================================================*/

reminders.addEventListener("input",saveDashboard);

brain.addEventListener("input",saveDashboard);

/*==========================================================
NEW CLIENT BUTTON
==========================================================*/

newClientBtn.addEventListener("click",()=>{

    addClient();

});

/*==========================================================
ADD CLIENT
==========================================================*/

function addClient(name="New Client"){

    dashboard.clients.push({

        id:Date.now(),

        name:name,

        tasks:[]

    });

    saveDashboard();

    renderClients();

}

/*==========================================================
DELETE CLIENT
==========================================================*/

function deleteClient(id){

    dashboard.clients =
    dashboard.clients.filter(

        client=>client.id!==id

    );

    saveDashboard();

    renderClients();

}

/*==========================================================
RENDER CLIENTS
==========================================================*/

function renderClients(){

    clientContainer.innerHTML="";

    dashboard.clients.forEach(client=>{

        const clone =
        clientTemplate.content.cloneNode(true);

        const card =
        clone.querySelector(".client");

        card.dataset.id=client.id;

        const clientName =
        clone.querySelector(".client-name");

        clientName.value=client.name;

        clientName.addEventListener("input",e=>{

            client.name=e.target.value;

            saveDashboard();

        });

        const deleteBtn =
        clone.querySelector(".delete-client");

        deleteBtn.addEventListener("click",()=>{

            if(confirm(
                "Delete this client?"
            )){

                deleteClient(client.id);

            }

        });

        const taskButton =
        clone.querySelector(".task-btn");

        taskButton.addEventListener("click",()=>{

            addTask(client.id);

        });

        const taskArea =
        clone.querySelector(".tasks");

        client.tasks.forEach(task=>{

            const taskClone =
            createTask(task,client);

            taskArea.appendChild(taskClone);

        });

        updateClientProgress(
            card,
            client
        );

        clientContainer.appendChild(clone);

    });

    updateStatistics();

    updateGlobalProgress();

}

/*==========================================================
CREATE TASK ELEMENT
==========================================================*/

function createTask(task,client){

    const clone =
    taskTemplate.content.cloneNode(true);

    const row =
    clone.querySelector(".task");

    row.dataset.id=task.id;

    const checkbox =
    clone.querySelector(
        'input[type="checkbox"]'
    );

    checkbox.checked=task.completed;

    const input =
    clone.querySelector(".task-input");

    input.value=task.text;

    if(task.completed){

        row.classList.add("completed");

    }

    checkbox.addEventListener("change",()=>{

        task.completed=
        checkbox.checked;

        row.classList.toggle(
            "completed",
            checkbox.checked
        );

        saveDashboard();

        updateStatistics();

        renderClients();

    });

    input.addEventListener("input",()=>{

        task.text=input.value;

        saveDashboard();

    });

    const deleteTaskButton =
    clone.querySelector(".delete-task");

    deleteTaskButton.addEventListener("click",()=>{

        deleteTask(client.id,task.id);

    });

    return clone;

}

/*==========================================================
PLACEHOLDERS
(PART 2 WILL COMPLETE THEM)
==========================================================*/

function addTask(clientId){

    console.log("Part 2");

}

function deleteTask(clientId,taskId){

    console.log("Part 2");

}

function updateClientProgress(card,client){

    console.log("Part 2");

}

function updateStatistics(){

    console.log("Part 2");

}

function updateGlobalProgress(){

    console.log("Part 2");

}
