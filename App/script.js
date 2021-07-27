const todos = document.querySelector('.todos')
const input = document.querySelector('#input')

const form = document.querySelector('form')
let toDoList = []

function addList(todo, inputText, active = false) {
  todo.textContent = inputText
  todo.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    todo.remove()
    updateLocalStore()
  })
  todo.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) todo.classList.toggle('completed')
    updateLocalStore()
  })
  if (active) {
    todo.classList.add('completed')
  }
  todos.appendChild(todo)
  updateLocalStore()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const todo = document.createElement('li')
  addList(todo, input.value)
  input.value = ''
})

function updateLocalStore() {
  const todoitems = todos.querySelectorAll('li')
  toDoList = []
  todoitems.forEach((todo) => {
    toDoList.push({
      todo: todo.textContent,
      active: todo.classList.contains('completed'),
    })
  })
  localStorage.setItem('todo', JSON.stringify(toDoList))
}

function readLocalStore() {
  toDoList = JSON.parse(localStorage.getItem('todo'))
  if (toDoList) {
    toDoList.forEach((todolst) => {
      const todo = document.createElement('li')
      addList(todo, todolst.todo, todolst.active)
      todos.appendChild(todo)
    })
  }
}

readLocalStore()
