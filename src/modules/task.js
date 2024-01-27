function createTodo(title, description, dueDate, priority) { // Responsible for creating Todo objects (which have properties/methods related to generating 'tasks that are needed to do')
  const getTitle = () => title;

  const getDescription = () => description;

  const getDueDate = () => dueDate;

  const getPriority = () => priority;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority
  };
}

function createProject(title, id) { // Responsible for creating Project objects (which hold todo objects relating to storing/collecting 'tasks that are needed to do')
  let todos = [];

  const getTitle = () => title;

  const getId = () => id;

  const getTodos = () => todos;

  const addTodo = todoObj => {
    todos.push(todoObj);
  }

  const removeTodo = todoObj => {
    todos = todos.filter((todo) => todo !== todoObj);
  }

  return {
    getTitle,
    getId,
    getTodos,
    addTodo,
    removeTodo
  }
}

const projectManager = (function () { // Responsible for storing/accessing/modifying Project objects
  let projects = [];

  let activeProject = null;

  const getActiveProject = () => activeProject;
  const setActiveProject = projectId => {
    activeProject = projects.find((project) => project.getId() === projectId);
  }

  const addProject = projectObj => {
    projects.push(projectObj);
  }

  const removeProject = projectObj => {
    projects = projects.filter((project) => project !== projectObj);
  }

  const getProjects = () => projects;

  return {
    getActiveProject,
    setActiveProject,
    addProject,
    removeProject,
    getProjects
  }
})();

module.exports = {
  createTodo,
  createProject,
  projectManager
}