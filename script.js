const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const vTubers = [
  'Usada Pekora',
  'Suzuhara Lulu',
  'Ookami Mio',
  'Inugami Korone',
  'Nakiri Ayame',
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
}
