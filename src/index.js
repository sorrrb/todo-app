import './style.css';
import ProjectFolder from './assets/media/folder.svg';
import Garbage from './assets/media/trash.svg';
import DropdownPlus from './assets/media/plus.svg';
import DropdownMinus from './assets/media/minus.svg';
import DropdownEdit from './assets/media/edit.svg';
import loadPage from './modules/load';
import { createTodo, createProject, projectManager } from './modules/task';

const { format } = require("date-fns");

function removeTodoCard(todoObject) {
  const currentProject = projectManager.getActiveProject();
  currentProject.removeTodo(todoObject);
  printTodoCards();
}

function removeProjectCard(projectObject) {
  projectManager.removeProject(projectObject);
  projectManager.setActiveProject(null);
  printProjectCards();
  printTodoCards();
}

function compareDateFn(a, b) {
  return a.getDueDate() - b.getDueDate();
}

function compareNameFn(a, b) {
  const nameA = a.getTitle().toUpperCase();
  const nameB = b.getTitle().toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

function sortByName() {
  if (projectManager.getActiveProject() === null) {
    console.log('No Active Project Selected');
    return;
  }

  const todos = projectManager.getActiveProject().getTodos();

  todos.sort(compareNameFn);

  projectManager.getActiveProject().clearTodos();
  
  todos.forEach((todo) => {
    projectManager.getActiveProject().addTodo(todo)
  });

  printTodoCards();
}

function sortByDueDate() {
  if (projectManager.getActiveProject() === null) {
    console.log('No Active Project Selected');
    return;
  }

  const todos = projectManager.getActiveProject().getTodos();

  todos.sort(compareDateFn);

  projectManager.getActiveProject().clearTodos();
  
  todos.forEach((todo) => {
    projectManager.getActiveProject().addTodo(todo)
  });

  printTodoCards();
}

function printTodoCards() {
  const reference = document.getElementById('todos-container');
  reference.innerHTML = '';

  const todoList = (projectManager.getActiveProject() ? projectManager.getActiveProject().getTodos() : []);
  const todoQuantity = todoList.length;
  for (let i = 0; i < todoQuantity; i++) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('todo-card');

    const newTodo = document.createElement('button');
    newTodo.type = 'button';
    newTodo.classList.add('todo-collapsible');

    const todoLeft = document.createElement('div');
    todoLeft.classList.add('todo-collapsible-left');

    const todoTitle = document.createElement('h4');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = `${todoList[i].getTitle()}`;

    const dueDateObject = todoList[i].getDueDate();

    const dueDate = document.createElement('div');
    dueDate.classList.add('todo-duedate');
    dueDate.textContent = `Due: ${format(dueDateObject, 'MM/dd/yyyy')}`;

    switch(todoList[i].getPriority()) {
      case 'low':
        newTodo.classList.add('low-priority');
        break;
      case 'medium':
        newTodo.classList.add('medium-priority');
        break;
      case 'high':
        newTodo.classList.add('high-priority');
        break;
    }

    const todoRight = document.createElement('div');
    todoRight.classList.add('todo-collapsible-right');

    const editIcon = new Image();
    editIcon.src = DropdownEdit;
    editIcon.classList.add('edit-icon');

    const deleteIcon = new Image();
    deleteIcon.src = Garbage;
    deleteIcon.classList.add('delete-todo');

    const expandIcon = new Image();
    expandIcon.src = DropdownPlus;
    expandIcon.classList.add('expand-icon');

    const expandWrapper = document.createElement('div');
    expandWrapper.classList.add('todo-expand');

    const description = document.createElement('p');
    description.classList.add('todo-description');
    description.textContent = `Notes: ${todoList[i].getDescription()}`;

    todoLeft.appendChild(todoTitle);
    todoLeft.appendChild(dueDate);

    todoRight.appendChild(editIcon);
    todoRight.appendChild(deleteIcon);
    todoRight.appendChild(expandIcon);

    expandWrapper.appendChild(description);

    newTodo.appendChild(todoLeft);
    newTodo.appendChild(todoRight);

    wrapper.appendChild(newTodo);
    wrapper.appendChild(expandWrapper);

    reference.appendChild(wrapper);
  }

  const todoBtns = document.querySelectorAll('div.todo-card');
  todoBtns.forEach((btn) => {
    btn.addEventListener('click', e => {
      const editIcon = btn.querySelector('img.edit-icon');
      const deleteIcon = btn.querySelector('img.delete-todo');
      
      if (e.target === editIcon) {
        console.log(`Editing: ${btn}`);
        return;
      };

      if (e.target === deleteIcon) {
        const todoIndex = Array.from(todoBtns).indexOf(btn);
        if (todoIndex === -1) {
          console.log('Error');
          return;
        }
        const todos = projectManager.getActiveProject().getTodos();
        removeTodoCard(todos[todoIndex]);
        handleProjects();
      }

      const expandBlockElement = btn.querySelector('div.todo-expand');
      const expandIcon = btn.querySelector('img.expand-icon');
      if (expandBlockElement.style.display === 'block') {
        expandBlockElement.style.display = 'none';
        expandIcon.src = DropdownPlus;
      }
      else {
        expandBlockElement.style.display = 'block';
        expandIcon.src = DropdownMinus;
      }
    });

    btn.addEventListener('mouseover', () => {
      const editIcon = btn.querySelector('img.edit-icon');
      editIcon.style.display = 'block';
    });

    btn.addEventListener('mouseout', () => {
      const editIcon = btn.querySelector('img.edit-icon');
      editIcon.style.display = 'none';
    })
  });
}

