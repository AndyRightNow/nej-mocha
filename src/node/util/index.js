var path = require('path')
var glob = require('glob')

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
  var files

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

    this.isRunning = false
    this.isClosed = true
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
  if (!err || typeof err !== 'object') {
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

  for (var i = 0, l = errorProps.length, val; i < l; i++) {
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
  normalizeDir,
  walkSync,
  normalizeSlashes,
  finish,
  normalizeCliOptionValue,
  noop,
  getErrorOutput
}
