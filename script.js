const gameButtonsWrapper = document.querySelector('.game__buttons-wrapper');

const size = [4];
const buttonsOrder = [];
const emptyCoordinates = [];

setButtonsOrder();
outputButtons();
setCoordinates();
setButtonsPlaces();

getEmptyButtonCoordinates();

gameButtonsWrapper.addEventListener('click', clickOnButton);
document.addEventListener('keyup', pressArrow);

document.addEventListener('keydown', keyZ);


function setButtonsOrder() {
  for (let i = 0; i < size * size; i += 1) {
    buttonsOrder.push(i + 1);
  }
}

function outputButtons() {
  buttonsOrder.forEach((el) => {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = el;
    button.setAttribute('tabindex', '-1');
    gameButtonsWrapper.append(button);

    button.setAttribute('data-order', el);
    button.setAttribute('data-value', el);

    const img = document.createElement('img');
    img.setAttribute('src', './images/hand_drawn.png');
    button.append(img);

    if (el === 16) button.classList.add('empty');
  })
}

function setCoordinates() {
  let x = 0;
  let y = 0;
  const buttons = document.querySelectorAll('.button');

  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].setAttribute('data-x', `${x}`);
    buttons[i].setAttribute('data-y', `${y}`);
    x += 1;
    if (x === size[0]) y += 1;
    if (x === size[0]) x = 0;
  }
}

function setButtonsPlaces() {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach((button) => {
    button.style.left = `${+button.getAttribute('data-x') * 75}px`;
    button.style.top = `${+button.getAttribute('data-y') * 75}px`;
  })
}

function getEmptyButtonCoordinates() {
  const emptyButton = document.querySelector('.button.empty');
  emptyCoordinates[0] = +emptyButton.getAttribute('data-x');
  emptyCoordinates[1] = +emptyButton.getAttribute('data-y');
}

// ************************
// ************************
function clickOnButton(e) {
  if (!e.target.closest('.button') || e.target.closest('empty')) return;

  const coordsDiff =
    Math.abs(
      (+emptyCoordinates[0] + +emptyCoordinates[1]) -
      (+e.target.getAttribute('data-x') + +e.target.getAttribute('data-y')));

  if (coordsDiff !== 1) return;

  const emptyBtn = document.querySelector('.empty');
  const clickedBtn = e.target;

  replaceButtons(emptyBtn, clickedBtn)
}

function pressArrow(e) {
  if (e.key !== 'ArrowUp' &&
    e.key !== 'ArrowRight' &&
    e.key !== 'ArrowDown' &&
    e.key !== 'ArrowLeft') return;

  if (e.key === 'ArrowUp') {
    const buttonToMove =
      document.querySelector(
        `[data-x="${emptyCoordinates[0]}"][data-y="${+emptyCoordinates[1] + 1}"]`);

    if (buttonToMove) {
      const emptyBtn = document.querySelector('.empty');
      const clickedBtn = buttonToMove;
      replaceButtons(emptyBtn, clickedBtn);
    }
  }

  if (e.key === 'ArrowRight') {
    const buttonToMove =
      document.querySelector(
        `[data-x="${emptyCoordinates[0] - 1}"][data-y="${+emptyCoordinates[1]}"]`);

    if (buttonToMove) {
      const emptyBtn = document.querySelector('.empty');
      const clickedBtn = buttonToMove;
      replaceButtons(emptyBtn, clickedBtn);
    }
  }

  if (e.key === 'ArrowDown') {
    const buttonToMove =
      document.querySelector(
        `[data-x="${emptyCoordinates[0]}"][data-y="${+emptyCoordinates[1] - 1}"]`);

    if (buttonToMove) {
      const emptyBtn = document.querySelector('.empty');
      const clickedBtn = buttonToMove;
      replaceButtons(emptyBtn, clickedBtn);
    }
  }

  if (e.key === 'ArrowLeft') {
    const buttonToMove =
      document.querySelector(
        `[data-x="${emptyCoordinates[0] + 1}"][data-y="${+emptyCoordinates[1]}"]`);

    if (buttonToMove) {
      const emptyBtn = document.querySelector('.empty');
      const clickedBtn = buttonToMove;
      replaceButtons(emptyBtn, clickedBtn);
    }
  }
}

// helper
function replaceButtons(emptyBtn, clickedBtn) {
  emptyBtn.setAttribute('data-x', clickedBtn.getAttribute('data-x'));
  emptyBtn.setAttribute('data-y', clickedBtn.getAttribute('data-y'));

  emptyBtn.style.left = `${+emptyBtn.getAttribute('data-x') * 75}px`;
  emptyBtn.style.top = `${+emptyBtn.getAttribute('data-y') * 75}px`;

  clickedBtn.setAttribute('data-x', `${emptyCoordinates[0]}`);
  clickedBtn.setAttribute('data-y', `${emptyCoordinates[1]}`);

  clickedBtn.style.left = `${+clickedBtn.getAttribute('data-x') * 75}px`;
  clickedBtn.style.top = `${+clickedBtn.getAttribute('data-y') * 75}px`;

  emptyCoordinates[0] = +emptyBtn.getAttribute('data-x');
  emptyCoordinates[1] = +emptyBtn.getAttribute('data-y');

  // change data-order attributess

  const emptyDataOrder = emptyBtn.getAttribute('data-order');
  const clickedBtnDataOrder = clickedBtn.getAttribute('data-order');

  emptyBtn.setAttribute('data-order', clickedBtnDataOrder);
  clickedBtn.setAttribute('data-order', emptyDataOrder);
}

// **********
// **********
function keyZ(e) {
  if (e.code !== 'KeyZ') return;

  const arr = Array.from(document.querySelectorAll('.button'));

  for (let i = 0; i < arr.length; i += 1) {
    if (+arr[i].getAttribute('data-value') === +arr[i].getAttribute('data-order')) continue;

    const first = arr[i];
    const second =
      document.querySelector(`[data-order="${first.getAttribute('data-value')}"]`);

    // *********
    const firstX = first.getAttribute('data-x');
    const firstY = first.getAttribute('data-y');

    first.setAttribute('data-x', second.getAttribute('data-x'));
    first.setAttribute('data-y', second.getAttribute('data-y'));

    first.style.left = `${+first.getAttribute('data-x') * 75}px`;
    first.style.top = `${+first.getAttribute('data-y') * 75}px`;

    second.setAttribute('data-x', firstX);
    second.setAttribute('data-y', firstY);

    second.style.left = `${+second.getAttribute('data-x') * 75}px`;
    second.style.top = `${+second.getAttribute('data-y') * 75}px`;

    // change data-order attributess
    const firstOrder = first.getAttribute('data-order');
    const secondOrder = second.getAttribute('data-order');

    first.setAttribute('data-order', secondOrder);
    second.setAttribute('data-order', firstOrder);
  }

  getEmptyButtonCoordinates();
}