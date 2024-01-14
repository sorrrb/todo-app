function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalHead = document.createElement('header');
  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'Create a new:';
  const modalEscapeBtn = document.createElement('button');
  modalEscapeBtn.textContent = 'X';

  modalHead.appendChild(modalTitle);
  modalHead.appendChild(modalEscapeBtn);

  const modalType = document.createElement('section');

  const projectOptionWrapper = document.createElement('div');
  const projectLabel = document.createElement('label');
  projectLabel.textContent = 'Project:';
  const projectSelect = document.createElement('input');
  projectSelect.type = 'checkbox';
  projectOptionWrapper.appendChild(projectLabel);
  projectOptionWrapper.appendChild(projectSelect);

  const todoOptionWrapper = document.createElement('div');
  const todoLabel = document.createElement('label');
  todoLabel.textContent = 'Todo:';
  const todoSelect = document.createElement('input');
  todoSelect.type = 'checkbox';
  todoOptionWrapper.appendChild(todoLabel);
  todoOptionWrapper.appendChild(todoSelect);

  modalType.appendChild(projectOptionWrapper);
  modalType.appendChild(todoOptionWrapper);

  const modalForm = document.createElement('form');

  const formName = document.createElement('input');
  formName.type = 'text';
  formName.placeholder = 'Title: Run errands';

  const formDescription = document.createElement('textarea');
  formDescription.placeholder = 'Description: Go grocery shopping, return those pants, get oil change';
  formDescription.rows = 5;
  formDescription.cols = 50;

  const formInputWrappers = document.createElement('div');
  formInputWrappers.classList.add('form-wrappers');

  const formInputLeft = document.createElement('div');
  formInputLeft.classList.add('leftside-wrappers');

  const formInputRight = document.createElement('div');
  formInputRight.classList.add('rightside-wrappers');

  const formDeadline = document.createElement('div');
  formDeadline.classList.add('due-date-wrapper');
  const formDeadlineLabel = document.createElement('label');
  formDeadlineLabel.textContent = 'Due Date:';
  const formDeadlineInput = document.createElement('input');
  formDeadlineInput.type = 'date';

  const formPriority = document.createElement('div');
  formPriority.classList.add('priority-wrapper');
  const formPriorityLabel = document.createElement('label');
  formPriorityLabel.textContent = 'Priority:';
  const formPriorityInput = document.createElement('select');
  const info = document.createElement('option');
  info.textContent = '--- Choose an option: ---';
  const lowPriority = document.createElement('option');
  lowPriority.textContent = 'Low';
  const mediumPriority = document.createElement('option');
  mediumPriority.textContent = 'Medium';
  const highPriority = document.createElement('option');
  highPriority.textContent = 'High';

  const formSubmit = document.createElement('input');
  formSubmit.type = 'submit';
  formSubmit.textContent = 'Add';

  formPriorityInput.appendChild(info);
  formPriorityInput.appendChild(lowPriority);
  formPriorityInput.appendChild(mediumPriority);
  formPriorityInput.appendChild(highPriority);

  formPriority.appendChild(formPriorityLabel);
  formPriority.appendChild(formPriorityInput);

  formDeadline.appendChild(formDeadlineLabel);
  formDeadline.appendChild(formDeadlineInput);

  formInputLeft.appendChild(formDeadline);
  formInputLeft.appendChild(formPriority);

  formInputRight.appendChild(formSubmit);

  formInputWrappers.appendChild(formInputLeft);
  formInputWrappers.appendChild(formInputRight);
  
  modalForm.appendChild(formName);
  modalForm.appendChild(formDescription);
  modalForm.appendChild(formInputWrappers);

  modal.appendChild(modalHead);
  modal.appendChild(modalType);
  modal.appendChild(modalForm);

  return modal;
}

// Returns sidebar DOM element
function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');

  const title = document.createElement('h1');
  title.classList.add('logo');
  title.textContent = 'TO-DO';

  const addProjectBtn = document.createElement('button');
  addProjectBtn.textContent = 'Add New Project';

  const defaultProjectBtn = document.createElement('button');
  defaultProjectBtn.textContent = 'Default Project';

  sidebar.appendChild(title);
  sidebar.appendChild(addProjectBtn);
  sidebar.appendChild(defaultProjectBtn);

  return sidebar;
}

// Returns main content DOM element
function createContent() {
  const content = document.createElement('div');
  content.classList.add('content');

  return content;
}

// Generates/appends DOM elements to document body
function load() {
  const page = document.body;
  const sidebar = createSidebar();
  const content = createContent();
  const modal = createModal();

  page.appendChild(sidebar);
  page.appendChild(content);
  page.appendChild(modal);
}

export default load;