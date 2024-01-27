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

function handleProjects() { // Function that handles project tab switching and associated style rules
  const projectCards = document.querySelectorAll('div.project-card');
  projectCards.forEach((project) => {
    project.addEventListener('click', e => {
      for (let i = 0; i < projectCards.length; i++) {
        if (projectCards[i].classList.contains('active-project')) {
          projectCards[i].classList.toggle('active-project');
          projectCards[i].firstElementChild.lastElementChild.style.fontStyle = 'normal';
          projectCards[i].firstElementChild.lastElementChild.style.fontWeight = 'normal';
        }
      }
      e.target.style.fontStyle = 'italic';
      e.target.style.fontWeight = 'bold';
      e.target.parentElement.parentElement.classList.toggle('active-project');
      // how do we determine what project was selected/clicked?
    })
  })
}

function handleState(state, bool) { // Function to style rules for page content and associated modals
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

  if (bool) { // Conditional to determine if DOM is updated
    const formValue = document.getElementById('ptitle').value;
    const newProject = createProject(formValue, projects);
    projectManager.addProject(newProject);
    printProjectCards();
    handleProjects();
  }

  const formField = document.getElementById('ptitle');
  formField.value = '';
}

function manageEventListeners() {
  const addProjectBtn = document.getElementById('create-project');
  addProjectBtn.addEventListener('click', () => { // May change from anonymous to named function in same file for factorability
    handleState(1, false);
  })

  const closeProjectBtn = document.getElementById('pmodal-close');
  closeProjectBtn.addEventListener('click', () => {
    handleState(0, false);
  })

  const submitProjectBtn = document.getElementById('submit-project');
  submitProjectBtn.addEventListener('click', () => {
    handleState(0, true);
  })

  const addTodoBtn = document.getElementById('create-todo');
  addTodoBtn.addEventListener('click', () => {
    if (projectManager.getActiveProject()) console.log('Pass');
    else console.log('Test fail');
  })
}

function init() { // Main screen controller function
  loadPage();
  manageEventListeners();
}

init(); // Screen controller call