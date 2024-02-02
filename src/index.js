import './style.css';
import { loadPage } from './modules/load';
import { manageEventListeners, checkLocalStorage } from './modules/handlers';

function init() { // Main screen controller function
  loadPage();
  manageEventListeners();
  checkLocalStorage();
}

init(); // Screen controller call