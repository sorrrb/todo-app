import './style.css';
import { loadPage } from './modules/load';
import { manageEventListeners } from './modules/handlers';

function init() { // Main screen controller function
  loadPage();
  manageEventListeners();
}

init(); // Screen controller call