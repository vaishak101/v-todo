'use strict';
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
  } else {
    return;
  }
});
//ADD
const InputTitle = document.querySelector('.title');
const InputDateTime = document.querySelector('.date');
const addBtn = document.querySelector('.form__btn');
const InputTitleUpdate = document.querySelector('.title--modal');
const InputDateTimeUpdate = document.querySelector('.date--modal');
const addBtnUpdate = document.querySelector('.form__btn--modal');
const allTask = document.querySelector('.content--allTask');
const updateTask = document.querySelector('.content--Update');
const taskBoxUP = document.querySelectorAll('.content--up');
const modal = document.querySelector('.modal');
let getBtnIDEdit;
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
    updateTask.addEventListener('click', this.deleteTask.bind(this));
    addBtnUpdate.addEventListener('click', this.editTask.bind(this));
    console.log(this.#task);
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
    <div class="task__details">
    <span class="workout__value">${task.title}</span>  
    </div>
    <div class="task__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">${task.dateTime}</span> 
    </div>
    <button class="task__update" data-id="${task.id}">Edit</button>
    <button class="task__delete" data-id="${task.id}">Delete</button>
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
  editTask(e) {
    const idUpdated = Date.now();
    //Update new value
    const title = InputTitleUpdate.value;
    const dateTime = InputDateTimeUpdate.value;
    const task = this.#task.find(o => o.id == getBtnIDEdit);
    task.title = title;
    task.dateTime = dateTime;
    task.id = idUpdated;
    //render new data
    this.setLocalstorage();
    taskBoxUP.forEach(s => (s.innerHTML = ''));
    this.getLocalstorage();
    this.resetValue();
    modal.classList.add('modal--hide');
  }
  deleteTask(e) {
    if (e.target.classList.contains('task__delete')) {
      const getBtnID = e.target.getAttribute('data-id');
      const filteredTask = this.#task.filter(item => item.id != getBtnID);
      this.#task = filteredTask;
      this.setLocalstorage();
      taskBoxUP.forEach(s => (s.innerHTML = ''));
      this.getLocalstorage();
    } else if (e.target.classList.contains('task__update')) {
      modal.classList.remove('modal--hide');
      getBtnIDEdit = e.target.getAttribute('data-id');
      let taskEdit;
      this.#task.forEach(i =>
        i.id == getBtnIDEdit ? (taskEdit = i) : console.log('no')
      );
      InputTitleUpdate.value = taskEdit.title;
      InputDateTimeUpdate.value = taskEdit.dateTime;
    } else {
      return;
    }
  }
  resetValue() {
    InputTitle.value =
      InputDateTime.value =
      InputTitleUpdate.value =
      InputDateTimeUpdate.value =
        '';
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

//MODAL CLOSING
const closeModal = document.querySelector('.modal__btn--close');
closeModal.addEventListener('click', function () {
  modal.classList.add('modal--hide');
});
