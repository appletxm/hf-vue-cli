const inquirer = require('inquirer')
const copyFiles = require('./init-copy-files')
const { editFileWithTemplate, copyIgnoreFile } = require('./init-edit-file')
const { getVersion } = require('./commanders')

const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('Init project start'))
const path = require('path')

const defaultProjectName = 'hf-vue-app-pc'
const defaultProjectType = 'pc'

let copyPath =''
let copyFolder = ''
let destPath = path.resolve('./')

global.projectType = ''
global.projectName = ''
global.sourcePath = ''

function doCopy() {
  copyFolder = `hf-vue-${global.projectType}`
  // console.info('global.sourcePath:', global.sourcePath)
  copyPath =  path.join(`${global.sourcePath}/node_modules/${copyFolder}`)
  spinner.start()
  copyFiles.doCopy(destPath, copyPath).then(() => {
    copyIgnoreFile(destPath)
    editFileWithTemplate(destPath)
  }).then(() => {
    spinner.stop()
    console.log(chalk.green('Init project success'))
    process.exit()
  }).catch(error => {
    spinner.stop()
    console.log(chalk.red(error))
    process.exit()
  })
}

function doIntractive() {
  const promptList = [
    {
      type: 'list',
      message: 'Please choose you project type:',
      name: 'projectType',
      choices: [
        "h5",
        "pc"
      ],
      default: defaultProjectType,
      filter: function (val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'input',
      message: 'Please set a cool name for you app:',
      name: 'projectName',
      default: defaultProjectName
    }
  ]

  inquirer.prompt(promptList).then(answers => {
    global.projectType = answers.projectType
    global.projectName = answers.projectName
    doCopy()
  })
}

function doInit() {
  global.sourcePath = path.resolve(__dirname, '../')
  if (process.argv.length > 2) {
    let arg = process.argv[process.argv.length - 1]
    if (arg === '-v' || arg === '--version') {
      getVersion()
    }
  } else {
    doIntractive()
  }
}

module.exports = {
  doInit
}
