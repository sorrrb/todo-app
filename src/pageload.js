function generateNavigation() {
  const COMPONENTS = ['nav-head', 'nav-reminders', 'nav-timeline', 'nav-notes', 'nav-projects'];

  const navBar = document.createElement('nav');
  navBar.classList.add('main-nav');

  COMPONENTS.forEach((component) => {
    const section = document.createElement('section');
    section.classList.add(`${component}`);

    if (component === 'nav-head') {
      const logo = document.createElement('div');
      logo.textContent = 'To-Do';

      const searchBar = document.createElement('input');
      searchBar.type = 'text';
      searchBar.placeholder = 'Search...';

      section.appendChild(logo);
      section.appendChild(searchBar);    
    }

    else if (component === 'nav-reminders') {
      const reminders = document.createElement('button');
      reminders.textContent = 'Reminders';

      section.appendChild(reminders);
    }

    else if (component === 'nav-timeline') {
      const taskTimeline = document.createElement('div');
      taskTimeline.classList.add('task-wrapper')

      const todayTasks = document.createElement('button');
      todayTasks.textContent = 'Today';
      taskTimeline.appendChild(todayTasks);

      const upcomingTasks = document.createElement('button');
      upcomingTasks.textContent = 'Upcoming';
      taskTimeline.appendChild(upcomingTasks);

      const ongoingTasks = document.createElement('button');
      ongoingTasks.textContent = 'Ongoing';
      taskTimeline.appendChild(ongoingTasks);

      section.appendChild(taskTimeline);
    }

    else if (component === 'nav-notes') {
      const notes = document.createElement('button');
      notes.textContent = 'Notes';

      section.appendChild(notes);
    }

    else if (component === 'nav-projects') {
      const lists = document.createElement('button');
      lists.textContent = 'Lists';

      section.appendChild(lists);
    }

    navBar.appendChild(section);
  })
  return navBar;
}

function loadPage() {
  const content = document.getElementById('content');

  // Helper functions
  const navigation = generateNavigation();

  content.appendChild(navigation);
}

export default loadPage;