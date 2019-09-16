const packageOperations = require('./release-package-operations')
const tagOperations = require('./release-tag-operations')
const releaseCodeOperations = require('./release-code-operations')
const { getVerionNo } = require('./release-version')
let version = process.argv ? (process.argv)[3] : ''
const desc = (process.argv ? (process.argv)[4] : 'version update') || 'version update'
const ora = require('ora')
const chalk = require('chalk')
let spinner

version = getVerionNo(version)
console.info('****releasing', version, desc)
spinner = ora('Releasing version: ' + version)

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
