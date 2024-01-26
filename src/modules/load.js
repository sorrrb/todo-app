import createIcon from '../assets/media/square-plus.svg'
import closeIcon from '../assets/media/close.svg';
import searchIcon from '../assets/media/search.svg';

function createHeader() { // Responsible for generating elements for applet style
  const header = document.createElement('header');
  header.id = 'header';

  const title = document.createElement('h1');
  title.textContent = 'To-Do';
  title.id = 'page-title';

  header.appendChild(title);

  return header;
}

function createMainProjects() { // Helper responsible for generating sidebar elements
  const projects = document.createElement('div');
  projects.id = 'projects';

  const projectsTitle = document.createElement('h2');
  projectsTitle.id = 'projects-title';
  projectsTitle.textContent = 'Your Projects';

  const projectsContainer = document.createElement('div');
  projectsContainer.id = 'projects-container';

  projects.appendChild(projectsTitle);
  projects.appendChild(projectsContainer);

  return projects;
}

function createDisplayMain() {
  const display = document.createElement('nav');
  display.id = 'todo-menu';

  const searchbarWrapper = document.createElement('div');
  searchbarWrapper.id = 'searchbar-container';

  const searchbarIcon = new Image();
  searchbarIcon.src = searchIcon;
  searchbarIcon.id = 'searchbar-icon';

  const searchbar = document.createElement('input');
  searchbar.type = 'searchbar';
  searchbar.id = 'todo-search';

  const createBtn = document.createElement('button');
  createBtn.id = 'create-todo';
  createBtn.innerHTML = `Add a Todo &#10133;`;

  searchbarWrapper.appendChild(searchbarIcon);
  searchbarWrapper.append(searchbar);

  display.appendChild(searchbarWrapper);
  display.appendChild(createBtn);

  return display;
}

function createMain() { // Responsible for generating elements for applet style/functionality
  const main = document.createElement('main');
  main.id = 'main';

  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';

  const projects = createMainProjects();

  const addProjectBtn = document.createElement('button');
  addProjectBtn.id = 'create-project';

  const btnIcon = new Image();
  btnIcon.src = createIcon;

  const btnText = document.createElement('p');
  btnText.textContent = 'Add New Project';

  addProjectBtn.appendChild(btnText);
  addProjectBtn.appendChild(btnIcon);

  sidebar.appendChild(projects);
  sidebar.appendChild(addProjectBtn);

  main.appendChild(sidebar);

  const display = document.createElement('div');
  display.id = 'display';

  const displayMenu = createDisplayMain();

  display.appendChild(displayMenu);

  main.appendChild(display);

  return main;
}

function createProjectModal() { // Responsible for providing interface to add to-dos to projects
  const modal = document.createElement('div');
  modal.id = 'project-modal';

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('header');
  modalHeader.classList.add('modal-header');

  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'Add a new Project:';

  const closeModalBtn = new Image();
  closeModalBtn.id = 'pmodal-close';
  closeModalBtn.classList.add('close-modal');
  closeModalBtn.src = closeIcon;

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeModalBtn);

  const modalForm = document.createElement('form');
  modalForm.onsubmit = function () { return false };
  const projectNameField = document.createElement('input');
  projectNameField.id = 'ptitle';
  projectNameField.maxLength = 16;
  projectNameField.placeholder = 'Enter Project Title';
  projectNameField.type = 'text';

  const modalSubmit = document.createElement('button');
  modalSubmit.id = 'submit-project';
  modalSubmit.classList.add('submit-btn');
  modalSubmit.type = 'button';
  modalSubmit.textContent = 'Add Project';

  modalForm.appendChild(projectNameField);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalForm);
  modalContent.appendChild(modalSubmit);

  modal.appendChild(modalContent);

  return modal;
}

function createTodoModal() { // Responsible for providing interface to add projects to project manager
  const modal = document.createElement('div');
  modal.id = 'todo-modal';

  return modal;
}



function paintDisplay() { // Responsible for painting main display style
  const header = createHeader();
  const main = createMain();
  const projectModal = createProjectModal();
  const todoModal = createTodoModal();

  const webpage = document.body;
  webpage.appendChild(header);
  webpage.appendChild(main);
  webpage.appendChild(projectModal);
  webpage.appendChild(todoModal);
}

function updateDisplay() { // Responsible for updating display projects/todos

}

function loadPage() {
  paintDisplay();


}

export default loadPage;