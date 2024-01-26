const gameButtonsWrapper = document.querySelector('.game__buttons-wrapper');

const shuffleBtn = document.querySelector('.shuffle-btn');
const pauseBtn = document.querySelector('.pause-btn');
const saveBtn = document.querySelector('.save-btn');
const winsBtn = document.querySelector('.wins-btn');

const steps = document.querySelector('.steps');
const time = document.querySelector('.time');

const modal = document.querySelector('.modal');

const gameSizeSection = document.querySelector('.game__size');

const size = [4];
let buttonsOrder = [];
const emptyCoordinates = [];

let seconds = 0;
let minutes = 0;
let hours = 0;

setButtonsOrder();
outputButtons();
setCoordinates();
setButtonsPlaces();
getEmptyButtonCoordinates();

// **************
// **************

gameButtonsWrapper.addEventListener('click', clickOnButton);
document.addEventListener('keyup', pressArrow);

document.addEventListener('keydown', keyZ);

shuffleBtn.addEventListener('click', function () {
  time.textContent = 'time: 00:00:00';
  seconds = 0;
  minutes = 0;
  hours = 0;
});

shuffleBtn.addEventListener('click', toShuffle);

shuffleBtn.addEventListener('click', function () {
  steps.innerHTML = `steps: <span>0</span>`;
});

// *******************************************************************************************
// *******************************************************************************************



// timer
// const timerIdOne = setInterval(function () {
//   seconds += 1;
//   if (seconds === 60) {
//     seconds = 0;
//     minutes += 1;
//   }
//   if (minutes === 60) {
//     hours += 1;
//   }
//   time.textContent =
//     `time: ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
// }, 1000);


