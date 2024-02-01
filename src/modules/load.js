import Logo from '../assets/media/book-open.svg';
import AddIcon from '../assets/media/plus-circle.svg';
import AllIcon from '../assets/media/file-text.svg';
import TodayIcon from '../assets/media/calendar.svg';
import UpcomingIcon from '../assets/media/clock.svg';
import UrgentIcon from '../assets/media/alert-circle.svg';
import CompletedIcon from '../assets/media/check-square.svg';
import FolderIcon from '../assets/media/folder.svg';
import EditIcon from '../assets/media/edit.svg';
import DeleteIcon from '../assets/media/trash.svg';
import { format } from 'date-fns';

// Helper function to capitalize string
function capitalize(string) {
  const firstLetter = string.charAt(0);
  const remainingLetters = string.slice(1);

  return firstLetter.toUpperCase() + remainingLetters;
}

// Helper function to create Date Object from given duedate string
function createDate(string) {
  const year = string.slice(0, 4);
  const month = string.slice(5, 7);
  const day = string.slice(8);

  const date = new Date(year, month - 1, day);

  return date;
}

// Page skeleton is loaded

function createHeader() {
  const header = document.createElement('header');
  header.id = 'header';
  
  const title = document.createElement('div');
  title.id = 'logo-container';
  const text = document.createElement('h1');
  text.textContent = 'TO-DO';

  const logo = new Image();
  logo.src = Logo;

  title.appendChild(logo);
  title.appendChild(text);
  header.appendChild(title);

  return header;
}

export function createProjectFolder(name, src, dataId) {
  const folder = document.createElement('div');
  folder.classList.add('project-folder');

  const leftFolder = document.createElement('div');
  leftFolder.classList.add('project-folder-left');

  const rightFolder = document.createElement('div');
  rightFolder.classList.add('project-folder-right');

  const projectIcon = new Image();
  projectIcon.src = src;

  const title = document.createElement('h3');

  title.textContent = `${capitalize(name)}`;

  if (typeof(dataId) === 'number') {
    folder.dataset.index = dataId;

    const deleteIcon = new Image();
    deleteIcon.src = DeleteIcon;
    deleteIcon.classList.add('delete-project');

    rightFolder.appendChild(deleteIcon);
  }

  leftFolder.appendChild(projectIcon);
  leftFolder.appendChild(title);

  folder.appendChild(leftFolder);
  folder.appendChild(rightFolder);

  return folder;
}

export function createTodoFolder(name, description, deadline, priority, index) {
  const container = document.createElement('div');
  container.classList.add('collapsible-wrapper');
  container.dataset.index = index;

  const folder = document.createElement('div');
  folder.classList.add('collapsible-folder');
  folder.classList.add('todo-folder');

  const title = document.createElement('h4');
  title.textContent = name;
  title.style.textDecoration = 'underline';

  const notes = document.createElement('p');
  notes.textContent = description;

  const dueDate = document.createElement('p');
 
  if (deadline === '') {
    const today = new Date();
    dueDate.textContent = format(today, "MM/dd/yyyy");
  }

  else {
    const dateFormat = createDate(deadline);
    dueDate.textContent = format(dateFormat, "MM/dd/yyyy");
  }

  switch(priority) {
    case 'low':
      folder.classList.add('low-priority');
      break;
    case 'med':
      folder.classList.add('med-priority');
      break;
    case 'high':
      folder.classList.add('high-priority');
      break;
  }

  const folderLeft = document.createElement('div');
  folderLeft.classList.add('todo-folder-left');

  const folderRight = document.createElement('div');
  folderRight.classList.add('todo-folder-right');

  const editIcon = new Image();
  editIcon.classList.add('edit-todo');
  editIcon.src = EditIcon;

  const deleteIcon = new Image();
  deleteIcon.classList.add('delete-todo');
  deleteIcon.src = DeleteIcon;

  const expandIcon = document.createElement('h1');
  expandIcon.innerHTML = '&plus;';

  const collapsible = document.createElement('div');
  collapsible.classList.add('collapsible-content');
  collapsible.classList.add('hidden');

  const descriptionExpand = document.createElement('p');
  descriptionExpand.textContent = (description === '' ? 'N/A' : description);

  collapsible.appendChild(descriptionExpand);

  folderLeft.appendChild(title);
  folderLeft.appendChild(dueDate);

  folderRight.appendChild(editIcon);
  folderRight.appendChild(deleteIcon);
  folderRight.appendChild(expandIcon);

  folder.appendChild(folderLeft);
  folder.appendChild(folderRight);

  container.appendChild(folder);
  container.appendChild(collapsible);

  return container;
}

