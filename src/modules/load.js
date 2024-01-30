import Logo from '../assets/media/book-open.svg';
import AllIcon from '../assets/media/file-text.svg';
import TodayIcon from '../assets/media/calendar.svg';
import UpcomingIcon from '../assets/media/clock.svg';
import ProjectIcon from '../assets/media/folder.svg';

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
  title.textContent = `${name}`;

  folder.appendChild(icon);
  folder.appendChild(title);

  return folder;
}


function createMain() {
  const main = document.createElement('main');
  main.id = 'main';

  const sidebar = document.createElement('section');
  sidebar.id = 'sidebar';

  const systemProjects = document.createElement('div');
  systemProjects.classList.add('project-container');

  const userProjects = document.createElement('div');
  userProjects.classList.add('project-container');

  const defaultFolder = document.createElement('div');
  defaultFolder.id = 'system-projects';

  const personalFolder = document.createElement('div');
  personalFolder.id = 'user-projects';

  const allProjects = createProjectFolder('All', AllIcon);
  const todayProjects = createProjectFolder('Today', TodayIcon);
  const upcomingProjects = createProjectFolder('Upcoming', UpcomingIcon);

  defaultFolder.appendChild(allProjects);
  defaultFolder.appendChild(todayProjects);
  defaultFolder.appendChild(upcomingProjects);

  const personalFolderTitle = document.createElement('h2');
  personalFolderTitle.innerHTML = '&#9964; Your Projects &#9964;';

  const defaultProjects = createProjectFolder('Default Project', ProjectIcon);

  const userProjectsWrapper = document.createElement('div');
  userProjectsWrapper.id = 'user-projects-wrapper';
  userProjectsWrapper.appendChild(defaultProjects);

  personalFolder.appendChild(personalFolderTitle);
  personalFolder.appendChild(userProjectsWrapper);

  systemProjects.appendChild(defaultFolder);
  userProjects.appendChild(personalFolder);

  const projectBtn = document.createElement('button');
  projectBtn.id = 'create-project';
  projectBtn.innerHTML = `&#43;`;
  
  sidebar.appendChild(systemProjects);
  sidebar.appendChild(userProjects);
  sidebar.appendChild(projectBtn);

  const display = document.createElement('section');
  display.id = 'display';

  main.appendChild(sidebar);
  main.appendChild(display);

  return main;
}


function loadPage() { // Responsible for generating page skeleton and appending to document body
  const pages = [];

  const header = createHeader();
  const main = createMain();

  pages.push(header);
  pages.push(main);

  pages.forEach((page) => {
    document.body.appendChild(page);
  })
}

export default loadPage;