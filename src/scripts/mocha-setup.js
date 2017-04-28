module.exports = function mochaSetup (mocha, mochaOptions) {
  if (!mocha) {
    return
  }

  // MUST-HAVE
  // Used to bind functions such as `describe`, `before` and etc. to the window
  mocha.ui('bdd')

  for (var option in mochaOptions) {
    if (mochaOptions.hasOwnProperty(option) && option in mocha) {
      mocha[option](mochaOptions[option])
    }
  }
}
