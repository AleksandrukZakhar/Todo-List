import "./styles.scss";
import Plus from "./assets/plus.svg";
import Cross from "./assets/cross.svg";

const Projects = () => {
  const projectsList = [];

  return {
    get projects() {
      return projectsList;
    },

    set projects(content) {
      projectsList.push(content);
    },
  };
};

const project = (title) => {
  const todos = [];

  return {
    title,

    get todos() {
      return todos;
    },

    set todos(content) {
      todos.push(content);
    },
  };
};

const todo = (title, description) => {
  return {
    title,
    description,
  };
};

const Header = () => {
  const header = document.createElement("div");
  header.classList.add("header");

  const p = document.createElement("p");
  p.textContent = "Todo List";
  header.appendChild(p);

  return header;
};

const createTodoModal = (title, description) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

  const todoModal = document.createElement("div");
  todoModal.classList.add("todo-modal");
  modal.appendChild(todoModal);

  const todoModalTitle = document.createElement("div");
  todoModalTitle.textContent = title;
  todoModalTitle.classList.add("todo-modal-title");
  todoModal.appendChild(todoModalTitle);

  const cross = new Image();
  cross.classList.add("cross");
  cross.src = Cross;
  cross.alt = cross;

  cross.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  todoModalTitle.appendChild(cross);

  const todoModalDescription = document.createElement("div");
  todoModalDescription.textContent = description;
  todoModal.appendChild(todoModalDescription);
};

const createAddTodoModal = (project, projectEl) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

  const addTodoModal = document.createElement("div");
  addTodoModal.classList.add("add-todo-modal");
  modal.appendChild(addTodoModal);

  const addTodoModalTitle = document.createElement("div");
  addTodoModalTitle.textContent = "Add Todo";
  addTodoModalTitle.classList.add("add-todo-modal-title");
  addTodoModal.appendChild(addTodoModalTitle);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Title";
  input.pattern = "/[a-z]/gi";
  input.title = "Example: Something";
  addTodoModal.appendChild(input);

  const textarea = document.createElement("textarea");
  textarea.placeholder = "description";
  addTodoModal.appendChild(textarea);

  const addTodoModalButton = document.createElement("button");
  addTodoModalButton.textContent = "Add Todo";
  addTodoModalButton.classList.add("add-todo");

  addTodoModalButton.addEventListener("click", () => {
    const title = input.value;
    const description = textarea.value;

    project.todos = todo(title, description);

    const todoEl = document.createElement("div");
    todoEl.classList.add("todo");
    projectEl.appendChild(todoEl);

    const todoTitle = document.createElement("p");
    todoTitle.textContent = project.todos[project.todos.length - 1].title;
    todoTitle.classList.add("todo-title");

    todoTitle.addEventListener("click", () =>
      createTodoModal(
        project.todos[project.todos.length - 1].title,
        project.todos[project.todos.length - 1].description
      )
    );

    todoEl.appendChild(todoTitle);

    const date = document.createElement("input");
    date.type = "date";

    date.addEventListener("onchange", () => {
      console.log(date.value);
    });

    todoEl.appendChild(date);

    const cross = new Image();
    cross.src = Cross;
    cross.alt = "cross";

    cross.addEventListener("click", () => {
      projectEl.removeChild(todoEl);
    });

    todoEl.appendChild(cross);

    document.body.removeChild(document.querySelector(".modal"));
  });

  addTodoModal.appendChild(addTodoModalButton);

  const plus = new Image();
  plus.src = Plus;
  plus.alt = "plus";
  addTodoModalButton.appendChild(plus);
};

const createAddProjectModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

  const addProjectModal = document.createElement("div");
  addProjectModal.classList.add("add-project-modal");
  modal.appendChild(addProjectModal);

  const addProjectModalTitle = document.createElement("div");
  addProjectModalTitle.textContent = "Add Project";
  addProjectModalTitle.classList.add("add-project-modal-title");
  addProjectModal.appendChild(addProjectModalTitle);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Title";
  input.pattern = "/[a-z]/gi";
  input.title = "Example: Something";
  addProjectModal.appendChild(input);

  const addProjectModalButton = document.createElement("button");
  addProjectModalButton.textContent = "Add Project";
  addProjectModalButton.classList.add("add-project");

  addProjectModalButton.addEventListener("click", () => {
    const title = input.value;

    Projects.projects = project(title);

    const projectEl = document.createElement("div");
    projectEl.classList.add("project");
    document.querySelector(".projects-container").appendChild(projectEl);

    const projectTitle = document.createElement("div");
    projectTitle.textContent = Projects.projects.title;
    projectTitle.classList.add("project-title");
    projectEl.appendChild(projectTitle);

    const addTodoContainer = document.createElement("div");
    addTodoContainer.classList.add("add-todo-container");
    projectEl.appendChild(addTodoContainer);

    const addTodo = document.createElement("button");
    addTodo.textContent = "Add Todo";
    addTodo.classList.add("add-todo");

    addTodo.addEventListener("click", () =>
      createAddTodoModal(Projects.projects, projectEl)
    );

    addTodoContainer.appendChild(addTodo);

    const plus = new Image();
    plus.src = Plus;
    plus.alt = "plus";
    addTodo.appendChild(plus);

    document.body.removeChild(document.querySelector(".modal"));
  });

  addProjectModal.appendChild(addProjectModalButton);

  const plus = new Image();
  plus.src = Plus;
  plus.alt = "plus";
  addProjectModalButton.appendChild(plus);
};

const addProjectHandler = () => {
  createAddProjectModal();
};

const ProjectsContainer = () => {
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects-container");

  const addProjectContainer = document.createElement("div");
  addProjectContainer.classList.add("add-project-container");
  projectsContainer.appendChild(addProjectContainer);

  const addProjectEl = document.createElement("button");
  addProjectEl.textContent = "Add Project";
  addProjectEl.classList.add("add-project");
  addProjectEl.addEventListener("click", () => addProjectHandler());
  addProjectContainer.appendChild(addProjectEl);

  const plus = new Image();
  plus.src = Plus;
  plus.alt = "plus";
  addProjectEl.appendChild(plus);

  return projectsContainer;
};

document.body.appendChild(Header());
document.body.appendChild(ProjectsContainer());
