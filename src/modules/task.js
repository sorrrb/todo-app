function createTodo(title, description, dueDate, priority) { // Responsible for creating Todo objects (which have properties/methods related to generating 'tasks that are needed to do')
  const getTitle = () => title;
  const setTitle = newTitle => title = newTitle;

  const getDescription = () => description;
  const setDescription = newDescription => description = newDescription;

  const getDueDate = () => dueDate;
  const setDueDate = newDueDate => dueDate = newDueDate;

  const getPriority = () => priority;
  const setPriority = newPriority => priority = newPriority;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    setTitle,
    setDescription,
    setDueDate,
    setPriority
  };
}

function createProject(title, ref) { // Responsible for creating Project objects (which hold todo objects relating to storing/collecting 'tasks that are needed to do')
  let todos = [];
  let id = ref;

  const getTitle = () => title;

  const getId = () => id;
  const setId = newId => id = newId;

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
    setId,
    getTodos,
    addTodo,
    removeTodo
  }
}

const projectManager = (function () { // Responsible for storing/accessing/modifying Project objects
  let projects = [];

  const addProject = projectObj => {
    projects.push(projectObj);
  }

  const removeProject = projectObj => {
    projects = projects.filter((project) => project !== projectObj);
  }

  const getProjects = () => projects;

  return {
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