function timerId() {
  setTimeout(function runTime() {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes === 60) {
      hours += 1;
    }
    time.textContent =
      `time: ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    setTimeout(runTime, 1000);
  }, 1000)
};

shuffleBtn.addEventListener('click', function run () {
  timerId();
  this.removeEventListener('click', run);

  pauseBtn.addEventListener('click', function toStopTimer() {
    modal.classList.toggle('open');

    if (modal.classList.contains('open')) {
      const arr = time.textContent.split(':');
      let sec = arr[3];
      let min = arr[2];
      let hou = arr[1];
      time.remove();
      const p = document.createElement('p');
      p.classList.add('time');
      document.querySelector('.game__control li:last-child').append(p);
      p.textContent = `time: ${hou}:${min}:${sec}`;
    }
    else {

    }
})
});

// *******************************************************************************************
// *******************************************************************************************


// setButtonsOrder
function setButtonsOrder() {
  buttonsOrder = []
  for (let i = 0; i < size * size; i += 1) {
    buttonsOrder.push(i + 1);
  }
}

// outputButtons
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

    if (el === size[0] * size[0]) button.classList.add('empty');
  })
}

// setCoordinates
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

// setButtonsPlaces
function setButtonsPlaces() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    if (size[0] === 3) {
      button.style.left = `${+button.getAttribute('data-x') * 100}px`;
      button.style.top = `${+button.getAttribute('data-y') * 100}px`;
      button.style.width = '100px';
      button.style.height = '100px';
    }
    if (size[0] === 4) {
      button.style.left = `${+button.getAttribute('data-x') * 75}px`;
      button.style.top = `${+button.getAttribute('data-y') * 75}px`;
      button.style.width = '75px';
      button.style.height = '75px';
    }
    if (size[0] === 5) {
      button.style.left = `${+button.getAttribute('data-x') * 60}px`;
      button.style.top = `${+button.getAttribute('data-y') * 60}px`;
      button.style.width = '60px';
      button.style.height = '60px';
    }
  })
}

// getEmptyButtonCoordinates
function getEmptyButtonCoordinates() {
  const emptyButton = document.querySelector('.button.empty');
  emptyCoordinates[0] = +emptyButton.getAttribute('data-x');
  emptyCoordinates[1] = +emptyButton.getAttribute('data-y');
}

// clickOnButton
function clickOnButton(e) {
  if (!e.target.closest('.button') || e.target.closest('empty')) return;

  const coordsDiff =
    Math.abs(
      (+emptyCoordinates[0] + +emptyCoordinates[1]) -
      (+e.target.getAttribute('data-x') + +e.target.getAttribute('data-y')));

  if (coordsDiff !== 1) return;

  const emptyBtn = document.querySelector('.empty');
  const clickedBtn = e.target;

  replaceButtons(emptyBtn, clickedBtn);
  stepCounter();
}

// pressArrow
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
  stepCounter();
}

// ---------- helper - replaceButtons
function replaceButtons(emptyBtn, clickedBtn) {
  emptyBtn.setAttribute('data-x', clickedBtn.getAttribute('data-x'));
  emptyBtn.setAttribute('data-y', clickedBtn.getAttribute('data-y'));

  let currentSize = null;
  if (size[0] === 3) currentSize = 100;
  if (size[0] === 4) currentSize = 75;
  if (size[0] === 5) currentSize = 60;
  // -----------------

  emptyBtn.style.left = `${+emptyBtn.getAttribute('data-x') * currentSize}px`;
  emptyBtn.style.top = `${+emptyBtn.getAttribute('data-y') * currentSize}px`;

  clickedBtn.setAttribute('data-x', `${emptyCoordinates[0]}`);
  clickedBtn.setAttribute('data-y', `${emptyCoordinates[1]}`);

  clickedBtn.style.left = `${+clickedBtn.getAttribute('data-x') * currentSize}px`;
  clickedBtn.style.top = `${+clickedBtn.getAttribute('data-y') * currentSize}px`;

  emptyCoordinates[0] = +emptyBtn.getAttribute('data-x');
  emptyCoordinates[1] = +emptyBtn.getAttribute('data-y');

  // change data-order attributess

  const emptyDataOrder = emptyBtn.getAttribute('data-order');
  const clickedBtnDataOrder = clickedBtn.getAttribute('data-order');

  emptyBtn.setAttribute('data-order', clickedBtnDataOrder);
  clickedBtn.setAttribute('data-order', emptyDataOrder);
}

// ---------- helper - getRandomNumber
function getRandomNumber(min = 1, max = size[0] ** 2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ---------- helper - stepCounter
function stepCounter() {
  const stepsNum = steps.querySelector('span').textContent;
  steps.innerHTML = `steps: <span>${+stepsNum + 1}</span>`;
}

// toShuffle
function toShuffle() {
  for (let i = 0; i < 2000; i += 1) {
    const randomNum = getRandomNumber();
    document.querySelector(`[data-value="${randomNum}"]`).click();
  }
  modal.classList.remove('open');
}

gameSizeSection.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;

  const refreshSize = +e.target.getAttribute('data-size-value');
  if (size[0] === refreshSize) return;

  size[0] = refreshSize;
  gameButtonsWrapper.textContent = '';
  setButtonsOrder();
  outputButtons();
  setCoordinates();
  setButtonsPlaces();
  getEmptyButtonCoordinates();
})

// pauseGame
// function pauseGame() {
//   modal.classList.toggle('open');
// }

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
    let currentSize = null;
    if (size[0] === 3) currentSize = 100;
    if (size[0] === 4) currentSize = 75;
    if (size[0] === 5) currentSize = 60;

    const firstX = first.getAttribute('data-x');
    const firstY = first.getAttribute('data-y');

    first.setAttribute('data-x', second.getAttribute('data-x'));
    first.setAttribute('data-y', second.getAttribute('data-y'));

    first.style.left = `${+first.getAttribute('data-x') * currentSize}px`;
    first.style.top = `${+first.getAttribute('data-y') * currentSize}px`;

    second.setAttribute('data-x', firstX);
    second.setAttribute('data-y', firstY);

    second.style.left = `${+second.getAttribute('data-x') * currentSize}px`;
    second.style.top = `${+second.getAttribute('data-y') * currentSize}px`;

    // change data-order attributess
    const firstOrder = first.getAttribute('data-order');
    const secondOrder = second.getAttribute('data-order');

    first.setAttribute('data-order', secondOrder);
    second.setAttribute('data-order', firstOrder);
  }

  getEmptyButtonCoordinates();
}