// Interface to collect and hold projects
function projectManager() {
  // Array representing projects
  let projects = [];

  // Returns projects array
  const getProjects = () => projects;

  // Takes project object, adds it to projects array
  const addProject = project => {
    projects.push(project);
  }

  // Takes project object, removes it from projects array
  const removeProject = project => {
    projects = projects.filter((element) => element !== project);
  }

  return {
    getProjects,
    addProject,
    removeProject
  }
}



// Factory - object represents a collection of 'todo' objects
function createProject(name, id) {
  // Array representing todos
  let todos = [];

  const getName = () => name;
  const getId = () => id;

  // Returns todos array
  const getTodos = () => todos;
  
  // Takes todo object, adds it to todos array
  const addTodo = todo => {
    todos.push(todo);
  }

  // Takes todo object, removes it from todos array
  const removeTodo = todo => {
    todos = todos.filter((element) => element !== todo);
  }

  return {
    getName,
    getId,
    getTodos,
    addTodo,
    removeTodo
  }
}



// Factory - object represents a single 'todo' object and it's properties
function createTodo(title, description, dueDate, priority) {
  
  const getName = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;

  return {
    getName,
    getDescription,
    getDueDate,
    getPriority
  }
}

module.exports = {
  projectManager,
  createProject,
  createTodo
}