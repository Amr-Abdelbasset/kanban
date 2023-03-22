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
let drag = null;
addColor();
deleteBtn.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    event.target.remove();
    console.log(event);
  });
});

function edit(e) {
  // console.log(event.trget.closest('li'));
  const li = event.target.closest('li');
  li.querySelector('input').removeAttribute('disabled');
}
function delet(id, list) {
  console.log(id);
  console.log(list);
  for (const item of list) {
    if ((item.id = id)) {
      list.splice(id, 1);
    }
  }
  event.target.parentElement.parentElement.remove();
  console.log(event.target.parentElement.parentElement);
  console.log(list);
}

addBtn1.addEventListener('click', function () {
  const id = notStarted.length + 1;
  render(notStartedList, notStarted);
  const obj = { id: `${id}`, taskName: `Task ${id}` };
  notStarted.push(obj);
  const tempList = local(notStarted);
  localStorage.setItem('notStarted', tempList);
  dragItem();
});
addBtn2.addEventListener('click', function () {
  const id = inprogress.length + 1;

  const obj = { id: `${id}`, taskName: `Task ${id}` };
  inprogress.push(obj);
  const tempList = local(inprogress);
  localStorage.setItem('inprogress', tempList);
  render(inProgressList, inprogress);

  dragItem();
});
addBtn3.addEventListener('click', function () {
  const id = completed.length + 1;
  const obj = { id: `${id}`, taskName: `Task ${id}` };
  // completed.push(obj);
  completed.push(obj['taskName']);
  const tempList = local(completed);
  localStorage.setItem('completed', tempList);
  render(completedList, completed);
  dragItem();
});
function render(section, list) {
  section.innerHTML = '';
  if (list !== null) {
    for (const item of list) {
      const text = item['taskName'];
      const fragment = document.createDocumentFragment();
      const li = fragment.appendChild(document.createElement('li'));
      const id = item['id'];
      li.className = 'task';
      // li.innerHTML = `<p>Task ${id}<p>
      li.setAttribute('draggable', 'true');
      li.innerHTML = `
    <input type="text" id="myText" disabled value="task"></input>
    
    <p>
    <div class='icons'>
    <ion-icon onclick='edit()' id = 'edit' class ='icon' name="create-outline"></ion-icon>
    <ion-icon  onclick="delet(${id} , completed)" class="icon" id ='delete' name="close-sharp"></ion-icon>
    </div>`;
      section.appendChild(fragment);
    }
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
      });
    });
  });
}
// window.localStorage.setItem('body', document.querySelector('body'));
// document.body.innerHTML = window.localStorage.getItem('body');
dragItem();
//change color
function addColor() {
  if (localStorage.getItem('color')) {
    document.body.className = localStorage.getItem('color');
    console.log(localStorage.getItem('color'));
  }
}

green.addEventListener('click', function () {
  localStorage.setItem('color', 'green');
  addColor();
});
blue.addEventListener('click', function () {
  localStorage.setItem('color', 'blue');
  addColor();
});
render(completed, completedList);
function addLocal() {
  if (localStorage.completed !== null) {
    completed.push(JSON.parse(localStorage.getItem('completed') || '[]'));
  }
  render(completed, completedList);
  console.log(completed);
}
addLocal();

// addEventListener('DOMContentLoaded', dragItem);
