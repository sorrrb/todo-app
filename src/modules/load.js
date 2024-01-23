import CreateIcon from '../assets/media/square-plus.svg';
import ProjectIcon from '../assets/media/folder.svg';
import { projectManager, createProject, createTodo } from './task';

function handleNewProject(name, id = null) {
  const newProject = createProject(name, id);

  projectManager.addProject(newProject);
  const output = createProjectButton(name);

  return output;
}

function createProjectButton(projectName) {
  const output = document.createElement('div');
  output.classList.add('project');

  const name = document.createElement('h3');
  name.textContent = projectName;

  const icon = new Image();
  icon.src = ProjectIcon;

  output.appendChild(icon);
  output.appendChild(name);

  return output;
}

function createHeader() {
  const header = document.createElement('header');

  const headerText = document.createElement('h1');
  headerText.textContent = 'TO-DO';
  header.appendChild(headerText);

  return header;
}

function createMain() {
  const main = document.createElement('main');
  main.id = 'content';

  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';

  const info = document.createElement('div');
  info.id = 'context';
  const infoTitle = document.createElement('h2');
  infoTitle.textContent = 'Your Projects';
  info.appendChild(infoTitle);

  const defaultProject = handleNewProject('Default Project', 0);
  info.appendChild(defaultProject);

  sidebar.appendChild(info);

  const create = document.createElement('div');
  create.id = 'create';
  create.textContent = 'Create New';
  const createBtn = new Image();
  createBtn.src = CreateIcon;
  create.appendChild(createBtn);
  sidebar.appendChild(create);

  main.appendChild(sidebar);

  const display = document.createElement('div');
  display.id = 'display';
  main.appendChild(display);

  return main;
}

function createProjectModal() {
  const modal = document.createElement('div');
  modal.id = 'projectmodal';

  const modalContent = document.createElement('div');
  const modalText = document.createElement('p');
  modalText.textContent = 'Lorem ipsum blah blah blah';
  
  modalContent.appendChild(modalText);
  modal.appendChild(modalContent);

  return modal;
}

function createTodoModal() {
  const modal = document.createElement('div');
  modal.id = 'todomodal';

  const modalContent = document.createElement('div');
  const modalText = document.createElement('p');
  modalText.textContent = 'Lorem ipsum blah blah blah';
  
  modalContent.appendChild(modalText);
  modal.appendChild(modalContent);

  return modal;
}

function loadPage() {
  const page = document.body;

  const header = createHeader();
  const content = createMain();
  const projectModal = createProjectModal();
  const todoModal = createTodoModal();

  page.appendChild(header);
  page.appendChild(content);
  page.appendChild(projectModal);
  page.appendChild(todoModal);
}

export default loadPage;