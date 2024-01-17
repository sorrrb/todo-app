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
import { createProjectCard, load } from './modules/load';
import './style.css';

/* Main file where code execution occurs */

function init() {
  load();
  handleEventListeners();
}

function handleEventListeners() {
  const taskList = document.getElementById('tasks');
  console.log(taskList);
  const modal = document.querySelector('div.modal');
  const projectOpt = document.getElementById('project-select');
  const todoOpt = document.getElementById('todo-select');

  // Open Modal
  const create = document.getElementById('addproject');

  create.addEventListener('click', () => {
    modal.classList.toggle('hidden');
  });

  // Modal submit
  const submit = document.getElementById('add');

  submit.addEventListener('click', () => {
    if (projectOpt.checked) {
      const projectName = document.getElementById('formtitle').value;
      console.log(projectName);
      const newProject = createProject(projectName, 0);
      const newProjectCard = createProjectCard(newProject);
      taskList.appendChild(newProjectCard);
    }
    
    else if (todoOpt.checked) {
      console.log('Todo');
    }

    else {
      console.log('Error');
      return;
    };
    modal.classList.toggle('hidden');
  });

  // Modal cancel
  const cancel = document.getElementById('cancel');
  cancel.addEventListener('click', () => {
    modal.classList.toggle('hidden')
    // Potentially add logic to clear modal form values
  });
}

init();