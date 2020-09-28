import Mexp from 'math-expression-evaluator'
import './styles.scss'

const buttons = document.querySelectorAll('button')
const outputSPAN = document.querySelector('.output')
let input = ''

const taskRefferences = {
  addCharacter,
  clear,
  calculate
}

// add task to button
buttons.forEach((button) => {
  const task = button.dataset.task
  const { textContent } = button
  const taskRefferenc = taskRefferences[task]

  button.onclick = () => {
    // execute specific task
    taskRefferenc(textContent)
    // render result
    outputSPAN.innerHTML = input
    // clear if nescessary
    if (task === 'calculate') clear()
  }
})

function addCharacter(character) {
  input += character
}
function clear() {
  input = ''
}
function calculate() {
  // parse input and replace special characters
  const parsedInput = input
    .replaceAll('%', '/100')
    .replaceAll(',', '.')
    .replaceAll('÷', '/')
    .replaceAll('×', '*')

  try {
    input = Mexp.eval(parsedInput)
  } catch (error) {
    input = error.message
  }
}
