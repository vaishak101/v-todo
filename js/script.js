const nav = document.querySelector('.nav');
const taskBox = document.querySelectorAll('.task__box');
nav.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('nav__btn') ||
    e.target.classList.contains('nav__btn--icon')
  ) {
    const test = e.target.getAttribute('data-num');
    taskBox.forEach(s => s.classList.remove('active'));
    taskBox[test].classList.add('active');
    console.log(test);
  } else {
    return;
  }
});
//ADD
const InputTitle = document.querySelector('.title');
const InputDateTime = document.querySelector('.date');
const addBtn = document.querySelector('.form__btn');
const allTask = document.querySelector('.content--allTask');
const updateTask = document.querySelector('.content--Update');
class Task {
  constructor(id, title, dateTime) {
    this.id = id;
    this.title = title;
    this.dateTime = dateTime;
  }
}

class App {
  #task = [];
  constructor() {
    this.getLocalstorage();
    addBtn.addEventListener('click', this._newTask.bind(this));
    console.log(updateTask);
    updateTask.addEventListener('click', this.deleteTask.bind(this));
    console.log('app constructor');
  }

  renderTask(task) {
    let htmlforView = ` 
    <li class="task" data-id="${task.id}>
    <input type="checkbox" class="task__check">
    <div class="task__details">
    <span class="workout__value">${task.title}</span>  
    </div>
    <div class="task__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${task.dateTime}</span> 
    </div>
    </li>
    `;
    const htmlForUpdate = `<li class="task taskd" data-id="${task.id}">
    <button class="task__delete" data-id="${task.id}">Delete</button>
    <div class="task__details">
    <span class="workout__value">${task.title}</span>  
    </div>
    <div class="task__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${task.dateTime}</span> 
    </div>
    </li>`;
    allTask.insertAdjacentHTML('beforeend', htmlforView);
    updateTask.insertAdjacentHTML('beforeend', htmlForUpdate);
  }
  _newTask(e) {
    e.preventDefault();
    //Get data from form
    const id = Date.now();
    const title = InputTitle.value;
    const dateTime = InputDateTime.value;

    let task;
    //Check if data is valid
    // if (dist < 0 || dura < 0) {
    //   resetValue();
    //   return alert('Negative Distance or Duration is not allowed');
    // } else if (dist == '' || dura == '') {
    //   resetValue();
    //   return alert('Empty Distance or Duration is not allowed');
    // }

    //Create object
    task = new Task(id, title, dateTime);

    //add new obj to wo array
    this.#task.push(task);
    //render Task
    this.renderTask(task);
    this.setLocalstorage();
    this.resetValue();
  }
  deleteTask(e) {
    if (e.target.classList.contains('task__delete')) {
      const test = e.target.getAttribute('data-id');
      console.log(this.#task);
      console.log(test);

      const filteredTask = this.#task.filter(item => item.id != test);
      this.#task = filteredTask;
      console.log(this.#task);
      this.setLocalstorage();

      this.getLocalstorage();
    } else {
      return;
    }
  }
  resetValue() {
    InputTitle.value = InputDateTime.value = '';
  }
  setLocalstorage() {
    localStorage.setItem('tasks', JSON.stringify(this.#task));
  }
  getLocalstorage() {
    const data = JSON.parse(localStorage.getItem('tasks'));
    if (!data) return;
    this.#task = data;
    this.#task.forEach(t => this.renderTask(t));
  }
}
const app = new App();
