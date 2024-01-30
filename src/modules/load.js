import Logo from '../assets/media/book-open.svg';
import AllIcon from '../assets/media/file-text.svg';
import TodayIcon from '../assets/media/calendar.svg';
import UpcomingIcon from '../assets/media/clock.svg';
import UrgentIcon from '../assets/media/alert-circle.svg';
import CompletedIcon from '../assets/media/check-square.svg';
import ProjectIcon from '../assets/media/folder.svg';

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

function createProjectFolder(name, src) {
  const folder = document.createElement('div');
  folder.classList.add('project-folder');

  const icon = new Image();
  icon.src = src;

  const title = document.createElement('h3');

  title.textContent = `${capitalize(name)}`;

  folder.appendChild(icon);
  folder.appendChild(title);

  return folder;
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

  const userProjectsHeader = document.createElement('header');
  userProjectsHeader.id = 'projects-info';
  const userProjectsText = document.createElement('h3');
  userProjectsText.textContent = 'Your Projects (0)';
  const userProjectsButton = document.createElement('button');
  userProjectsButton.id = 'create-project';
  userProjectsButton.innerHTML = '&#128933;';

  userProjectsHeader.appendChild(userProjectsText);
  userProjectsHeader.appendChild(userProjectsButton);

  userNav.appendChild(userProjectsHeader);

  sidebar.appendChild(systemNav);
  sidebar.appendChild(userNav);

  const display = document.createElement('section');
  display.id = 'display';

  main.appendChild(sidebar);
  main.appendChild(display);

  return main;
}




function createModal() {
  const modal = document.createElement('div');
  modal.id = 'modal';

  const content = document.createElement('section');
  content.classList.add('modal-content');

  modal.appendChild(content);

  return modal;
}




function loadPage() { // Responsible for generating page skeleton and appending to document body
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

export default loadPage;