// const copyFiles = require('./init-copy-files')
// const prompInput = require('./init-prompt-input')
// const editFile = require('./init-edit-file')

// const ora = require('ora')
// const chalk = require('chalk')
// const spinner = ora(chalk.green('Init project start'))
// const path = require('path')

// let copyPath =''
// let copyFolder = ''
// let destPath = path.resolve('./')

const inquirer = require('inquirer')
const copyFiles = require('./init-copy-files')
const editFile = require('./init-edit-file')

const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('Init project start'))
const path = require('path')

const defaultProjectName = 'hf-vue-app-pc'
const defaultProjectType = 'pc'

let copyPath =''
let copyFolder = ''
let destPath = path.resolve('./test')

function doCopy() {
  if (global.projectType === 'pc') {
    copyFolder = 'hf-vue-pc'
  } else {
    copyFolder = 'hf-vue-h5'
  }
  copyPath =  path.resolve(`./node_modules/${copyFolder}`)
  spinner.start()
  copyFiles.doCopy(destPath, copyPath).then(res => {
    // let packageJsonFilePath = path.join(copyPath + '/package.json')
    // if(res === true){
    //   return editFile.editPackageJsonFile(packageJsonFilePath, global.projectName)
    // }
  }).then(res => {
    spinner.stop()
    console.log(chalk.green('Init project success'))
    process.exit()
  }).catch(error => {
    spinner.stop()
    console.log(chalk.red(error))
    process.exit()
  })
}

function doInit() {
  const promptList = [
    {
      type: 'list',
      message: 'Please choose you project type:',
      name: 'projectType',
      choices: [
        "H5",
        "PC"
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

module.exports = {
  doInit
}
