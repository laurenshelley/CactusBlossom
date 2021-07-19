import{Todo} from './todo.js';

let toDoList = [];


 if (localStorage.getItem('todos')){
     toDoList = JSON.parse(localStorage.getItem('todos'));
 }

 displayTodos();

 function displayTodos(){
    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    toDoList.forEach((todoItem) =>{
        ul.innerHTML +=
        `<li class="checklist">
        <input type="checkbox" id="crossout" ${todoItem.Completed ? 'checklist' : ''}>
        <span>${todoItem.content}<span>
        <button id="delete">X</button>
        </li>`;
    });

     let todoCheckboxes = document.querySelectorAll('input [type="checkbox"]');

     todoCheckboxes.forEach((todoCheckbox) =>{
         todoCheckbox.addEventListener("click", (e) =>{
    
              
              let selectedId = e.target.dataset.id;
              let selectedTodo = toDoList.find(todo => todo.Id === parseInt(selectedId));
              selectedTodo.completed = !selectedTodo.completed;
              localStorage.setItem("todos", JSON.stringify(toDoList));
         });
    
     });

    let todoDeleteButtons = document.querySelectorAll('button');

    todoDeleteButtons.forEach((todoDeleteButton) => {
        todoDeleteButton.addEventListener('click', (e) =>{
            let selectedId = e.target.dataset.id;
            let selectedTodoIndex = toDoList.find(todo => todo.Id === parseInt(selectedId));

            // deleted object from array
            toDoList.splice(selectedTodoIndex, 1);
            
            localStorage.setItem("todos", JSON.stringify(toDoList));

            displayTodos();
        })
    })
        
    
}

 let button = document.querySelector('input[type="button"]').addEventListener("click", (e) => {
        let content  = document.querySelector('#content');

        let todo = new Todo(content.value);
        toDoList.push(todo);


         localStorage.setItem('todos', JSON.stringify(toDoList));

        content.value = '';

        displayTodos();
 });
