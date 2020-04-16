const fs = require('fs');

const listTodos = () => {
  const todosJSON = fs.readFileSync('./todos.json', 'UTF8');
  return JSON.parse(todosJSON);
};

const getTodos = (status) => {
  return listTodos().filter((todo) => todo.status.includes(status));
};

const addTodo = ({ title }) => {
  const todos = listTodos();
  const id = todos.length ? todos[todos.length - 1].id + 1 : 1; // Increment ID
  todos.push({ id, title, status: 'to-do' });
  saveTodos(todos);
};

const deleteTodo = (id) => {
  const todos = listTodos();
  const todo = todos.find((todo) => todo.id === +id);

  if (!todo) return null;

  saveTodos(todos.filter((todo) => todo.id !== +id));
  return todo;
};

const editTodo = (id, { title, status }) => {
  const todos = listTodos();
  const todo = todos.find((todo) => todo.id === +id);

  if (!todo) return null;

  if (status) todo.status = status;
  if (title) todo.title = title;

  saveTodos(todos);
  return todo;
};
const saveTodos = (todos) => {
  fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
};