function printProjectCards() {
  const reference = document.getElementById('projects-container');
  reference.innerHTML = '';

  const projectList = projectManager.getProjects();
  const projectQuantity = projectList.length;
  for (let i = 0; i < projectQuantity; i++) {
    const newCard = document.createElement('div');
    newCard.classList.add('project-card');
    if (!i) newCard.classList.add('default-project');
    newCard.dataset.id = `${projectList[i].getId()}`;

    const cardLeft = document.createElement('div');
    cardLeft.classList.add('project-card-left');

    const folderIcon = new Image();
    folderIcon.src = ProjectFolder;

    const newCardText = document.createElement('p');
    newCardText.textContent = projectList[i].getTitle();

    const cardRight = document.createElement('div');
    cardRight.classList.add('project-card-right');

    const garbageIcon = new Image();
    garbageIcon.src = Garbage;
    garbageIcon.height = 15;
    garbageIcon.width = 15;
    garbageIcon.classList.add('delete-project');

    cardLeft.appendChild(folderIcon);
    cardLeft.appendChild(newCardText);

    cardRight.appendChild(garbageIcon);

    newCard.appendChild(cardLeft);
    newCard.appendChild(cardRight);

    reference.appendChild(newCard);
  }
  
  const deleteBtns = document.querySelectorAll('.delete-project');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.parentElement.parentElement.classList.contains('default-project')) return;
      const elementIndex = Array.from(deleteBtns).indexOf(btn);
      if (elementIndex === -1) {
        console.log('Error');
        return;
      }
      const projects = projectManager.getProjects();
      removeProjectCard(projects[elementIndex]);
      handleProjects();
    });
  });
}

function handleTodos() { // Function that may end up handling todo switching and style rules
  const todos = document.querySelectorAll('div.todo-card');
  console.log(todos);
}

function styleOtherProjects() { // Helper function
  const projectCards = document.querySelectorAll('div.project-card');

  projectCards.forEach((card) => {
    if (card.classList.contains('active-project')) card.classList.toggle('active-project');
    const text = card.querySelector('p');
    if (text.classList.contains('active-project-text')) text.classList.toggle('active-project-text');
  })
}

function handleProjects() { // Function that handles project tab switching and associated style rules
  const projectCards = document.querySelectorAll('div.project-card');

  projectCards.forEach((project) => {
    project.addEventListener('click', e => {
      if (e.target.classList.contains('delete-project')) return;
      styleOtherProjects();
      project.classList.toggle('active-project');
      const text = project.querySelector('p');
      text.classList.toggle('active-project-text');
      projectManager.setActiveProject(project.dataset.id);
      printTodoCards();
    })
  })
}

