import CloseIcon from '../assets/media/close.svg';
import FolderIcon from '../assets/media/folder.svg';
import { projectManager, createProject, createTodo } from '../modules/task';
import { createProjectFolder, createProjectHeader, createTodoHeader } from '../modules/load';



const displayManager = (function () { // Use this to display todos???
  let activeTab = null;

  const getActiveTab = () => activeTab;
  const setActiveTab = tab => {
    activeTab = tab;
  }

  return {
    getActiveTab,
    setActiveTab
  }
})();



function toggleModalDisplay() { // Toggles modal display value
  const modal = document.getElementById('modal');
  modal.classList.toggle('inactive');
  modal.classList.toggle('active');
}



function generateTodoFolders() {
  const content = document.getElementById('display-controls');
  content.innerHTML = '';

  if (typeof(displayManager.getActiveTab() === 'object')) {
    const foldersName = displayManager.getActiveTab().getTitle();
    const folders = displayManager.getActiveTab().getTodos();

    const header = createTodoHeader(folders.length, foldersName);
    content.appendChild(header);
    
    folders.forEach((folder) => {
      console.log('LOL');
    })
  }
}



function generateProjectFolders() {
  const content = document.getElementById('user-projects');
  content.innerHTML = '';

  const folders = projectManager.getProjects();

  const header = createProjectHeader(folders.length);
  content.appendChild(header);

  folders.forEach((folder) => {
    const tab = createProjectFolder(folder.getTitle().toUpperCase(), FolderIcon, folder.getId());
    tab.addEventListener('click', tabHandler);
    content.appendChild(tab);
  })
}


function submitTodoModal() {
  const content = document.getElementById('modal-content');
  const input = content.querySelector('input').value;
  const nameWarning = content.querySelector('p.form-warning');
  const projectWarning = content.querySelector('p.project-select-warning');
  
  if (!input) {
    nameWarning.style.display = 'block';
    return;
  }

  const todos = displayManager.getActiveTab();

  if (typeof(todos) === 'string') {
    projectWarning.style.display = 'block';
    return;
  }

  const description = document.getElementById('todo-description').value;
  const deadline = document.getElementById('todo-deadline').value;
  const priority = document.getElementById('todo-priority').value;

  const newTodo = createTodo(input, description, deadline, priority);
  todos.addTodo(newTodo);
  generateTodoFolders();
  toggleModalDisplay();

  const createTodoBtn = document.getElementById('create-todo');
  createTodoBtn.addEventListener('click', createHandler);
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

function generateTodoModal() {
  const content = document.getElementById('modal-content');
  content.innerHTML = '';

  const header = document.createElement('header');

  const title = document.createElement('h2');
  title.textContent = 'Create a new task: ';

  const exit = new Image();
  exit.src = CloseIcon;
  exit.id = 'close-modal';
  exit.addEventListener('click', toggleModalDisplay);

  header.appendChild(title);
  header.appendChild(exit);

  const form = document.createElement('form');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Task Name: ';

  const nameAsterisk = document.createElement('span');
  nameAsterisk.classList.add('required');
  nameAsterisk.textContent = '*';

  nameLabel.appendChild(nameAsterisk);

  const nameInput = document.createElement('input');
  nameInput.id = 'todo-name';

  const validateMsg = document.createElement('p');
  validateMsg.textContent = 'Please fill out the required field!';
  validateMsg.classList.add('form-warning');

  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Task Description:';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'todo-description';

  const deadlineLabel = document.createElement('label');
  deadlineLabel.textContent = 'Task Due Date:';

  const deadlineInput = document.createElement('input');
  deadlineInput.type = 'date';
  deadlineInput.id = 'todo-deadline';

  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Task Priority:';

  const prioritySelect = document.createElement('select');
  prioritySelect.id = 'todo-priority';
  
  const lowPriority = document.createElement('option');
  lowPriority.value = 'low';
  lowPriority.textContent = 'Low';

  const medPriority = document.createElement('option');
  medPriority.value = 'med';
  medPriority.textContent = 'Medium';

  const highPriority = document.createElement('option');
  highPriority.value = 'high';
  highPriority.textContent = 'High';

  prioritySelect.appendChild(lowPriority);
  prioritySelect.appendChild(medPriority);
  prioritySelect.appendChild(highPriority);

  const folderWarning = document.createElement('p');
  folderWarning.textContent = 'Please create & select a folder first!';
  folderWarning.classList.add('form-warning');
  folderWarning.classList.add('project-select-warning');

  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(validateMsg);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(deadlineLabel);
  form.appendChild(deadlineInput);
  form.appendChild(priorityLabel);
  form.appendChild(prioritySelect);
  form.appendChild(folderWarning);

  const modalBtns = document.createElement('div');
  modalBtns.classList.add('modal-buttons');

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submit-modal';
  submitBtn.textContent = 'Submit';
  submitBtn.addEventListener('click', submitTodoModal);

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
  if (this.id === 'create-todo') generateTodoModal();
}



function tabHandler() { // Handles logic after pressing project folder buttons
  const projects = document.querySelectorAll('div.project-folder');
  projects.forEach((project) => {
    if (project.classList.contains('active-folder')) project.classList.toggle('active-folder');
  });
  this.classList.toggle('active-folder');

  if (this.hasAttribute('data-index')) {
    const projectList = projectManager.getProjects();
    displayManager.setActiveTab(projectList[this.dataset.index]);
    generateTodoFolders();
  }
  
  else {
    displayManager.setActiveTab(this.querySelector('h3').textContent);
    console.log(displayManager.getActiveTab());
  }

  const createTodoBtn = document.getElementById('create-todo');
  createTodoBtn.addEventListener('click', createHandler);
}



function setDefaultProject() {
  const defaultActiveProject = document.querySelector('div.project-folder'); // Sets default active project to All
  defaultActiveProject.classList.add('active-folder');
  displayManager.setActiveTab(defaultActiveProject.querySelector('h3').textContent);
}



export function manageEventListeners() {
  setDefaultProject();

  const createProjectBtn = document.getElementById('create-project');
  createProjectBtn.addEventListener('click', createHandler);

  const createTodoBtn = document.getElementById('create-todo');
  createTodoBtn.addEventListener('click', createHandler);

  const projects = document.querySelectorAll('div.project-folder');
  projects.forEach((project) => {
    project.addEventListener('click', tabHandler);
  });
}