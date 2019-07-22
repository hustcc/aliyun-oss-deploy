const chalk = require('chalk');
const figures = require('figures');

module.exports = function assert(condition, errorMsg) {
  if (!condition) {
    console.log(chalk.bold.red(figures.cross), chalk.bold.red(errorMsg));
    process.exit(0);
  }
};
