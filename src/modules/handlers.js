import CloseIcon from '../assets/media/close.svg';
import FolderIcon from '../assets/media/folder.svg';
import { projectManager, createProject, createTodo } from '../modules/task';
import { createProjectFolder, createProjectHeader, createTodoFolder, createTodoHeader } from '../modules/load';



const displayManager = (function () {
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



function deleteTodoFolder(todoIndex) { // Deletes todo folder from DOM given folder index
  const folders = displayManager.getActiveTab();
  const system = ['All', 'Today', 'Upcoming', 'Urgent', 'Completed'];

  if (system.includes(displayManager.getActiveTab())) {
    console.log('Error - Trying to delete from System Project Tab');
    return;
  };

  const todos = folders.getTodos();

  todos.forEach((todo) => {
    if (todo === todos[todoIndex]) {
      folders.removeTodo(todo);
      generateTodoFolders();
    }
  });
}

function editTodoFolder(todoIndex) {
  const folders = displayManager.getActiveTab();

  const todos = folders.getTodos();
  
  const activeTodo = todos[todoIndex];

  const title = activeTodo.getTitle();
  const description = activeTodo.getDescription();
  const deadline = activeTodo.getDueDate();
  const priority = activeTodo.getPriority();
  

  toggleModalDisplay();
  generateEditTodoModal(title, description, deadline, priority, todoIndex);
}



function generateTodoFolders() { // Creates todo folders and adds to DOM 
  const content = document.getElementById('display-controls');
  content.innerHTML = '';
  const container = document.getElementById('user-todos');
  container.innerHTML = '';

  const system = ['All', 'Today', 'Upcoming', 'Urgent', 'Completed'];

  if (system.includes(displayManager.getActiveTab())) {
    const foldersName = displayManager.getActiveTab();
    const folders = []; // Hard code empty array for now

    const header = createTodoHeader(folders.length, foldersName);
    content.appendChild(header);
  }

  else {
    const foldersName = displayManager.getActiveTab().getTitle();
    const folders = displayManager.getActiveTab().getTodos();

    const header = createTodoHeader(folders.length, foldersName);
    content.appendChild(header);

    let i = 0;
    
    folders.forEach((folder) => {
      const tab = createTodoFolder(folder.getTitle(), folder.getDescription(), folder.getDueDate(), folder.getPriority(), i);
      tab.addEventListener('click', tabHandler);
      container.appendChild(tab);
      i++;
    })
  }
}



function generateProjectFolders() { // Creates projects folders and adds to DOM
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



function submitEditTodoModal() {
  const content = document.getElementById('modal-content');
  const input = content.querySelector('input').value;
  const nameWarning = content.querySelector('p.form-warning');
  const projectWarning = content.querySelector('p.project-select-warning');
  
  if (!input) {
    nameWarning.style.display = 'block';
    return;
  }

  const activeProject = displayManager.getActiveTab();

  if (typeof(activeProject) === 'string') {
    projectWarning.style.display = 'block';
    return;
  }

  const description = document.getElementById('todo-description').value;
  const deadline = document.getElementById('todo-deadline').value;
  const priority = document.getElementById('todo-priority').value;

  const projectTasks = activeProject.getTodos();

  const todoIndex = document.getElementById('submit-modal').dataset.id;

  const activeTask = projectTasks[todoIndex];

  activeTask.setTitle(input);
  activeTask.setDescription(description);
  activeTask.setDueDate(deadline);
  activeTask.setPriority(priority);

  generateTodoFolders();
  toggleModalDisplay();

  const createTodoBtn = document.getElementById('create-todo');
  createTodoBtn.addEventListener('click', createHandler);
}



function generateEditTodoModal(oldTitle, oldDescription, oldDueDate, oldPriority, todoIndex) {
  const content = document.getElementById('modal-content');
  content.innerHTML = '';

  const header = document.createElement('header');

  const title = document.createElement('h2');
  title.textContent = 'Edit task: ';

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
  nameInput.value = oldTitle;

  const validateMsg = document.createElement('p');
  validateMsg.textContent = 'Please fill out the required field!';
  validateMsg.classList.add('form-warning');

  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Task Description:';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'todo-description';
  descriptionInput.value = oldDescription;

  const deadlineLabel = document.createElement('label');
  deadlineLabel.textContent = 'Task Due Date:';

  const deadlineInput = document.createElement('input');
  deadlineInput.type = 'date';
  deadlineInput.id = 'todo-deadline';
  deadlineInput.value = oldDueDate;

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

  prioritySelect.value = oldPriority;

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
  submitBtn.dataset.id = todoIndex;
  submitBtn.addEventListener('click', submitEditTodoModal);

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



function tabHandler(e) { // Handles logic after pressing project folder buttons
  if (this.classList.contains('collapsible-wrapper')) {
    if (e.target.classList.contains('delete-todo')) {
      deleteTodoFolder(this.dataset.index);
      const createTodoBtn = document.getElementById('create-todo');
      createTodoBtn.addEventListener('click', createHandler);
    }

    if (e.target.classList.contains('edit-todo')) {
      editTodoFolder(this.dataset.index);
    }

    let symbol;

    if (this.lastElementChild.classList.contains('hidden')) {
      symbol = 'minus';
      this.lastElementChild.classList.toggle('hidden');
      this.lastElementChild.classList.toggle('visible');
      this.querySelector('h1').innerHTML = `	&${symbol};`;
    }

    else if (this.lastElementChild.classList.contains('visible')) {
      symbol = 'plus';
      this.lastElementChild.classList.toggle('visible');
      this.lastElementChild.classList.toggle('hidden');
      this.querySelector('h1').innerHTML = `	&${symbol};`;
    }

    return;
  }

  const projects = document.querySelectorAll('div.project-folder');
  projects.forEach((project) => {
    if (project.classList.contains('active-folder')) project.classList.toggle('active-folder');
  });
  this.classList.toggle('active-folder');

  if (this.hasAttribute('data-index')) { // If tab clicked is user project
    const projectList = projectManager.getProjects();
    displayManager.setActiveTab(projectList[this.dataset.index]);
    generateTodoFolders();
  }
  
  else { // If tab clicked is system project
    displayManager.setActiveTab(this.querySelector('h3').textContent);
    generateTodoFolders();
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