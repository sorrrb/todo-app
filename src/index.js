import './style.css';
import loadPage from './modules/load';
import { handleNewProject } from './modules/load';

function manageEventListeners() {
  const createBtn = document.getElementById('create'); // Project Creation
  const projectModal = document.getElementById('projectmodal');

  createBtn.addEventListener('click', () => {
    projectModal.style.display = 'block';
  })

  const cancelProjectBtn = document.getElementById('pclose'); // Abort Project Creation

  cancelProjectBtn.addEventListener('click', () => {
    projectModal.style.display = 'none';
  })

  const submitProjectBtn = document.getElementById('psubmit'); // Complete Project Creation

  submitProjectBtn.addEventListener('click', () => {
    const name = document.getElementById('pname');
    const projectList = document.getElementById('context');
    const newProject = handleNewProject(name.value);
    projectList.appendChild(newProject);
    name.value = '';
    projectModal.style.display = 'none';
  })
}

function init() { // Main function definition to run application
  loadPage();
  manageEventListeners();
}

init(); // Main function call