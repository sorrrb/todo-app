import Logo from '../assets/media/book-open.svg';
import AddIcon from '../assets/media/plus-circle.svg';
import AllIcon from '../assets/media/file-text.svg';
import TodayIcon from '../assets/media/calendar.svg';
import UpcomingIcon from '../assets/media/clock.svg';
import UrgentIcon from '../assets/media/alert-circle.svg';
import CompletedIcon from '../assets/media/check-square.svg';

// Helper function to capitalize string
function capitalize(string) {
  const firstLetter = string.charAt(0);
  const remainingLetters = string.slice(1);

  return firstLetter.toUpperCase() + remainingLetters;
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

  if (typeof(dataId) === 'number') folder.dataset.index = dataId;

  const icon = new Image();
  icon.src = src;

  const title = document.createElement('h3');

  title.textContent = `${capitalize(name)}`;

  folder.appendChild(icon);
  folder.appendChild(title);

  return folder;
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