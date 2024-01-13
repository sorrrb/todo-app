function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');

  const addProjectBtn = document.createElement('button');
  addProjectBtn.textContent = 'Add New Project';

  const defaultProjectBtn = document.createElement('button');
  defaultProjectBtn.textContent = 'Default Project';

  sidebar.appendChild(addProjectBtn);
  sidebar.appendChild(defaultProjectBtn);

  return sidebar;
}

function createContent() {
  const content = document.createElement('div');
  content.classList.add('content');

  return content;
}

function load() {
  const page = document.body;
  const sidebar = createSidebar();
  const content = createContent();

  page.appendChild(sidebar);
  page.appendChild(content);
}

export default load;