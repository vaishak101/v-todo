'use strict';

//Navigation
const nav = document.querySelector('.nav');
const taskBox = document.querySelectorAll('.task__box');
const navBtn = document.querySelectorAll('.nav__btn-lit');
nav.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('nav__btn') ||
    e.target.classList.contains('nav__btn--icon')
  ) {
    const test = e.target.getAttribute('data-num');
    taskBox.forEach(s => s.classList.remove('active'));
    navBtn.forEach(s => s.classList.remove('nav-btn--active'));
    taskBox[test].classList.add('active');
    navBtn[test].classList.add('nav-btn--active');
  } else {
    return;
  }
});
//TASK ADD DELETE EDIT
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
  }
  renderTask(task) {
    let htmlforView = ` 
    <li class="task" data-id="${task.id}">
    <div class="task__cont">
    <div class="task__details">
    <span class="task__name">${task.title}</span>  
    </div>
    <div class="task__details">
          <span class="task__icon">📅</span>
          <span class="task__date">${task.dateTime}</span> 
    </div>
    </div>
    </li>
    `;
    const htmlForUpdate = `
    <li class="task taskd" data-id="${task.id}">
    <div class="task__cont2">
    <div class="task__details">
    <span class="task__name">${task.title}</span>  
    </div>
    <div class="task__details">
    <span class="task__icon">📅</span>
    <span class="task__date">${task.dateTime}</span> 
    </div>
    <div class="task__details">
    <button class="task__update task__btn" data-id="${task.id}"><ion-icon name="create-outline" class="task__update" data-id="${task.id}"></ion-icon></button>
    <button class="task__delete task__btn" data-id="${task.id}"><ion-icon name="trash-outline" class="task__delete" data-id="${task.id}"></ion-icon></button>
    </div>
    </div>
    </li>
    `;
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
    if (title == '' || dateTime == '') {
      this.resetValue1();
      return alert('Please add all details');
    } else {
      //Create object
      task = new Task(id, title, dateTime);
      //add new obj to task array
      this.#task.push(task);
      //render Task
      this.renderTask(task);
      this.setLocalstorage();
      this.resetValue1();
    }
  }
  editTask(e) {
    const idUpdated = Date.now();
    const title = InputTitleUpdate.value;
    const dateTime = InputDateTimeUpdate.value;
    if (title == '' || dateTime == '') {
      this.resetValue2();
      return alert('Please add all details');
    } else {
      //Update new value
      const task = this.#task.find(o => o.id == getBtnIDEdit);
      task.title = title;
      task.dateTime = dateTime;
      task.id = idUpdated;
      //render new data
      this.setLocalstorage();
      taskBoxUP.forEach(s => (s.innerHTML = ''));
      this.getLocalstorage();
      this.resetValue2();
      modal.classList.add('modal--hide');
    }
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
        i.id == getBtnIDEdit ? (taskEdit = i) : console.log()
      );
      InputTitleUpdate.value = taskEdit.title;
      InputDateTimeUpdate.value = taskEdit.dateTime;
    } else {
      return;
    }
  }
  resetValue1() {
    InputTitle.value = InputDateTime.value = '';
  }
  resetValue2() {
    InputTitleUpdate.value = InputDateTimeUpdate.value = '';
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