export function createTodoHeader(todoQuantity, name) {
  const header = document.createElement('header');
  header.id = 'todos-info';

  const text = document.createElement('h2');
  text.textContent = `Tasks (${todoQuantity})`;

  const projectTab = document.createElement('div');
  
  const tabIcon = new Image();

  switch(name) {
    case 'All':
      tabIcon.src = AllIcon;
      break;
    case 'Today':
      tabIcon.src = TodayIcon;
      break;
    case 'Upcoming':
      tabIcon.src = UpcomingIcon;
      break;
    case 'Urgent':
      tabIcon.src = UrgentIcon;
      break;
    case 'Completed':
      tabIcon.src = CompletedIcon;
      break;
    default:
      tabIcon.src = FolderIcon;
      break;
  }

  const tabName = document.createElement('h2');
  tabName.textContent = name;

  const createIcon = new Image();
  createIcon.id = 'create-todo';
  createIcon.src = AddIcon;

  projectTab.appendChild(tabIcon);
  projectTab.appendChild(tabName);

  header.appendChild(projectTab);
  header.appendChild(text);
  header.appendChild(createIcon);

  return header;
}

export function createProjectHeader(projectQuantity) {
  const header = document.createElement('header');
  header.id = 'projects-info';

  const text = document.createElement('h3');
  text.textContent = `Your Projects (${projectQuantity})`;

  const btn = document.createElement('button');
  btn.id = 'create-project';
  
  const img = new Image();
  img.src = AddIcon;

  btn.appendChild(img);

  header.appendChild(text);
  header.appendChild(btn);

  return header;
}



function createMain() {
  const main = document.createElement('main');
  main.id = 'main';

  const sidebar = document.createElement('section');
  sidebar.id = 'sidebar';

  const systemNav = document.createElement('div');
  systemNav.id = 'system-projects';

  const userNav = document.createElement('div');
  userNav.id = 'user-projects';

  const systemProjects = {
    all: AllIcon,
    today: TodayIcon,
    upcoming: UpcomingIcon,
    urgent: UrgentIcon,
    completed: CompletedIcon
  }

  for (const prop in systemProjects) {
    const systemFolder = createProjectFolder(prop, systemProjects[prop]);
    systemNav.appendChild(systemFolder);
  }

  const userProjectsHeader = createProjectHeader(0); 

  userNav.appendChild(userProjectsHeader);

  sidebar.appendChild(systemNav);
  sidebar.appendChild(userNav);

  const display = document.createElement('section');
  display.id = 'display';

  const displayNav = document.createElement('div');
  displayNav.id = 'display-controls';

  const displayHeader = createTodoHeader(0, 'All');

  const displayTodos = document.createElement('div');
  displayTodos.id = 'user-todos';

  displayNav.appendChild(displayHeader);

  display.appendChild(displayNav);
  display.appendChild(displayTodos);

  main.appendChild(sidebar);
  main.appendChild(display);

  return main;
}




function createModal() {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList.add('inactive');

  const content = document.createElement('div');
  content.id = 'modal-content';

  modal.appendChild(content);

  return modal;
}




export function loadPage() { // Responsible for generating page skeleton and appending to document body
  const pages = [];

  const header = createHeader();
  const main = createMain();
  const modal = createModal();

  pages.push(header);
  pages.push(main);
  pages.push(modal);

  pages.forEach((page) => {
    document.body.appendChild(page);
  })
}