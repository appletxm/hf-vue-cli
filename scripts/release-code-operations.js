const chalk = require('chalk')

const releaseCodeOperations = {
  switchBranch() {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec(`git checkout ${global.branch}`, (error, stdout, stderr) => {
        if (error) {
          throw new Error(`Checkout branch ${global.branch} failed. \n`, error)
          process.exit(1)
        }else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan(`\n Checkout branch ${global.branch} success.\n`))
          resolve(true)
        }
      })
    })

    return promise
  },

  updateCode() {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec(`git pull origin ${global.branch}`, (error, stdout, stderr) => {
        if (error) {
          throw new Error(`Pull latest code for branch ${global.branch} failed. \n`, error)
          process.exit(1)
        }else {
          // console.log(`stdout: ${stdout}`)
          // console.log(`stderr: ${stderr}`)
          console.log(chalk.cyan(`\n Pull latest code for branch ${global.branch} success.\n`))
          resolve(true)
        }
      })
    })

    return promise
  }
}

module.exports = releaseCodeOperations
