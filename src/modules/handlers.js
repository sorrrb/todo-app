import CloseIcon from '../assets/media/close.svg';
import FolderIcon from '../assets/media/folder.svg';
import { projectManager, createProject, createTodo } from '../modules/task';
import { createProjectFolder, createProjectHeader } from '../modules/load';

const displayManager = (function () { // Use this to display todos???
  return {

  }
})();

function toggleModalDisplay() { // Toggles modal display value
  const modal = document.getElementById('modal');
  modal.classList.toggle('inactive');
  modal.classList.toggle('active');
}

function generateProjectFolders() {
  const content = document.getElementById('user-projects');
  content.innerHTML = '';

  const folders = projectManager.getProjects();

  const header = createProjectHeader(folders.length);
  content.appendChild(header);

  folders.forEach((folder) => {
    const tab = createProjectFolder(folder.getTitle(), FolderIcon, folder.getId());
    tab.addEventListener('click', tabHandler);
    content.appendChild(tab);
  })
}

function submitProjectModal() {
  const content = document.getElementById('modal-content');
  const input = content.querySelector('input').value;
  const warning = content.querySelector('p.form-warning');
  
  if (!input) {
    warning.style.display = 'block';
    return;
  }

  const projects = projectManager.getProjects();

  const newProject = createProject(input, projects.length);
  projectManager.addProject(newProject);
  generateProjectFolders();
  toggleModalDisplay();

  const createProjectBtn = document.getElementById('create-project'); // Reimplement event listener for create project button
  createProjectBtn.addEventListener('click', createHandler);
}

function generateProjectModal() {
  const content = document.getElementById('modal-content');
  content.innerHTML = '';

  const header = document.createElement('header');

  const title = document.createElement('h2');
  title.textContent = 'Create a new project: ';

  const exit = new Image();
  exit.src = CloseIcon;
  exit.id = 'close-modal';
  exit.addEventListener('click', toggleModalDisplay);

  header.appendChild(title);
  header.appendChild(exit);

  const form = document.createElement('form');

  const label = document.createElement('label');
  label.textContent = 'Project Name: ';

  const asterisk = document.createElement('span');
  asterisk.classList.add('required');
  asterisk.textContent = '*';

  label.appendChild(asterisk);

  const input = document.createElement('input');

  const validateMsg = document.createElement('p');
  validateMsg.textContent = 'Please fill out the required field!';
  validateMsg.classList.add('form-warning');

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(validateMsg);

  const modalBtns = document.createElement('div');
  modalBtns.classList.add('modal-buttons');

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submit-modal';
  submitBtn.textContent = 'Submit';
  submitBtn.addEventListener('click', submitProjectModal);

  const cancelBtn = document.createElement('button');
  cancelBtn.id = 'cancel-modal';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', toggleModalDisplay);

  modalBtns.appendChild(submitBtn);
  modalBtns.appendChild(cancelBtn);

  content.appendChild(header);
  content.appendChild(form);
  content.appendChild(modalBtns);
}

function createHandler() { // Handles logic after pressing create project button
  toggleModalDisplay();
  if (this.id === 'create-project') generateProjectModal();
}

function tabHandler() {
  const projects = document.querySelectorAll('div.project-folder');
  projects.forEach((project) => {
    if (project.classList.contains('active-folder')) project.classList.toggle('active-folder');
  });
  this.classList.toggle('active-folder');
  console.log(this.hasAttribute('data-index')); // log boolean value if folder clicked was user project folder
}

export function manageEventListeners() {
  const defaultActiveProject = document.querySelector('div.project-folder'); // Sets default active project to All
  defaultActiveProject.classList.add('active-folder');

  const createProjectBtn = document.getElementById('create-project');
  createProjectBtn.addEventListener('click', createHandler);

  const projects = document.querySelectorAll('div.project-folder');
  projects.forEach((project) => {
    project.addEventListener('click', tabHandler);
  });
}