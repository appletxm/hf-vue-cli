const fs = require('fs')
const path = require('path')

function copyIgnoreFile(destPath) {
  const gitIgnorePath = path.resolve('./src/common/gitignore.txt')
  fs.copyFileSync(gitIgnorePath, path.resolve(destPath + '/.gitignore'))
}

function editFileWithTemplate(destPath) {
  let depFile = fs.readFileSync(path.resolve(`./src/hf-vue-${global.projectType}/dependencies.json`), 'utf8')
  depFile = depFile.replace('{{projectName}}', global.projectName)
  fs.writeFileSync(path.resolve(destPath + '/dependencies.json'), depFile, 'utf8')

  let pgFile = fs.readFileSync(path.resolve(`./src/hf-vue-${global.projectType}/package.json`), 'utf8')
  pgFile = pgFile.replace('{{projectName}}', global.projectName)
  fs.writeFileSync(path.resolve(destPath + '/package.json'), pgFile, 'utf8')

  let scssVarFile = fs.readFileSync(path.resolve(`./src/hf-vue-${global.projectType}/variables.scss`), 'utf8')
  scssVarFile = scssVarFile.replace('{{projectName}}', global.projectName)
  fs.writeFileSync(path.resolve(destPath + '/src/css/variables.scss'), scssVarFile, 'utf8')
}

module.exports = {
  copyIgnoreFile,
  editFileWithTemplate
}
