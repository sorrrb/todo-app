function createTask(title, description, dueDate, priority, notes, checklist) {
  const getTaskName = () => title;
  const setTaskName = text => title = text;

  const getDescription = () => description;
  const setDescription = text => description = text;

  const getDueDate = () => dueDate;
  const setDueDate = date => dueDate = date;
  
  const getPriority = () => priority;
  const setPriority = integer => priority = integer;

  const getNotes = () => notes;
  const setNotes = text => notes = text;

  const getChecklist = () => checklist;
  const setChecklist = list => checklist = list;

  return {
    getTaskName,
    setTaskName,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getNotes,
    setNotes,
    getChecklist,
    setChecklist
  }
}

function createList(name) {
  let tasks = [];

  const getListName = () => name;
  const setListName = listName => name = listName;

  const getTasks = () => tasks;
  const addTask = newTask => tasks.push(newTask);
  const removeTask = finishedTask => {
    tasks = tasks.filter((task) => task !== finishedTask)
  };

  return {
    getListName,
    setListName,
    getTasks,
    addTask,
    removeTask,
  }
}

module.exports = {
  createTask,
  createList
};