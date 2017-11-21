var istanbul = require('istanbul')
var path = require('path')
var fs = require('fs')
var traverse = require('traverse')

var collector = new istanbul.Collector()
var reporter = new istanbul.Reporter()

function getLineCountBeforeCallbackFn (fileContent) {
  return fileContent && fileContent.toString('utf-8').match(/(.|[\s\r\n])*?function(.|[\s\r\n])*?\{[\s\r\n]*/)[0].split(/[\r\n]+/).length - 1
}

function adjustLineNumbers (coverageObj, lineCountBefore) {
  lineCountBefore = lineCountBefore || 0

  traverse(coverageObj).forEach(function (val) {
    if (this.key && this.key === 'line') {
      this.update(val + lineCountBefore)
    }
  })
}

function updatePathsToAbsPaths (coverage, key) {
  var newKey = path.resolve(process.cwd(), key)
  coverage[newKey] = coverage[key]
  delete coverage[key]
  coverage[newKey].path = newKey

  return newKey
}

/* istanbul ignore next */
function safeGetFileContentSync (p, cb) {
  var fileContent
  try {
    fileContent = fs.readFileSync(path.resolve(p))
  } catch (err) {
    return cb(err)
  }

  return fileContent
}

/* istanbul ignore next */
function normalizeCoverageObject (coverage, cb) {
  for (var key in coverage) {
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
