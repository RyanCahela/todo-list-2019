'use strict';
(function(){


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
        console.log('todo removed');
        break;
      }
    }
  },


  changeTodo: function(oldValue, newValue) {
    for(let i=0; i < this.list.length; i++) {
      if(this.list[i].todoText == oldValue) {
        this.list[i].todoText = newValue;
        console.log('todo changed');
        break;
      }
    }
  },


  displayTodos: function() {
    if(this.list.length === 0){
      console.log('The list is empty');
    }
    let todos = [];
    for(let i=0; i < this.list.length; i++) {

      todos.push(this.list[i].todoText);
    }
    console.log('Todos: ' + todos);
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

const lightBtnColor = 'light-btn-color';
const redBtnColor = 'red';
const markBtnColor = 'active-green';
const btnDisableClass = 'btn-disabled'
const saveBtnColor = 'dark-green';



const getDOMTasks = function() {
  const taskNodeList = document.querySelectorAll('.task');
  let tasksArray = Array.from(taskNodeList);
  console.log(tasksArray);
  return tasksArray;
}



const assignListenersToList = function(listArray) {
  listArray.forEach(function(item){
    item.addEventListener('click', btnClickListener)
  });
}



const btnClickListener = function(e) {
  if(e.target.classList.contains('js-toggle-btn')) {
    let taskBeingClicked = this;
    console.log(taskBeingClicked);
    toggleTaskCSS(taskBeingClicked);
  }

  if(e.target.classList.contains('js-delete-btn')) {
    let taskBeingClicked = this;
    taskBeingClicked.remove();
  }

  if(e.target.classList.contains('js-edit-btn')) {
    let taskBeingClicked = this;
    toggleEditTask(taskBeingClicked);
  }
}



const toggleShowTaskTitle = function(task) {
  const titleEl = task.querySelector('.js-task-title');
  
  if(titleEl.classList.contains('hidden')) {
    titleEl.classList.remove('hidden');
  } else {
    titleEl.classList.add('hidden');
  }
}


const toggleShowTextInput = function(task) {
  const textInput = task.querySelector('input[type="text"]');

  if(textInput.classList.contains('hidden')) {
    textInput.classList.remove('hidden');
  } else {
    textInput.classList.add('hidden');
  }
}



const toggleEditBtn = function(btn) {
  if(btn.classList.contains('js-save-state')) {
    btn.classList.remove('js-save-state', saveBtnColor);
    btn.classList.add(lightBtnColor);
    btn.textContent = 'Edit';
    
  } else {
    btn.classList.remove(lightBtnColor);
    btn.classList.add('js-save-state', saveBtnColor);
    btn.textContent = 'Save';
    
}

}





const toggleTaskCSS = function(task) {
  if(task.classList.contains('js-marked-done')) {
   markTaskIncomplete(task);
  
  } else {
    markTaskDone(task);
  }
}


//TOGGLE BUTTON FUNCTIONS
const enableToggleBtn = function(btn) {
  btn.classList.remove(btnDisableClass);
  btn.classList.add(markBtnColor);
  btn.removeAttribute('disabled');
}


const disableToggleBtn = function(btn) {
  btn.classList.remove(markBtnColor);
  btn.classList.add(btnDisableClass);
  btn.setAttribute('disabled','disabled');
}



const markToggleBtn = function(btn) {
  btn.classList.remove(markBtnColor);
  btn.classList.add(redBtnColor);
  btn.textContent = 'Unmark';
}



const unmarkToggleBtn = function(el) {
  el.classList.add(markBtnColor);
  el.classList.remove(redBtnColor);
  el.textContent = 'Mark';
}

//EDIT BUTTON FUNCTIONS

const disableEditBtn = function(btn) {
  //remove edit and dark-green class from edit button
  btn.classList.remove(lightBtnColor,'edit');
    //add btn-disabled class
    btn.classList.add('btn-disabled')
    //add diabled boolean to button el
    btn.setAttribute('disabled','disabled');
}



const enableEditBtn = function(btn) {
  //remove edit and dark-green class from edit button
  btn.classList.add(lightBtnColor,'edit');
    //add btn-disabled class
    btn.classList.remove('btn-disabled')
    //add diabled boolean to button el
    btn.removeAttribute('disabled');
}

//DELETE BUTTON FUNCTIONS

const disableDeleteBtn = function(btn) {
  //remove delete and red class from delete button
    btn.classList.remove(lightBtnColor,'delete');
    //add btn-disabled class
    btn.classList.add('btn-disabled');
    //add diabled boolean to button el
    btn.setAttribute('disabled','disabled');
}

const changeDeleteBtnColor = function(btn) {
  btn.classList.toggle(lightBtnColor);
  btn.classList.toggle(redBtnColor);
}



const enableDeleteBtn = function(btn) {
  //remove delete and red class from delete button
    btn.classList.add(lightBtnColor,'delete');
    //add btn-disabled class
    btn.classList.remove('btn-disabled','red');
    //add diabled boolean to button el
    btn.removeAttribute('disabled');
}


//Grabs Task Buttons of given element and returns a those buttons as an object
const getTaskBtns = function(el) {
  let toggleBtn,
      editBtn,
      deleteBtn;
  //grab buttons
  for(let i=0; i < el.children.length; i++) {
    if(el.children[i].classList.contains('js-toggle-btn')) {
      toggleBtn = el.children[i];
    }
    if(el.children[i].classList.contains('js-edit-btn')) {
      editBtn = el.children[i];
    }
    if(el.children[i].classList.contains('js-delete-btn')) {
      deleteBtn = el.children[i];
    }
  }

  return {
    toggleBtn: toggleBtn,
    editBtn: editBtn,
    deleteBtn: deleteBtn
  }
}

//EDIT TASK
const toggleEditTask = function(task) {

  let taskBtns = getTaskBtns(task);
  if(taskBtns.editBtn.classList.contains('js-save-state')) {
    enableDeleteBtn(taskBtns.deleteBtn);
    toggleEditBtn(taskBtns.editBtn);
    enableToggleBtn(taskBtns.toggleBtn);
    toggleShowTextInput(task);
    toggleShowTaskTitle(task);
    
  } else {
    
    disableToggleBtn(taskBtns.toggleBtn);
    disableDeleteBtn(taskBtns.deleteBtn);
    toggleShowTaskTitle(task);
    toggleShowTextInput(task);
    toggleEditBtn(taskBtns.editBtn);
  }
}



//MARK TASK DONE
const markTaskDone = function(task) {
  //add js-marked-done class
  task.classList.add('js-marked-done');
  //add grey class to task el
  task.classList.add('grey');

  let taskBtns = getTaskBtns(task);
  markToggleBtn(taskBtns.toggleBtn);
  disableEditBtn(taskBtns.editBtn);
  changeDeleteBtnColor(taskBtns.deleteBtn);
}



//MARK TASK INCOMPLETE
const markTaskIncomplete = function(task) {

  //remove js-marked-done class
  task.classList.remove('js-marked-done');
  //add grey class to task el
  task.classList.remove('grey');

  let taskBtns = getTaskBtns(task);

  unmarkToggleBtn(taskBtns.toggleBtn);
  enableEditBtn(taskBtns.editBtn);
  enableDeleteBtn(taskBtns.deleteBtn);
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


newTaskInput.addEventListener('keyup',function() {

  if(newTaskInput.value) {
    addBtn.classList.add('shadow');
  } else {
    addBtn.classList.remove('shadow');
  }

});



const createNewTask = function(titleText){
  //create all elements in a task
  let newTask = document.createElement('li');
  let newTaskToggleBtn = document.createElement('button');
  let newTaskTitle = document.createElement('div');
  let newTaskEditInput = document.createElement('input');
  let newTaskEditBtn = document.createElement('button');
  let newTaskDeleteBtn = document.createElement('button');



  //add classes to each element
  newTask.classList.add('task');
  newTaskToggleBtn.classList.add('js-toggle-btn','task--btn','mark-toggle','active-green');
  newTaskTitle.classList.add('js-task-title','task--title');
  newTaskEditInput.classList.add('js-task-edit-input','hidden','task-edit-input');
  newTaskEditInput.setAttribute('type','text');
  newTaskEditBtn.classList.add('js-edit-btn','task--btn','edit','light-btn-color');
  newTaskDeleteBtn.classList.add('js-delete-btn','task--btn','delete','light-btn-color');



  //add text content to elements
  newTaskToggleBtn.textContent = 'Mark';
  newTaskTitle.textContent = titleText;
  newTaskEditBtn.textContent = 'Edit';
  newTaskDeleteBtn.textContent = 'Delete';



  //build entire element
  newTask.appendChild(newTaskToggleBtn);
  newTask.appendChild(newTaskTitle);
  newTask.appendChild(newTaskEditInput);
  newTask.appendChild(newTaskEditBtn);
  newTask.appendChild(newTaskDeleteBtn);

  return newTask;
}



addBtn.addEventListener('click',function(e){
  e.preventDefault();
  //if input empty return without doing anything
  if(!newTaskInput.value) {
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



const init = function() {
  let tasksArray = getDOMTasks();
  assignListenersToList(tasksArray);
}


init();



})();
