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
const A = 'notStarted';
const B = 'inprogress';
const C = 'completed';
let data = JSON.parse(localStorage.getItem('data')) || [];
let drag = null;
// const all = {
//   notStartedList: 'notStarted',
//   inProgressList: 'inprogress',
//   completedList: 'completed',
// };
addColor();

// start rendering
render(notStartedList, A);
render(inProgressList, B);
render(completedList, C);

//edit function
function edit(id) {
   const li = event.target.parentElement.parentElement;
  li.innerHTML = `<input class='input' type="text" id="myText" ></input>
  `;
   const input = li.querySelector('input');
  input.addEventListener('change', function () {
    const txt = event.target.value;
    data.forEach((item) => {
      if (item.id == id) {
        item.taskName = txt;
      }
      localStorage.setItem('data', JSON.stringify(data));
      render(notStartedList, A);
      render(inProgressList, B);
      render(completedList, C);
    });
  });
  
}
//delete function
function delet(id) {
  data = data.filter(function (item) {
    console.log(item.id);
    return item.id !== id;
  });

  event.target.parentElement.parentElement.remove();

  localStorage.setItem('data', JSON.stringify(data));
}

//render the list
function render(section, statuee) {
  section.innerHTML = '';
  if (data !== null) {
    let x = 0;
    data.forEach(function (item) {
      if (item.statue === statuee) {
        const text = item.taskName;
        const fragment = document.createDocumentFragment();
        const li = fragment.appendChild(document.createElement('li'));
        const id = item.id;
        li.className = 'task';
        li.setAttribute('draggable', 'true');
        li.setAttribute('data-id', `${id}`);
        li.innerHTML = `
        <p>${text}</p>
        <div class='icons'>
        <ion-icon onclick='edit(${id})' id = 'edit' class ='icon' name="create-outline"></ion-icon>
        
        <ion-icon  onclick="delet(
          '${id}')
          " class="icon" id ='delete' name="close-sharp"></ion-icon>
          </div>
          `;
        section.appendChild(fragment);
      }
    });
  }
}
// drag & drop functionality
function dragItem() {
  const items = document.querySelectorAll('.task');
  const ul = document.querySelectorAll('ul');
  items.forEach((item) => {
    item.addEventListener('dragstart', function () {
      // this.style.background = '#2EBD95';
      drag = item;
      item.style.opacity = '0.5';
    });
    item.addEventListener('dragend', function () {
      drag = null;
      item.style.opacity = '1';
    });
    lists.forEach((lst) => {
      const completedList = document.getElementById('completedList');
      lst.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.background = '#007962';
      });
      lst.addEventListener('dragleave', function (e) {
        this.style.background = '#389E81';
      });
      lst.addEventListener('drop', function () {
        this.querySelector('ul').appendChild(drag);
        const listName = lst.getAttribute('data-name');
        const idDrag = drag.getAttribute('data-id');
        data.forEach((item) => {
          if (item.id === idDrag) {
            item.statue = listName;
            localStorage.setItem('data', JSON.stringify(data));
          }
        });
      });
    });
  });
}

//change color
function addColor() {
  if (localStorage.getItem('color')) {
    document.body.className = localStorage.getItem('color');
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

addBtn1.addEventListener('click', function () {
  const id = Math.random();
  const obj = { id: `${id}`, taskName: `New Task`, statue: A };
  data.push(obj);
  localStorage.setItem('data', JSON.stringify(data));
  render(notStartedList, A);
  dragItem();
});
addBtn2.addEventListener('click', function () {
  const id = Math.random();

  const obj = { id: `${id}`, taskName: `New Task`, statue: B };
  data.push(obj);
  localStorage.setItem('data', JSON.stringify(data));
  render(inProgressList, B);

  dragItem();
});
addBtn3.addEventListener('click', function () {
  const id = Math.random();
  const obj = { id: `${id}`, taskName: `New Task`, statue: C };
  data.push(obj);
  localStorage.setItem('data', JSON.stringify(data));
  render(completedList, C);
  dragItem();
});

// const form = document.querySelectorAll('myForm');
// form.forEach((item) => {
//   item.addEventListener('submit', function (e) {
//     e.preventDefault();
//     console.log(form.value);
//   });
// });
