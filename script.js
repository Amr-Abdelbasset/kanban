const addBtn1 = document.getElementById('addBtn1');
const addBtn2 = document.getElementById('addBtn2');
const addBtn3 = document.getElementById('addBtn3');
const lists = document.querySelectorAll('.list');
const notStartedList = document.getElementById('NotStartedList');
const inProgressList = document.getElementById('inProgressList');
const completedList = document.getElementById('completedList');
const list = document.getElementById('list');
const deleteBtn = document.querySelectorAll('.icon');
const green = document.getElementById('ww');
const blue = document.querySelector('.blue');
let notStarted = [];
let inprogress = [];
let completed = [];
const A = 'notStarted';
const B = 'inprogress';
const C = 'completed';
let data = [];
let drag = null;
const all = {
  notStartedList: 'notStarted',
  inProgressList: 'inprogress',
  completedList: 'completed',
};
// window.addEventListener('load', renderAll);
addColor();
addLocal();
console.log('======');
console.log(data);
renderAll();
render(notStartedList, A);
render(inProgressList, B);
render(completedList, C);
deleteBtn.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    event.target.remove();
    console.log(event);
  });
});
function renderAll() {
  data.forEach((item) => {
    // console.log(item);
    if (item.statue === A) {
      render(notStartedList, A);
    } else if (item.statue === B) {
      render(inProgressList, B);
    } else if (item.statue === C) {
      render(completedList, C);
    }
  });
}
function edit(e) {
  // console.log(event.trget.closest('li'));
  const li = event.target.closest('li');
  li.querySelector('input').removeAttribute('disabled');
}
function delet(id) {
  // console.log(event.target.parentElement.parentElement.parentElement);
  // const list = `${
  //   all[event.target.parentElement.parentElement.parentElement.id]
  // }`;
  console.log(id);
  console.log('*********************');
  // console.log(list);
  data = data.filter(function (item) {
    console.log(item.id);
    return item.id !== id;
  });
  // for (const item of data) {
  //   if (item.id == id) {
  //     data.splice(item, 1);
  //   }
  // }
  console.log(data);
  event.target.parentElement.parentElement.remove();
  // console.log(event.target.parentElement.parentElement);

  // localStorage.removeItem(data);
  localStorage.setItem('data', JSON.stringify(data));
  // render(completedList, completed);
  // console.log(event.target.parentElement.parentElement);
  console.log('------------------------');
}

function render(section, statuee) {
  section.innerHTML = '';
  // const text = `${JSON.stringify(listName)}`;
  console.log('************************');
  // console.log(text);
  if (data !== null) {
    let x = 0;
    data.forEach(function (item) {
      if (item.statue === statuee) {
        console.log('------==------');
        console.log(item);
        console.log('------====-------');
        const text = item.taskName;
        const fragment = document.createDocumentFragment();
        const li = fragment.appendChild(document.createElement('li'));
        const id = item.id;
        li.className = 'task';
        // li.innerHTML = `<p>Task ${id}<p>
        li.setAttribute('draggable', 'true');
        li.setAttribute('data-id', `${id}`);
        li.innerHTML = `
        <input type="text" id="myText" disabled value="task"></input>
        
        <p>
        <div class='icons'>
        <ion-icon onclick='edit()' id = 'edit' class ='icon' name="create-outline"></ion-icon>
        
        <ion-icon  onclick="delet(
          '${id}')
          " class="icon" id ='delete' name="close-sharp"></ion-icon>
          </div>`;
        section.appendChild(fragment);
      } else {
      }
    });
  }
}
function local(list) {
  const mappedList = [];
  for (const item of list) {
    mappedList.push(JSON.stringify(item));
  }
  return mappedList;
}
function dragItem() {
  const items = document.querySelectorAll('.task');
  const ul = document.querySelectorAll('ul');
  console.log(items);
  console.log(ul);
  items.forEach((item) => {
    console.log('5');
    item.addEventListener('dragstart', function () {
      drag = item;
      item.style.opacity = '0.5';
      // console.log('1');
    });
    item.addEventListener('dragend', function () {
      drag = null;
      // console.log('3');
      item.style.opacity = '1';
    });
    lists.forEach((lst) => {
      const completedList = document.getElementById('completedList');
      lst.addEventListener('dragover', function (e) {
        e.preventDefault();
        // console.log(lst);
        // console.log('2');
        this.style.background = '#007962';
      });
      lst.addEventListener('dragleave', function (e) {
        // console.log('4');
        this.style.background = '#4daa99';
      });
      lst.addEventListener('drop', function () {
        this.querySelector('ul').appendChild(drag);
        const listName = lst.getAttribute('data-name');
        const idDrag = drag.getAttribute('data-id');
        console.log(lst.getAttribute('data-name'));
        data.forEach((item) => {
          if (item.id === idDrag) {
            item.statue = listName;
            localStorage.setItem('data', JSON.stringify(data));
          }
        });
      });
      addLocal();
      // render(notStartedList, A);
      // render(inProgressList, B);
      // render(completedList, C);
    });
  });
}
// render(notStartedList, A);
// render(inProgressList, B);
// render(completedList, C);
// window.localStorage.setItem('body', document.querySelector('body'));
// document.body.innerHTML = window.localStorage.getItem('body');
//change color
function addColor() {
  if (localStorage.getItem('color')) {
    document.body.className = localStorage.getItem('color');
    console.log(localStorage.getItem('color'));
  }
}

dragItem();
green.addEventListener('click', function () {
  localStorage.setItem('color', `''`);
  addColor();
});
blue.addEventListener('click', function () {
  localStorage.setItem('color', 'blue');
  addColor();
});
function addLocal() {
  const dataFromLocal = localStorage.getItem('data');
  if (dataFromLocal !== null && dataFromLocal.length > 0) {
    data = JSON.parse(localStorage.getItem('data'));
  }
  return data;
  yy; // render(completed, completedList);
}

// addEventListener('DOMContentLoaded', dragItem);

addBtn1.addEventListener('click', function () {
  const id = Math.random();
  const obj = { id: `${id}`, taskName: `Task ${id}`, statue: A };
  data.push(obj);
  // const tempList = local(notStarted);
  localStorage.setItem('data', JSON.stringify(data));
  render(notStartedList, A);
  dragItem();
});
addBtn2.addEventListener('click', function () {
  const id = Math.random();

  const obj = { id: `${id}`, taskName: `Task ${id}`, statue: B };
  data.push(obj);
  // const tempList = local(inprogress);
  localStorage.setItem('data', JSON.stringify(data));
  render(inProgressList, B);

  dragItem();
});
addBtn3.addEventListener('click', function () {
  const id = Math.random();
  const obj = { id: `${id}`, taskName: `Task ${id}`, statue: C };
  // completed.push(obj);
  console.log('*****************');
  console.log(completed);
  console.log(obj);
  data.push(obj);
  localStorage.setItem('data', JSON.stringify(data));
  render(completedList, C);
  dragItem();
});
