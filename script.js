'use strict';
(function IFFE(){


//   /\/\   ___   __| | ___| |
//  /    \ / _ \ / _` |/ _ \ |
// / /\/\ \ (_) | (_| |  __/ |
// \/    \/\___/ \__,_|\___|_|
        //Create a todo object

const TodoList = {
  list: [],
  addTodo: function(thingToAdd) {
    const newTodo = {
      todoText: thingToAdd,
      taskCompleted: false,
    }

    this.list.push(newTodo);
  },


  removeTodo: function(thingToRemove) {
    for (let i=0; i < this.list.length; i++) {
      if (this.list[i].todoText == thingToRemove) {
        this.list.splice(i,1);
        console.log('todo removed');
        break;
      }
    }
  },


  changeTodo: function(oldValue, newValue) {
    for (let i=0; i < this.list.length; i++) {
      if (this.list[i].todoText == oldValue) {
        this.list[i].todoText = newValue;
        console.log('todo changed');
        break;
      }
    }
  },


  displayTodos: function() {
    if (this.list.length === 0){
      console.log('The list is empty');
    }
    let todos = [];
    for (let i=0; i < this.list.length; i++) {

      todos.push(this.list[i].todoText);
    }
    console.log('Todos: ' + todos);
  },


  toggleCompleted: function(todoText) {
    for (let i=0; i < this.list.length; i++) {
      console.log(i);
      if (this.list[i].todoText == todoText) {
      //toggles boolean value
        let todo = this.list[i];
        todo.taskCompleted = !todo.taskCompleted;
        break;
      }
    }
  }
}//END TodoList


// ____    ____  __   ___________    __    ____
// \   \  /   / |  | |   ____\   \  /  \  /   /
//  \   \/   /  |  | |  |__   \   \/    \/   /
//   \      /   |  | |   __|   \            /
//    \    /    |  | |  |____   \    /\    /
//     \__/     |__| |_______|   \__/  \__/
//

function toggleTaskState(task) {
  if (task.classList.contains('active-state')) {
    markTaskDone(task);
  } else {
    markTaskIncomplete(task);
  }
}

//EDIT STATE
function toggleEditState(task) {
  let editBtn = task.querySelector('.edit-btn');
  let markBtn = task.querySelector('.mark-btn');
  let deleteBtn = task.querySelector('.delete-btn');
  let editInput = task.querySelector('.task-edit-input');
  let taskTitle = task.querySelector('.task-title');
  let editForm = task.querySelector('.task-edit-form');

  if (task.classList.contains('edit-state')) {
    exitEditState();
  } 
    
  if (task.classList.contains('active-state')) {
    enterEditState();
  }
    
  function handleFormSubmit(e) {
    e.preventDefault();
    exitEditState();
  }

  function exitEditState() {

    //check if input is empty
    if(!editInput.value) {
      editInput.classList.add('warning');
      let removeWarning = setTimeout(function() {
      editInput.classList.remove('warning');
      }, 500);
      return;
    }



    task.classList.remove('edit-state');
    task.classList.add('active-state');
    editBtn.textContent = 'Edit';
    markBtn.removeAttribute('disabled');
    deleteBtn.removeAttribute('disabled');
    taskTitle.textContent = editInput.value;
    editInput.classList.remove('warning');
    editForm.removeEventListener('submit', hadleFormSubmit);
    return;
    }

  function enterEditState() {
    task.classList.remove('active-state');
    task.classList.add('edit-state');
    editBtn.textContent = 'Save';
    markBtn.setAttribute('disabled','disabled');
    deleteBtn.setAttribute('disabled','disabled');
    editInput.focus();
    editForm.addEventListener('submit', handleFormSubmit);

  }
}

//MARK TASK DONE
function markTaskDone(task) {
  let editBtn = task.querySelector('.edit-btn');
  let markBtn = task.querySelector('.mark-btn');
  //add js-marked-done class
  task.classList.remove('active-state');
  //add grey class to task el
  task.classList.add('inactive-state');
  editBtn.setAttribute('disabled','disabled');
  markBtn.textContent = 'Unmark';
}

//MARK TASK INCOMPLETE
function markTaskIncomplete(task) {
  let editBtn = task.querySelector('.edit-btn');
  let markBtn = task.querySelector('.mark-btn');
  //remove active-state class
  task.classList.remove('inactive-state');
  //add grey class to task el
  task.classList.add('active-state');
  editBtn.removeAttribute('disabled');
  markBtn.textContent = 'Mark';
}

//TODO Fix creat to include new form and classes
function createNewTask(titleText){
  //create all elements in a task
  let newTask = document.createElement('li');
  let newTaskToggleBtn = document.createElement('button');
  let newTaskTitle = document.createElement('div');
  let newTaskEditBtn = document.createElement('button');
  let newTaskDisplay = document.createElement('div');
  let newTaskEditForm = document.createElement('form');
  let newTaskEditInput = document.createElement('input');
  let newTaskSaveBtn = document.createElement('button');
  let newTaskDeleteBtn = document.createElement('button');

  //add classes to each element
  newTask.classList.add('task','active-state');
  newTaskToggleBtn.classList.add('js-mark-btn','task-btn','mark-btn');
  newTaskTitle.classList.add('js-task-title','task-title');
  newTaskDisplay.classList.add('js-task-display','task-display');
  newTaskEditForm.classList.add('task-edit-form');
  newTaskEditInput.classList.add('task-edit-input');
  newTaskEditInput.setAttribute('type','text');
  newTaskEditBtn.classList.add('js-edit-btn','task-btn','edit-btn');
  newTaskSaveBtn.classList.add('js-save-btn', 'save-btn', 'task-btn');
  newTaskDeleteBtn.classList.add('js-delete-btn','task-btn','delete-btn');

  //add text content to elements
  newTaskToggleBtn.textContent = 'Mark';
  newTaskTitle.textContent = titleText;
  newTaskEditBtn.textContent = 'Edit';
  newTaskSaveBtn.textContent = 'Save';
  newTaskDeleteBtn.textContent = 'Delete';

  //build sub-components
  newTaskEditForm.appendChild(newTaskEditInput);
  newTaskEditForm.appendChild(newTaskSaveBtn)

  newTaskDisplay.appendChild(newTaskTitle);
  newTaskDisplay.appendChild(newTaskEditBtn);

  //build entire element
  newTask.appendChild(newTaskToggleBtn);
  newTask.appendChild(newTaskDisplay);
  newTask.appendChild(newTaskEditForm);
  newTask.appendChild(newTaskDeleteBtn);

  console.log(newTask);

  return newTask;
}

// ______   ______   .__   __. .___________..______        ______    __       __       _______ .______
//  /      | /  __  \  |  \ |  | |           ||   _  \      /  __  \  |  |     |  |     |   ____||   _  \
// |  ,----'|  |  |  | |   \|  | `---|  |----`|  |_)  |    |  |  |  | |  |     |  |     |  |__   |  |_)  |
// |  |     |  |  |  | |  . `  |     |  |     |      /     |  |  |  | |  |     |  |     |   __|  |      /
// |  `----.|  `--'  | |  |\   |     |  |     |  |\  \----.|  `--'  | |  `----.|  `----.|  |____ |  |\  \----.
//  \______| \______/  |__| \__|     |__|     | _| `._____| \______/  |_______||_______||_______|| _| `._____|
//
//DOM cache
const addBtn = document.querySelector('.js-add-btn');
const taskUL = document.querySelector('.list');
const newTaskInput = document.querySelector('.js-add-input');

function getDOMTasks() {
  const taskNodeList = document.querySelectorAll('.task');
  let tasksArray = Array.from(taskNodeList);
  console.log(tasksArray);
  return tasksArray;
}

function assignListenersToList(listArray) {
  listArray.forEach(function(item){
    item.addEventListener('click', btnClickListener)
  });
}

function btnClickListener(e) {
  if (e.target.classList.contains('js-mark-btn')) {
    let taskBeingClicked = this;
    console.log(taskBeingClicked);
    toggleTaskState(taskBeingClicked);
  }

  if (e.target.classList.contains('js-delete-btn')) {
    let taskBeingClicked = this;
    taskBeingClicked.remove();
  }

  if (e.target.classList.contains('js-edit-btn')) {
    let taskBeingClicked = this;
    console.log(this);
    toggleEditState(taskBeingClicked);
  }
  if (e.target.classList.contains('js-save-btn')) {
    let taskBeingClicked = this;
    toggleEditState(taskBeingClicked);
  }
}

newTaskInput.addEventListener('keyup',function() {

  if (newTaskInput.value) {
    addBtn.classList.add('shadow');
  } else {
    addBtn.classList.remove('shadow');
  }

});

addBtn.addEventListener('click',function(e) {
  e.preventDefault();
  //if input empty return without doing anything
  if (!newTaskInput.value) {
    return;
  }

  //grab value from add task input the reset field
  let titleText = newTaskInput.value;
  newTaskInput.value = '';

  let newTask = createNewTask(titleText);

  //prepend new task to list
  taskUL.prepend(newTask);

  //create new taskArray with new task included
  newTask.addEventListener('click', btnClickListener);

  addBtn.classList.remove('shadow');

});

function init() {
  let tasksArray = getDOMTasks();
  assignListenersToList(tasksArray);
}

init();

})();
