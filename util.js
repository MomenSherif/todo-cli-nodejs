const { error } = require('./chalk');

/**
 * Validate Status
 * allowed values [“to-do”,”in progress”,”done”]
 */
const validateTodoStatus = (status) => {
  return ['to-do', 'in progress', 'done'].includes(status)
    ? status
    : _exitProcess(
        "Status is one of the values['to-do', 'in progress', 'done']"
      );
};

const _exitProcess = (msg) => {
  console.log(error(msg));
  process.exit();
};

module.exports = {
  validateTodoStatus,
  _exitProcess,
};
