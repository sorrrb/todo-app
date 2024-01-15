/*

[represents a to-do or task requiring completion]
* task [obj]
  - title [str]
  - description [str]
  - dueDate [str]
  - priority [num] [0, 1, 2, 3] [no deadline, low, medium, high priority]
  - notes [str]
  - checklist [arr]

[represents a list of to-dos]
* list [obj]
  - title [str]
  - tasks [arr]

*/

import { projectManager, createTodo, createProject } from './modules/task';
import load from './modules/load';
import './style.css';

/* Main file where code execution occurs */

function init() {
  load();
  handleEventListeners();
}

function handleEventListeners() {
  const taskList = document.querySelector('div.tasks');
  const modal = document.querySelector('div.modal');
  const projectOpt = document.getElementById('project-select');
  const todoOpt = document.getElementById('todo-select');

  // Modal submit
  const submit = document.getElementById('add');

  submit.addEventListener('click', () => {
    if (projectOpt.checked) {
      console.log('Project');
    }
    
    else if (todoOpt.checked) {
      console.log('Todo');
    }

    else return;
  });

  // Modal cancel
  const cancel = document.getElementById('cancel');
  cancel.addEventListener('click', () => {
    modal.classList.toggle('hidden')
  });
}

init();