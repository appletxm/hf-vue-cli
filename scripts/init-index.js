const inquirer = require('inquirer')
const copyFiles = require('./init-copy-files')
const { editFileWithTemplate, copyIgnoreFile } = require('./init-edit-file')

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

function doInit() {
  console.info('--arg:', process.argv)
  if (process.argv.length > 2) {
    let arg = process.argv[process.argv.length]
    console.info('##arg:', arg)
  } else {
    doIntractive()
  }
}

module.exports = {
  doInit
}
