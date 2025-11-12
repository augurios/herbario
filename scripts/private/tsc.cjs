const ChildProcess = require('child_process');
const Chalk = require('chalk');

function compile(directory) {
  return new Promise((resolve, reject) => {
    // First compile main.ts with ES2020 modules
    const tscMainProcess = ChildProcess.exec('tsc --project tsconfig.json', {
      cwd: directory,
    });

    tscMainProcess.stdout.on('data', data => 
        process.stdout.write(Chalk.yellowBright(`[tsc] `) + Chalk.white(data.toString()))
    );

    tscMainProcess.on('exit', exitCode => {
      if (exitCode > 0) {
        reject(exitCode);
      } else {
        // Then compile preload.ts with CommonJS
        const tscPreloadProcess = ChildProcess.exec('tsc --project tsconfig.preload.json', {
          cwd: directory,
        });

        tscPreloadProcess.stdout.on('data', data => 
            process.stdout.write(Chalk.yellowBright(`[tsc-preload] `) + Chalk.white(data.toString()))
        );

        tscPreloadProcess.on('exit', preloadExitCode => {
          if (preloadExitCode > 0) {
            reject(preloadExitCode);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

module.exports = compile;
