const fs = require('fs')

function editPackageJsonFile(packageJsonFilePath, projectName){
  let pacakgeFile
  let promise = new Promise((resolve) => {
    pacakgeFile = fs.readFileSync(packageJsonFilePath, 'utf8')
    pacakgeFile = pacakgeFile.replace(/"name"\:\s*".+"/, ('"name": ' + '"' + projectName + '"'))
    pacakgeFile = pacakgeFile.replace(/"escapedName"\:\s*".+"/, ('"escapedName": ' + '"' + projectName + '"'))
    let reg = /"name"\: ".+"/
    resolve(true)
  })

  return promise
}

module.exports = {
  editPackageJsonFile
}
