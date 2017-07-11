var chalk = require('chalk')
var path = require('path')
var glob = require('glob')

/* istanbul ignore next */
function printGreen (str) {
  console.log(chalk.green(str))
}

/* istanbul ignore next */
function printRed (str) {
  console.log(chalk.red(str))
}

/* istanbul ignore next */
function printNewLine () {
  console.log('')
}

/* istanbul ignore next */
function print () {
  console.log.apply(console, Array.from(arguments))
}

/* istanbul ignore next */
function printAndNewLine () {
  print.apply(null, Array.from(arguments))

  printNewLine()
}

function normalizeDir (dir) {
  if (!/\.js$/.test(dir)) {
    dir = path.resolve(dir, '**/**/*.js')
  }

  return dir
}

/**
 * Recursively walk through all files in a concrete or wildcard directory synchronously
 *
 * @param {any} dir
 * @param {any} filelist
 * @returns {Array} Paths, relative to the cwd, of all files in the directory
 */
function walkSync (dir) {
  let files

  dir = normalizeDir(dir)

  try {
    files = glob.sync(dir)
  } catch (err) {
    /* istanbul ignore next */
    console.log(err.message)

    /* istanbul ignore next */
    files = []
  }

  return files
}

/**
 * Normalize a path. Remove extra slashes and replace all backslashes with slashes.
 *
 * @param {any} path
 * @returns
 */
function normalizeSlashes (path) {
  return path.replace(/[\\/]+/g, '/')
}

/* istanbul ignore next */
function finish (shouldBrowserClosed, server, proc, callback, err) {
  if (shouldBrowserClosed) {
    if (server) {
      server.close()
    }
    proc.end()
  }

  callback(err)
}

function normalizeCliOptionValue (val) {
  var parsed

  try {
    parsed = JSON.parse(val)
  } catch (err) {
    switch (val) {
      case 'undefined':
        return undefined
      default:
        return val
    }
  }

  return parsed
}

function getErrorOutput (err, indent) {
  if (!err) {
    return ''
  }
  indent = indent || ''

  var output = ''
  var errorProps = [
    'details',
    'message',
    'stack',
    'url'
  ]
  var newLine = '\n\r'

  for (let i = 0, l = errorProps.length, val; i < l; i++) {
    val = err[errorProps[i]]

    if (val) {
      output += (indent + err[errorProps[i]] + newLine)
    }
  }

  return output
}

/* istanbul ignore next */
function noop () {
  return true
}

module.exports = {
  printGreen,
  printRed,
  printNewLine,
  print,
  printAndNewLine,
  normalizeDir,
  walkSync,
  normalizeSlashes,
  finish,
  normalizeCliOptionValue,
  noop,
  getErrorOutput
}
