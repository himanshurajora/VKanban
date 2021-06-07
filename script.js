// all lists and list-items together
var list_items = document.querySelectorAll('.list-item');
var lists = document.querySelectorAll('.list');
// all feature buttons
var erasebtn = document.getElementById("erase");
erasebtn.addEventListener("click", (e) => {
    erase();
});
// all three lists saprate
var todo = document.getElementById("todo");
var process = document.getElementById("process");
var done = document.getElementById("done");
// all three add button beside titles saprate
var todobtn = document.getElementById("todobtn");
var processbtn = document.getElementById("processbtn");
var donebtn = document.getElementById("donebtn");
//Add buttons click events
var adds = document.getElementsByClassName("add");
let draggedItem = null;
todobtn.addEventListener("click", (e) => {
    var div = document.createElement("div");
    div.innerHTML = '<div class="list-item card"> <div class="card-header"> <form action=""><input class="input" placeholder="Write and Press Enter"/></form> <div class="delete" style="position: absolute; right: 0;"></div></div></div>';
    todo.prepend(div);
});
//different arrays for storing kanban data
var todos = ["hello", "there", "what's", "up"];
var processes = ["hello", "there", "what's", "up"];
var dones = ["hello", "there", "what's", "up"];
const render = () => {
    //render to do list
    var all_todos = "";
    todos.forEach(val => {
        var element = getListItem(val);
        all_todos += element;
    });
    todo.innerHTML = all_todos;
    //render progress list
    var all_process = "";
    processes.forEach(val => {
        var element = getListItem(val);
        all_process += element;
    });
    process.innerHTML = all_process;
    var all_dones = "";
    dones.forEach(val => {
        var element = getListItem(val);
        all_dones += element;
    });
    done.innerHTML = all_dones;
    list_items = document.querySelectorAll('.list-item');
    lists = document.querySelectorAll('.list');
    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];
        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';
            }, 100);
        });
        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 100);
        });
    }
};
render();
for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    list.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
    list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });
    list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
    list.addEventListener('drop', function (e) {
        console.log('drop');
        this.prepend(draggedItem);
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
}
// Various Functions
function getListItem(val) {
    return '<div class="list-item card" draggable="true"> <div class="card-header"> <p>' + val + '</p><div class="delete" style="position: absolute; right: 0;"></div></div></div>';
}
// erases entire kanban
function erase() {
    todos = [];
    processes = [];
    dones = [];
    render();
}
