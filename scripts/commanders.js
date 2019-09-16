const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

function getVersion() {
  const pckFile = path.join(`${global.sourcePath}/package.json`)
  let version = ''
  try {
    const pckFileStr = fs.readFileSync(pckFile, 'utf8')
    version = JSON.parse(pckFileStr)['version']
  } catch(err) {
    version = 'invalid input'
  }
  console.log(chalk.green(version))
  return version
}

module.exports = {
  getVersion
}