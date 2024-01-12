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

import { createList, createTask } from './modules/task';
import './style.css';

/* Main file where code execution occurs */