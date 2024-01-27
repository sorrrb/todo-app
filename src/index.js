import './style.css';
import ProjectFolder from './assets/media/folder.svg';
import Garbage from './assets/media/trash.svg';
import loadPage from './modules/load';
import { createTodo, createProject, projectManager } from './modules/task';

function removeProjectCard(projectObject) {
  projectManager.removeProject(projectObject);
  printProjectCards();
}

function printProjectCards() {
  const reference = document.getElementById('projects-container');
  reference.innerHTML = '';

  const projectList = projectManager.getProjects();
  const projectQuantity = projectManager.getProjects().length;
  for (let i = 0; i < projectQuantity; i++) {
    const newCard = document.createElement('div');
    newCard.classList.add('project-card');
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
      const elementIndex = Array.from(deleteBtns).indexOf(btn);
      if (elementIndex === -1) {
        console.log('Error');
        return;
      }
      const projects = projectManager.getProjects();
      removeProjectCard(projects[elementIndex]);
    });
  });
}

function handleTodos() {
  const todos = document.querySelectorAll('div.todo-card');
  console.log(todos);
}

function styleOtherProjects() { // Helper function
  const projectCards = document.querySelectorAll('div.project-card');

  projectCards.forEach((card) => {
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
      const text = project.querySelector('p');
      text.classList.toggle('active-project-text');
      projectManager.setActiveProject(project.dataset.id);
      // how do we determine what project was selected/clicked?
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
    printProjectCards();
    handleProjects();
  }

  if (todoBool) { // Conditional to determine if DOM is updated after todo is added

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
      handleState(2, false, true);
    }
  })

  const closeTodoBtn = document.getElementById('tmodal-close');
  closeTodoBtn.addEventListener('click', () => {
    handleState(0, false, false);
  })
}

function init() { // Main screen controller function
  loadPage();
  manageEventListeners();
}

init(); // Screen controller call