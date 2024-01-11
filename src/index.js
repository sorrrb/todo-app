/*

[represents a to-do or task requiring completion]
* task [obj]
  - title [str]
  - description [str]
  - dueDate [str]
  - priority [num]
  - notes [str]
  - checklist [arr]

[represents a list of to-dos]
* list [obj]
  - title [str]
  - tasks [arr]

*/

import './style.css';
import { createTask, createList } from './modules/task';

/* Main file where code execution occurs */

function init() {
  // [START]
  const defaultList = createList('Default'); // Create default project list
  console.log(`-- Created Default List --`);
  const sampleTask = createTask('Complete Project', 'Work on Todo application', 'Tomorrow', 'High', 'N/A', 'empty'); // Create sample task to test list mutation
  console.log(`-- Created Sample Task --`);

  // Dummy code for creating button to show default list tasks
  const logList = document.createElement('button');
  logList.textContent = 'Log Default List to console';
  document.body.appendChild(logList);
  // Dummy code for handling button event
  logList.addEventListener('click', e => {
    console.log(defaultList.getTasks())
  });

  // Dummy code for creating button to add task to default list
  const logAdd = document.createElement('button');
  logAdd.textContent = 'Add Test List to Default List';
  document.body.appendChild(logAdd);

  logAdd.addEventListener('click', e => {
    console.log('Adding task to list');
    defaultList.addTask(sampleTask);
    console.log(defaultList.getTasks());
  });
  // [END]
}

init();