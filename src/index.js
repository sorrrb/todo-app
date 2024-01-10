import './style.css';
import loadPage from './pageload';

function init() {
  // Create initial content container
  const container = document.createElement('div');
  container.id = 'content';
  document.body.appendChild(container);

  loadPage();
}

init(); // Initial pageload