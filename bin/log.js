const chalk = require('chalk');
const figures = require('figures');
const terminalLink = require('terminal-link');

function successFile(url) {
  console.log(chalk.green(figures.tick), url);
}

function failFile(url) {
  console.log(chalk.green(figures.cross), url);
}

function count(success, fail) {
  console.log(chalk.green(`${success} success.`), chalk.green(`${fail} fail.`));
}

function powerBy() {
  console.log('\nPowered by', terminalLink('aliyun-oss-deploy', 'https://github.com/hustcc/aliyun-oss-deploy'))
}

module.exports = async function log(dg) {
  let sc = 0, fc = 0;

  // 1. log deploy generator
  for (const r of dg) {
    const result = await r;

    const isSuccess = result.res && result.res.status === 200;
    const url = result.url;

    if (isSuccess) {
      sc ++;
      successFile(url);
    } else {
      fc ++;
      failFile(url);
    }
  }

  // 2. log result count
  count(sc, fc);

  // 3. log power by
  powerBy();
}
