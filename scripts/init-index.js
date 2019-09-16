const inquirer = require('inquirer')
const copyFiles = require('./init-copy-files')
const {
  editFileWithTemplate,
  copyIgnoreFile
} = require('./init-edit-file')
const {
  getVersion
} = require('./commanders')

const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('Init project start'))
const path = require('path')

const defaultProjectName = 'hf-vue-app-pc'
const defaultProjectType = 'pc'
const nameReg = /^[a-zA-Z$][\w$_-]{3,29}$/

let copyPath = ''
let copyFolder = ''
let destPath = path.resolve('./')

global.projectType = ''
global.projectName = ''
global.sourcePath = ''
global.initEnv = 'npm'

function doCopy() {
  copyFolder = `hf-vue-${global.projectType}`
  // console.info('global.sourcePath:', global.sourcePath)

  if (global.initEnv === 'npm') {
    copyPath = path.join(`${global.sourcePath}/node_modules/${copyFolder}`)
  } else {
    copyPath = path.join(`${global.sourcePath.replace('hf-vue-cli', '')}/${copyFolder}`)
  }

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
  const promptList = [{
      type: 'list',
      message: 'Please choose you project type:',
      name: 'projectType',
      choices: [
        "h5",
        "pc"
      ],
      default: defaultProjectType,
      filter(val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'input',
      message: 'Please set a cool name for you app:',
      name: 'projectName',
      default: defaultProjectName,
      validate(val) {
        if (!nameReg.test(val)) {
          return 'Project name not correct (Beginning with the letter or $, and total size should be less than 30)'
        }
        return true
      }
    }
  ]

  inquirer.prompt(promptList).then(answers => {
    if (nameReg.test(answers.projectName)) {
      global.projectType = answers.projectType
      global.projectName = answers.projectName
      doCopy()
    } else {
      console.info('Project name not correct')
      process.exit(0)
    }
  })
}

function doInit() {
  global.initEnv = path.resolve(__dirname).toLowerCase().indexOf('yarn') >= 0 ? 'yarn' : 'npm'
  global.sourcePath = path.resolve(__dirname, '../')

  console.info(chalk.green(`Module is ran by ${global.initEnv}`))

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
