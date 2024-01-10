Pseudocode

Todos are going to be objects (dynamically created by Javascript using factories)
Properties will include:
- title
- description
- dueDate
- priority
- notes

Projects will be objects used to store lists of Todo objects
(When opening the application, there should be a default project to which all their todos are put)
Methods will include:
- Create new projects
- Choose which projects their todos go into

Separate application logic from DOM stuff in separate modules

UI should be able to:
- View all projects
- View all todos in each project (probably just the title and due date)
- Expand a todo to see & edit its details
- Delete a todo