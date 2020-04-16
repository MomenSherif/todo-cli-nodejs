const { program } = require('commander');

const { success, warning, error, blue } = require('./chalk');
const { getTodos, addTodo, deleteTodo, editTodo } = require('./todos');

const { validateTodoStatus } = require('./util');

const log = console.log;
const table = console.table;

program.version('1.0.0');

/**
 * Command: list
 * Options: -s/--status one of the values [“to-do”, “in progress” ,”done”] (optional parameter)
 * ex: node index.js list
 */
program
  .command('list')
  .description('List all todos')
  .option(
    '-s, --status <status>',
    "Todos Status, one of the values['to-do', 'in progress', 'done']",
    validateTodoStatus
  )
  .action(({ status = '' }) => {
    const todos = getTodos(status);
    if (todos.length > 0) {
      log(success('Your Todos:'));
      table(todos);
    } else {
      log(warning('No Todos to list!, Please add some'));
    }
  });

/**
 * Command: add
 * Options: -t / --title indicates the title of entry, (required)
 * ex: node index.js add -t “To do entry”
 */
program
  .command('add')
  .description('Add todo')
  .requiredOption('-t, --title <title>', "Todo's title")
  .action(({ title }) => {
    addTodo({ title });
    log(success(`${blue(title)} Added Successfully`));
  });

/**
 * Command: delete
 * Arguments: id (required)
 * ex: node index.js delete 123
 */
program
  .command('delete <id>')
  .description('Delete todo by id')
  .action((id) => {
    const todo = deleteTodo(id);
    todo
      ? log(success(`${blue(todo.title)} Deleted Successfully`))
      : log(error(`ID: ${id} is not found`));
  });

/**
 * Command: edit
 * Options:
 *          -i/ --id : id (required)
 *          -t / --title: for editing title
 *          -s/--status one of the values [“to-do”,”in progress”,”done”]
 * ex: node index.js edit -t “Edited title” --id 123
 */
program
  .command('edit')
  .description('Edit todo by id')
  .requiredOption('-i, --id <id>', "Todo's id")
  .option('-t, --title <title>', "Todo's title")
  .option(
    '-s, --status <status>',
    "Todo's status, one of the values['to-do', 'in progress', 'done']",
    validateTodoStatus
  )
  .action(({ id, title, status }) => {
    if (!status && !title)
      return log(error('Must provide Title or Status at least!'));

    const todo = editTodo(id, { title, status });
    todo
      ? log(success(`${blue(todo.title)} Updated Successfully`))
      : log(error(`ID: ${id} is not found`));
  });

program.parse(process.argv);
