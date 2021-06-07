
// all lists and list-items together
var list_items: NodeList = document.querySelectorAll('.list-item');
var lists: NodeList = document.querySelectorAll('.list');

// all feature buttons
var erasebtn: HTMLElement = document.getElementById("erase");
erasebtn.addEventListener("click", (e)=>{
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


let draggedItem: Node = null;

todobtn.addEventListener("click", (e) => {
	var div = document.createElement("div");
	div.innerHTML = '<div class="list-item card"> <div class="card-header"> <form action=""><input class="input" placeholder="Write and Press Enter"/></form> <div class="delete" style="position: absolute; right: 0;"></div></div></div>'
	todo.prepend(div)
})


//different arrays for storing kanban data
var todos: String[] = ["hello", "there", "what's", "up"];
var processes: String[] = ["hello", "there", "what's", "up"];
var dones: String[] = ["hello", "there", "what's", "up"];

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
	dones.forEach(val => {
		var element: String = getListItem(val);
		all_dones += element;
	})
	done.innerHTML = all_dones;

	list_items = document.querySelectorAll('.list-item');
	lists = document.querySelectorAll('.list');
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
				(draggedItem as HTMLElement).style.display = 'block';
				draggedItem = null;
			}, 100);
		})
	}

}

render();

for (let j = 0; j < lists.length; j++) {
	const list: Node = lists[j];

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

function getListItem(val: String): String {
	return '<div class="list-item card" draggable="true"> <div class="card-header"> <p>' + val + '</p><div class="delete" style="position: absolute; right: 0;"></div></div></div>';
}

// erases entire kanban
function erase() {
	todos = []
	processes = []
	dones = []
	render()
}