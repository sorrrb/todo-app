import { lightFormat } from 'date-fns'; // date library with useful functions for manipulating/formating dates/times

// Helper - takes a date string in MM-DD-YYYY format representing a date and returns corresponding date object
// ie: '01-10-2024' represents January 10th, 2024 [ new Date(2024, 0, 10) ]
function formatDate(dateString) {
  const monthIndex = dateString[0];
  const dayIndex = dateString[3];
  const yearIndex = dateString[6];

  const month = Number(dateString.substring(monthIndex, dayIndex));
  const day = Number(dateString.substring(dayIndex, yearIndex));
  const year = Number(dateString.substring(yearIndex));

  const date = new Date(year, month-1, day);
  return date;
}

// Factory - Represents a todo object
function createTask(title, description, dueDate, priority, status, notes, list) {

  const getTitle = () => title;
  const setTitle = newTitle => title = newTitle;

  const getDescription = () => description;
  const setDescription = newDescription => description = newDescription;

  // Date is taken in 'MM-DD-YYYY' string format and converted to a date object
  const getDueDate = () => dueDate;
  const setDueDate = newDate => {
    dueDate = formatDate(newDate);
  };

  // Number - can hold 1 of 5 values:
  // - 0 [no deadline]
  // - 1 [low priority]
  // - 2 [medium priority]
  // - 3 [high priority]
  // - 4 [urgent/highest priority]
  const getPriority = () => priority;
  const setPriority = newPriority => priority = newPriority;

  // Boolean
  // - true [task is complete]
  // - false [task is incomplete]
  const getStatus = () => status;
  const setStatus = newStatus => status = newStatus;

  const getNotes = () => notes;
  const setNotes = newNotes => notes = newNotes;

  const getList = () => list;
  const setList = newList => list = newList;

  return { 
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    getStatus,
    setStatus,
    getNotes,
    setNotes,
    getList,
    setList
  }; 
}

// Factory - represents a list of todo objects
export function createList(title) {

  const getTitle = () => title;
  const setTitle = newTitle => title = newTitle;
  
  return {
    getTitle,
    setTitle
  }
}

export default createTask;