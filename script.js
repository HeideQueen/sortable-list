const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const vTubers = [
  'Suzuhara Lulu',
  'Usada Pekora',
  'Nakiri Ayame',
  'Inugami Korone',
  'Ookami Mio',
  'Nekomata Okayu',
  'Houshou Marine',
  'Amane Kanata',
  'Tokoyami Towa',
  'Akai Haato',
];

// store list items
const listItems = [];

let dragStartIndex;

createList();

// insert list items into DOM
function createList() {
  [...vTubers]
    .map((vTuber) => ({
      value: vTuber,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((vTuber, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class='number'>${index + 1}</span>
      <div class='draggable' draggable='true'>
        <p class='vtuber-name'>${vTuber}</p>
        <i class='fa fa-grip-lines'></i>
      </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

// swap items that are drap and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check order of list items
function checkOrder() {
  listItems.forEach((item, index) => {
    const vtuberName = item.querySelector('.draggable').innerText.trim();

    if (vtuberName !== vTubers[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
