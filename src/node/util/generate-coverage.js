var istanbul = require('istanbul')
var path = require('path')
var fs = require('fs')
var traverse = require('traverse')

let collector = new istanbul.Collector()
let reporter = new istanbul.Reporter()

function getLineCountBeforeCallbackFn (fileContent) {
  return fileContent.toString('utf-8').match(/(.|[\s\r\n])*?function(.|[\s\r\n])*?\{[\s\r\n]*/)[0].split(/[\r\n]+/).length - 1
}

function adjustLineNumbers (coverageObj, lineCountBefore) {
  traverse(coverageObj).forEach(function (val) {
    if (this.key && this.key === 'line') {
      this.update(val + lineCountBefore)
    }
  })
}

function updatePathsToAbsPaths (coverage, key) {
  let newKey = path.resolve(process.cwd(), key)
  coverage[newKey] = coverage[key]
  delete coverage[key]
  coverage[newKey].path = newKey

  return newKey
}

/* istanbul ignore next */
function safeGetFileContentSync (path, cb) {
  var fileContent
  try {
    fileContent = fs.readFileSync(path.resolve(path))
  } catch (err) {
    return cb(err)
  }

  return fileContent
}

/* istanbul ignore next */
function normalizeCoverageObject (coverage, cb) {
  for (let key in coverage) {
    if (coverage.hasOwnProperty(key)) {
      var newKey = updatePathsToAbsPaths(coverage, key)
      var fileContent = safeGetFileContentSync(newKey, cb)
      adjustLineNumbers(coverage[newKey], getLineCountBeforeCallbackFn(fileContent))
    }
  }

  return coverage
}

/* istanbul ignore next */
module.exports = function generateCoverage (userConfig, coverage, cb) {
  coverage = normalizeCoverageObject(coverage, cb)

  collector.add(coverage)
  reporter.addAll(userConfig.coverageOptions.reporters)
  reporter.write(collector, true, function (err) {
    cb(err)
  })
}

module.exports.helpers = {
  getLineCountBeforeCallbackFn,
  adjustLineNumbers,
  updatePathsToAbsPaths
}