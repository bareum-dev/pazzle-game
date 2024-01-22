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


function setButtonsOrder() {
  for (let i = 0; i < size * size; i += 1) {
    buttonsOrder.push(i);
  }
}

function outputButtons() {
  buttonsOrder.forEach((el) => {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = el;
    button.setAttribute('tabindex', '-1');
    gameButtonsWrapper.append(button);

    if (el === 0) button.classList.add('empty');
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
    button.style.left = `${+button.getAttribute('data-x') * 100}px`;
    button.style.top = `${+button.getAttribute('data-y') * 100}px`;
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

  emptyBtn.style.left = `${+emptyBtn.getAttribute('data-x') * 100}px`;
  emptyBtn.style.top = `${+emptyBtn.getAttribute('data-y') * 100}px`;

  clickedBtn.setAttribute('data-x', `${emptyCoordinates[0]}`);
  clickedBtn.setAttribute('data-y', `${emptyCoordinates[1]}`);

  clickedBtn.style.left = `${+clickedBtn.getAttribute('data-x') * 100}px`;
  clickedBtn.style.top = `${+clickedBtn.getAttribute('data-y') * 100}px`;

  emptyCoordinates[0] = +emptyBtn.getAttribute('data-x');
  emptyCoordinates[1] = +emptyBtn.getAttribute('data-y');
}