const inquirer = require('inquirer')
const repl = require('repl')

let anwsers = []
let currentQaIndex = 0

function inputProjectInfo(promptMsgs) {
  let newPromptMsgs = promptMsgs || questions
  return inquirer.prompt(promptMsgs)
}

function doInput (questions) {
  let promise

  promise = new Promise((resolve) => {
    repl.start({
      prompt: `> ${questions[currentQaIndex]}`,
      eval(cmd, context, filename, callback) {
        cmd = cmd.replace(/\n/g, '')
        if (cmd) {
          anwsers.push(cmd)
          if (currentQaIndex >= (questions.length - 1)) {
            resolve(anwsers)
          } else {
            currentQaIndex++
            console.info(questions[currentQaIndex])
          }
        } else {
          console.info(questions[currentQaIndex])
        }
      }
    })
  })

  return promise
}

module.exports = {
  doInput,
  inputProjectInfo
}
