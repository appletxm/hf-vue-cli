const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const filePath = path.join(__dirname, '../package.json')

const tagOperations = {
  createTag(version, desc) {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      let cmd = `git tag -a  ${version}  -m "${(desc || (' create tag version' + version))}"`
      // console.log('cmd', cmd)

      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          throw 'Create tag failed'
        }else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan('\n Create tag version ' + version + ' success.\n'))

          this.pushNewTag(version).then((res) => {
            if (res === true) {
              resolve(true)
            }
          })
        }
      })
    })

    return promise
  },

  pushNewTag(version) {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec('git push origin ' + version, (error, stdout, stderr) => {
        if (error) {
          throw 'Push tag ' + version + 'to origin failed'
        } else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan('\n Push tag ' + version + ' to origin success.\n'))

          resolve(true)
        }
      })
    })

    return promise
  }
}

module.exports = tagOperations
