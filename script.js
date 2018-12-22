"use strict";
(function(){

  let tasksArray = null;


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
    for(let i=0; i < this.list.length; i++) {
      if(this.list[i].todoText == thingToRemove) {
        this.list.splice(i,1);
        console.log("todo removed");
        break;
      }
    }
  },
  changeTodo: function(oldValue, newValue) {
    for(let i=0; i < this.list.length; i++) {
      if(this.list[i].todoText == oldValue) {
        this.list[i].todoText = newValue;
        console.log("todo changed");
        break;
      }
    }
  },
  displayTodos: function() {
    if(this.list.length === 0){
      console.log("The list is empty");
    }
    let todos = [];
    for(let i=0; i < this.list.length; i++) {

      todos.push(this.list[i].todoText);
    }
    console.log("Todos: " + todos);
  },
  toggleCompleted: function(todoText) {
    for(let i=0; i < this.list.length; i++) {
      console.log(i);
      if(this.list[i].todoText == todoText) {
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


const getDOMTasks = function() {
  const taskNodeList = document.querySelectorAll(".task");
  let tasksArray = Array.from(taskNodeList);
  return tasksArray;
}

const assignListenersToList = function(listArray) {
  listArray.forEach(function(item){
    item.addEventListener("click", function(e){
      //id button
      if(e.target.classList.contains('js-toggle-btn')) {
        let taskBeingClicked = this;
        toggleTaskCSS(taskBeingClicked);
      }

      if(e.target.classList.contains('js-delete-btn')) {
        let taskBeingClicked = this;
        deleteFromDOM(taskBeingClicked);
      }
    });
  });
}

const toggleTaskCSS = function(task) {
  if(task.classList.contains('js-marked-done')) {
   markTaskIncomplete(task);
  } else {
    markTaskDone(task);
  }
}

const deleteFromDOM = function(task) {
  task.remove();
}



const markToggleBtn = function(btn) {
  btn.classList.remove('active-green');
  btn.classList.add('red');
  btn.textContent = 'Unmark';
}



const unmarkToggleBtn = function(el) {
  el.classList.add('active-green');
  el.classList.remove('red');
  el.textContent = 'Mark';
}



const disableEditBtn = function(btn) {
  //remove edit and dark-green class from edit button
  btn.classList.remove('edit', 'dark-green');
    //add btn-disabled class
    btn.classList.add('btn-disabled')
    //add diabled boolean to button el
    btn.setAttribute('disabled','disabled');
}



const enableEditBtn = function(btn) {
  //remove edit and dark-green class from edit button
  btn.classList.add('edit', 'dark-green');
    //add btn-disabled class
    btn.classList.remove('btn-disabled')
    //add diabled boolean to button el
    btn.removeAttribute('disabled');
}



const disableDeleteBtn = function(btn) {
  //remove delete and red class from delete button
    btn.classList.remove('delete','red');
    //add btn-disabled class
    btn.classList.add('btn-disabled');
    //add diabled boolean to button el
    btn.setAttribute('disabled','disabled');
}



const enableDeleteBtn = function(btn) {
  //remove delete and red class from delete button
    btn.classList.add('delete','red');
    //add btn-disabled class
    btn.classList.remove('btn-disabled');
    //add diabled boolean to button el
    btn.removeAttribute('disabled');
}

const getTaskBtns = function(el) {
  let toggleBtn,
      editBtn,
      deleteBtn;
  //grab buttons
  for(let i=0; i < el.children.length; i++) {
    if(el.children[i].classList.contains("js-toggle-btn")) {
      toggleBtn = el.children[i];
    }
    if(el.children[i].classList.contains("js-edit-btn")) {
      editBtn = el.children[i];
    }
    if(el.children[i].classList.contains("js-delete-btn")) {
      deleteBtn = el.children[i];
    }
  }

  return {
    toggleBtn: toggleBtn,
    editBtn: editBtn,
    deleteBtn: deleteBtn
  }
}
//MARK TASK DONE
const markTaskDone = function(task) {
  //add js-marked-done class
  task.classList.add('js-marked-done');
  //add grey class to task el
  task.classList.add("grey");

  let taskBtns = getTaskBtns(task);
  markToggleBtn(taskBtns.toggleBtn);
  disableEditBtn(taskBtns.editBtn);
  disableDeleteBtn(taskBtns.deleteBtn);
}

//MARK TASK NOT DONE
const markTaskIncomplete = function(task) {

  //remove js-marked-done class
  task.classList.remove('js-marked-done');
  //add grey class to task el
  task.classList.remove("grey");

  let taskBtns = getTaskBtns(task);

  unmarkToggleBtn(taskBtns.toggleBtn);
  enableEditBtn(taskBtns.editBtn);
  enableDeleteBtn(taskBtns.deleteBtn);
}


const prependToList = function() {

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

const createNewTask = function(titleText){
  //create all elements in a task
  let newTask = document.createElement('li');
  let newTaskToggleBtn = document.createElement('button');
  let newTaskTitle = document.createElement('span');
  let newTaskEditBtn = document.createElement('button');
  let newTaskDeleteBtn = document.createElement('button');

  //add classes to each element
  newTask.classList.add('task');
  newTaskToggleBtn.classList.add('js-toggle-btn','task--btn','mark-toggle','active-green');
  newTaskTitle.classList.add('js-task-title','task--title');
  newTaskEditBtn.classList.add('js-edit-btn','task--btn','edit','dark-green');
  newTaskDeleteBtn.classList.add('js-delete-btn','task--btn','delete', 'red');

  //add text content to elements
  newTaskToggleBtn.textContent = 'Mark';
  newTaskTitle.textContent = titleText;
  newTaskEditBtn.textContent = 'Edit';
  newTaskDeleteBtn.textContent = 'Delete';

  //build entire element
  newTask.appendChild(newTaskToggleBtn);
  newTask.appendChild(newTaskTitle);
  newTask.appendChild(newTaskEditBtn);
  newTask.appendChild(newTaskDeleteBtn);

  return newTask;
}

addBtn.addEventListener('click',function(e){
  //if input empty return without doing anything
  if(!newTaskInput.value) {
    return;
  }

  //grab value from add task input the reset field
  let titleText = newTaskInput.value;
  newTaskInput.value = "";

  


  let newTask = createNewTask(titleText);

  //prepend new task to list
  taskUL.prepend(newTask);

  //create new taskArray with new task included
  tasksArray = getDOMTasks();
  assignListenersToList(tasksArray);

});

const init = function() {
  tasksArray = getDOMTasks();
  assignListenersToList(tasksArray);
}


init();



})();
