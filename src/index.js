import './style.css';
import createTask from './modules/projects';
import loadPage from './pageload';

function init() {
  // Create initial content container
  const container = document.createElement('div');
  container.id = 'content';
  document.body.appendChild(container);

  const test = createTask('Title', 'Description', '01-10-2024', 0, 'N/A', 'Default');
  console.log(test.getTitle());
  console.log(test.getDueDate());
  
  loadPage();
}

init(); // Initial pageload