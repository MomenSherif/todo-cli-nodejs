const chalk = require('chalk');

// Console color indicators
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.bold.green;
const blue = chalk.blue;

module.exports = {
  success,
  warning,
  error,
  blue,
};
