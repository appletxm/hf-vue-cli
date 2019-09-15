const packageOperations = require('./release-package-operations')
const tagOperations = require('./release-tag-operations')
const releaseCodeOperations = require('./release-code-operations')
const version = process.argv ? (process.argv)[2] : ''
const desc = process.argv ? (process.argv)[3] : ''
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('Releasing version: ' + version)


console.info('****releasing', version, desc)

global.branch = 'master'

spinner.start()

releaseCodeOperations.switchBranch()
  .then((res) => {
    if (res === true) {
      return releaseCodeOperations.updateCode()
    }
  })
  .then((res) => {
    if (res === true) {
      return packageOperations.updateVersion(version)
    }
  })
  .then((res) => {
    if (res === true) {
      return tagOperations.createTag(version, desc)
    }
  })
  .then((res) => {
    spinner.stop()
  })
  .catch((err) => {
    console.info(chalk.red(err))
    spinner.stop()
  })
