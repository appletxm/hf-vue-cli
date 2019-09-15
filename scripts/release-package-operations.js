const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const filePath = path.join(__dirname, '../package.json')

const packageFile = {
  updateVersion(version) {
    let promise

    promise = new Promise((resolve) => {
      fs.readFile(filePath, {flag: 'r+', encoding: 'utf8'}, (err, data) => {
        if (err) {
          throw new Error('There is no package.json file', err)
          process.exit(1)
        } else {
          this.replaceVersion(version, data).then((res) => {
            console.log(chalk.cyan('\n Replace version number success.\n'))

            if (res === true) {
              return this.addChanges()
            }
          }).then((res) => {
            if (res === true) {
              return this.commitChanges(version)
            }
          }).then((res) => {
            if (res === true) {
              return this.pushChanges()
            }
          }).then((res) => {
            if (res === true) {
              resolve(true)
            }
          })
        }
      })
    })

    return promise
  },

  replaceVersion(version, data) {
    var promise

    if (version) {
      data = data.replace(/"version"\:\s*(.[^,]*)/, '"version": "' + version + '"')
      promise = new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, function (err) {
          if (err) {
            throw new Error('Replace version number failed for package.json file, ', err)
            process.exit(1)
          }else {
            resolve(true)
          }
        })
      })
    }

    return promise
  },

  addChanges() {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec('git add .', (error, stdout, stderr) => {
        if (error) {
          throw new Error('Add package.json file failed, ', error)
          process.exit(1)
        }else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan('\n Add package.json file success.\n'))

          resolve(true)
        }
      })
    })

    return promise
  },

  commitChanges(version) {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec('git commit -am "update version to ' + version + '"', (error, stdout, stderr) => {
        if (error) {
          throw new Error('Commit package.json file failed, ', error)
          process.exit(1)
        }else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan('\n Commit package.json file success.\n'))

          resolve(true)
        }
      })
    })

    return promise
  },

  pushChanges() {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec('git push origin ' + `${global.branch}`, (error, stdout, stderr) => {
        console.log(`stdout: ${stderr}`)
        if (error) {
          throw new Error('Push package.json file changes to origin failed', error)
          process.exit(1)
        } else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan('\n Push package.json file to origin branch success.\n'))

          resolve(true)
        }
      })
    })

    return promise
  }
}

module.exports = packageFile
