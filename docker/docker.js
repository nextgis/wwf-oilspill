const chalk = require('chalk');
const path = require('path');
const { spawn } = require('child_process');
const pkg = require('../package.json');

const reg = `registry.nextgis.com/wwf-oilspill:${pkg.version}`;
const cwd = path.join(__dirname, '../');

async function execDocker() {
  isDockerRun(() => {
    execBuild(() => {
      execPush();
    });
  });
  return;
}

function isDockerRun(onIfRun) {
  const idRun = spawn('docker', ['ps'], { cwd });
  idRun.on('close', (code) => {
    if (code) {
      console.log(chalk.red(`Docker daemon is not running`));
      const eye = chalk.redBright('0');
      const realDaemon = `
        |\\     ____
        | \\.-./ .-'
        \\ _  _(
        | ${eye})(${eye}/  , , ,
        |   \\(   | | |
        |     \\  \\_|_/
        |   /vvv   |
        |  |__     |
        /      \`-. |
    `;
      console.log(chalk.yellow(realDaemon));
    } else {
      if (onIfRun) {
        onIfRun();
      }
    }
  });
}

function execBuild(onResolve) {
  console.log(chalk.green(`Start build: ${reg}`));

  const build = spawn(
    'docker',
    ['build', '-t', reg, '-f', './docker/Dockerfile', '.'],
    {
      cwd,
    },
  );

  build.stdout.on('data', (data) => {
    console.log('' + data);
  });

  build.stderr.on('data', (data) => {
    console.log('' + data);
  });

  build.on('close', (code) => {
    if (code) {
      console.log(chalk.red(`Build error`));
    } else {
      if (onResolve) {
        onResolve();
      }
    }
  });
}

function execPush() {
  console.log(chalk.green(`Pushing: ${reg}`));

  const push = spawn('docker', ['push', reg], {
    cwd,
  });

  push.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  push.stderr.on('data', (data) => {
    console.log(chalk.bgRed(`stderr: `) + chalk.red(data));
  });

  push.on('close', (code) => {
    if (code) {
      console.log(chalk.bgRed(`Pushing error`));
    } else {
      console.log(chalk.green(`Pushing complete`));
    }
  });
}

execDocker();
