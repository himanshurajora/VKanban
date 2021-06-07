
interface Data{
	kanban_todo : String[]
	kanban_processes: String[]
	kanban_dones: String[]
}

// all lists and list-items together
var list_items: NodeList;
var lists = document.querySelectorAll('.list');
var deletes: NodeList;

//different arrays for storing kanban data
var todos: String[] = [];
var processes: String[] = [];
var dones: String[] = [];
// load already stored data in arrays if available
load();

// all feature buttons
var erasebtn: HTMLElement = document.getElementById("erase");
erasebtn.addEventListener("click", (e) => {
	erase();
})
// all three lists saprate
var todo: HTMLElement = document.getElementById("todo");
var process: HTMLElement = document.getElementById("process");
var done: HTMLElement = document.getElementById("done");

// all three add button beside titles saprate
var todobtn: HTMLElement = document.getElementById("todobtn");
var processbtn: HTMLElement = document.getElementById("processbtn");
var donebtn: HTMLElement = document.getElementById("donebtn");

//Add buttons click events
var adds = document.getElementsByClassName("add");

// currently dragged item
let draggedItem: Node = null;
let draggedItemValue: string;
todobtn.addEventListener("click", (e) => {
	if (document.getElementsByTagName("form").length < 1) {
		var div = document.createElement("div");
		div.innerHTML = '<div class="list-item card"> <div class="card-header"> <form action=""><input class="input" placeholder="Press Enter to Add or Esc to Cancel"/></form></div></div>'
		div.autofocus = true;
		todo.prepend(div)
		document.getElementsByTagName("form")[0].addEventListener("submit", (e: KeyboardEvent) => {
			e.preventDefault();
			var value: string = (document.getElementsByTagName("input")[0].value).trim();
			if (value) {
				todo.removeChild(document.getElementsByTagName("input")[0].parentElement.parentElement.parentElement.parentElement);
				var element: HTMLElement = document.createElement("div");
				todos.unshift(value);
				store();
				render();
			}
			else{
				todo.removeChild(document.getElementsByTagName("input")[0].parentElement.parentElement.parentElement.parentElement);
			}
		})
	}
})

const render = () => {
	//render to do list
	var all_todos: string = "";
	todos.forEach(val => {
		var element: String = getListItem(val);
		all_todos += element;
	})
	todo.innerHTML = all_todos;

	//render progress list
	var all_process: string = "";
	processes.forEach(val => {
		var element: String = getListItem(val);
		all_process += element;
	})
	process.innerHTML = all_process;

	var all_dones: string = "";
	dones.forEach((val, index) => {
		var element: String = getListItem(val);
		all_dones += element;
	})
	done.innerHTML = all_dones;

	list_items = document.querySelectorAll('.list-item');
	deletes = document.querySelectorAll('.delete');

	deletes.forEach((item) => {
		item.addEventListener("click", (e) => {
			console.log(e.target);
			var parent = (e.target as HTMLElement).parentElement.parentElement.parentElement.id;
			var item = (e.target as HTMLElement).parentElement.firstElementChild.innerHTML;
			if (parent == "todo") {
				todos.splice(todos.indexOf(item), 1);
			}
			else if (parent == "process") {
				processes.splice(processes.indexOf(item), 1);
			}
			else if (parent == "done") {
				dones.splice(dones.indexOf(item), 1);
			}

			(e.target as HTMLElement).parentElement.parentElement.parentElement.removeChild((e.target as HTMLElement).parentElement.parentElement)
			store()
		})
	})

	console.log(deletes);
	for (let i = 0; i < list_items.length; i++) {
		const item: Node = list_items[i];

		item.addEventListener('dragstart', function () {
			draggedItem = item;
			draggedItemValue = (item as HTMLElement).firstElementChild.firstElementChild.innerHTML;
			setTimeout(function () {
				(item as HTMLElement).style.display = 'none';
			}, 100)
		});

		item.addEventListener('dragend', function () {
			setTimeout(function () {
				(draggedItem as HTMLElement).style.display = 'block';
				draggedItem = null;
			}, 100);
		})
	}

	for (let i = 0; i < list_items.length; i++) {
		const item: Node = list_items[i];

		item.addEventListener('dragstart', function () {
			draggedItem = item;
			setTimeout(function () {
				(item as HTMLElement).style.display = 'none';
			}, 100)
		});

		item.addEventListener('dragend', function () {
			setTimeout(function () {
				try {
					(draggedItem as HTMLElement).style.display = 'block';
				} catch (error) {
					//passs
				}
				draggedItem = null;
			}, 100);
		})
	}

}

render();


// Drag events for list-item container called list

for (let j = 0; j < lists.length; j++) {
	const list: Node = lists[j];

	list.addEventListener('dragover', function (e) {
		e.preventDefault();
	});

	list.addEventListener('dragenter', function (e) {
		e.preventDefault();
		this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
	});

	list.addEventListener('dragleave', function (e) {
		this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	});

	list.addEventListener('drop', function (e) {
		var parent = draggedItem.parentElement.id;
		console.log();
		var item = (draggedItem as HTMLElement).firstElementChild.firstElementChild.innerHTML
		if (parent == "todo") {
			todos.splice(todos.indexOf(item), 1);
		}
		else if (parent == "process") {
			processes.splice(processes.indexOf(item), 1);
		}
		else if (parent == "done") {
			dones.splice(dones.indexOf(item), 1);
		}

		this.prepend(draggedItem);

		if (this.id == "todo") {
			todos.unshift(item)
		}
		else if (this.id == "process") {
			processes.unshift(item)
		}
		else if (this.id == "done") {
			dones.unshift(item)
		}

		store()

		this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	});
}


// Various Functions

function getListItem(val: String): String {
	return '<div class="list-item card" draggable="true"> <div class="card-header"> <p>' + val + '</p><div class="delete" style="position: absolute; right: 0;"></div></div></div>';
}
// erases entire kanban
function erase() {
	todos = []
	processes = []
	dones = []
	store()
	render()
}

function store(){
	chrome.storage.local.set({ kanban_todo: todos });
	chrome.storage.local.set({ kanban_processes: processes });
	chrome.storage.local.set({ kanban_dones: dones });
}


function load(){
	chrome.storage.local.get(['kanban_todo', 'kanban_processes', 'kanban_dones'], function (result:Data) {
        if (result.kanban_todo) {
            todos = result.kanban_todo;
            render()
        }
		if (result.kanban_todo) {
            processes = result.kanban_processes;
            render()
        }
		if (result.kanban_todo) {
            dones = result.kanban_dones;
            render()
        }
    });
}
















