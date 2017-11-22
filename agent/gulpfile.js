const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const { spawn } = require('child_process');
const { normalize } = require('path');

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {object} [options] The settings to customize how the process is spawned.
 * @return {Promise} Completes when the command is finally terminated.
 */
async function _exec(command, args = [], options = { shell: true, stdio: 'inherit' }) {
  return new Promise((resolve, reject) =>
    spawn(normalize(command), args, options).on(
      'close',
      code => (code ? reject(new Error(`${command}: ${code}`)) : resolve()),
    ),
  );
}

gulp.task('start-dev', () => {
  nodemon({
    script: './src/server',
    ext: 'js html',
    ignore: [
      '.nyc_output/**',
      'coverage/**',
    ],
    tasks: ['lint'],
    legacyWatch: true,
  });
});

gulp.task('lint', () =>
  gulp
    .src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('test', () => _exec('node_modules/.bin/nyc', [
  '--reporter=lcov',
  normalize('node_modules/.bin/mocha'),
  '"tests/**/*.js"'
]));

gulp.task('default', ['start-dev']);