function resetModalFields() { // Resets modal form
  const projectModalField = document.getElementById('pmodal-title');
  projectModalField.value = '';

  const todoModalTitle = document.getElementById('tmodal-title');
  todoModalTitle.value = '';

  const todoModalDescription = document.getElementById('tmodal-description');
  todoModalDescription.value = '';
}

function handleState(state, projBool, todoBool) { // Function to style rules for page content and associated modals
  const projectModal = document.getElementById('project-modal');
  const todoModal = document.getElementById('todo-modal');
  const projects = projectManager.getProjects().length;

  switch(state) {
    case 0: // Main page state
      projectModal.style.display = 'none';
      todoModal.style.display = 'none';
      break;
    case 1: // Project modal state
      projectModal.style.display = 'block';
      break;
    case 2: // Todo modal state
      todoModal.style.display = 'block';
      break;
  }

  if (projBool) { // Conditional to determine if DOM is updated after project is added
    const formValue = document.getElementById('pmodal-title').value;
    if (!formValue) {
      alert('You must enter a project name!');
      return;
    }

    const newProject = createProject(formValue, projects);

    projectManager.addProject(newProject);
    projectManager.setActiveProject(null);

    printProjectCards();
    handleProjects();
    printTodoCards();
  }

  if (todoBool) { // Conditional to determine if DOM is updated after todo is added
    const nameValue = (document.getElementById('tmodal-title').value === '' ? 'Unnamed Task' : document.getElementById('tmodal-title').value);

    const descriptionValue = document.getElementById('tmodal-description').value;

    const dueDateRef = document.getElementById('tmodal-deadline').value;
    
    const dueDateValue = (!dueDateRef ? new Date() : new Date (dueDateRef.substring(0,4), dueDateRef.substring(5,7) - 1, dueDateRef.substring(8)));

    const priorityValue = document.getElementById('tmodal-priority').value;

    const newTodo = createTodo(nameValue, descriptionValue, dueDateValue, priorityValue);
    projectManager.getActiveProject().addTodo(newTodo);
    printTodoCards();
  }

  resetModalFields();
}

function manageEventListeners() {
  const addProjectBtn = document.getElementById('create-project');
  addProjectBtn.addEventListener('click', () => { // May change from anonymous to named function in same file for factorability
    handleState(1, false, false);
  })

  const closeProjectBtn = document.getElementById('pmodal-close');
  closeProjectBtn.addEventListener('click', () => {
    handleState(0, false, false);
  })

  const submitProjectBtn = document.getElementById('submit-project');
  submitProjectBtn.addEventListener('click', () => {
    handleState(0, true, false);
  })

  const addTodoBtn = document.getElementById('create-todo'); // Skeleton for todo creation
  addTodoBtn.addEventListener('click', () => {
    if (!projectManager.getActiveProject()) alert('Select a Project!');
    else {
      handleState(2, false, false);
    }
  })

  const submitTodoBtn = document.getElementById('submit-todo');
  submitTodoBtn.addEventListener('click', () => {
    handleState(0, false, true);
  })

  const closeTodoBtn = document.getElementById('tmodal-close');
  closeTodoBtn.addEventListener('click', () => {
    handleState(0, false, false);
  })

  const sortDueDateBtn = document.getElementById('sort-duedate');
  sortDueDateBtn.addEventListener('click', () => {
    sortByDueDate();
  })

  const sortNameBtn = document.getElementById('sort-name');
  sortNameBtn.addEventListener('click', () => {
    sortByName();
  });
}

function createDefaultProject() {
  const defaultProject = createProject('Default Project', 0);
  projectManager.addProject(defaultProject);
  projectManager.setActiveProject(0);
  printProjectCards();
  
  const defaultProjectText = document.getElementById('projects-container').firstElementChild;
  defaultProjectText.classList.add('default-project');
  defaultProjectText.classList.add('active-project');
  defaultProjectText.querySelector('p').classList.toggle('active-project-text');
}

function init() { // Main screen controller function
  loadPage();
  manageEventListeners();
  createDefaultProject();
}

init(); // Screen controller call