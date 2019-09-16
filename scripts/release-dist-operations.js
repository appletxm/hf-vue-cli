const fs = require('fs')
const path = require('path')
// const tar = require('tar')
const chalk = require('chalk')

module.exports = {
  createTarFile(envKey) {
    const timestamp = new Date().getTime()
    const packageJson = require('../package.json')
    const versionId = `${packageJson.name}-${packageJson.version}-${timestamp}-${envKey}`
    const stampMarkStr = `<!--${versionId}-->`

    return new Promise(function (resolve, reject) {
      fs.writeFile(path.join(__dirname, '../dist/index.html'), stampMarkStr, {flag: 'a'}, err => {
        if (err) {
          console.log(chalk.red('写入index.html版本标识出错', err))
          reject(err)
          return false
        }
        const res = tar.c(
          {
            // gzip: true,
            file: path.join(__dirname, `../dist/${versionId}.tar`),
            cwd: path.join(__dirname, '../dist/'),
            portable: true
          },
          ['index.html', 'app.html', 'error.html', 'assets', 'css', 'js']
        )
        resolve({
          res,
        versionId})
      })
    })
  },

  buildDist() {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec('npm run buildForProd', (error, stdout, stderr) => {
        if (error) {
          throw new Error('npm run buildForProd failed, ' + error)
          process.exit(1)
        } else {
          // const reg = /\$tarName\(([^()]+)\)/g
          // const tarName = reg.exec(stdout)[1] + '.tar'
          // console.log(chalk.cyan(`\n Release success create tar name: \n ${tarName}`))
          resolve(true)
        }
      })
    })
    return promise
  }
}
