const gameButtonsWrapper = document.querySelector('.game__buttons-wrapper');

const shuffleBtn = document.querySelector('.shuffle-btn');
const pauseBtn = document.querySelector('.pause-btn');
const saveBtn = document.querySelector('.save-btn');
const winsBtn = document.querySelector('.wins-btn');

const steps = document.querySelector('.steps');
const time = document.querySelector('.time');

const modal = document.querySelector('.modal');

const gameSizeSection = document.querySelector('.game__size');

let size = 4;
let buttonsOrder = [];
const emptyCoordinates = [];

let seconds = 0;
let minutes = 0;
let hours = 0;


// events
// *******************************************************************************************

gameButtonsWrapper.addEventListener('click', clickOnButton);
document.addEventListener('keyup', pressArrow);

gameSizeSection.addEventListener('click', setNewGameSize);

shuffleBtn.addEventListener('click', toShuffle);
shuffleBtn.addEventListener('click', resetSteps);
shuffleBtn.addEventListener('click', resetTimer);

document.addEventListener('keydown', keyZ);

// close modal
shuffleBtn.addEventListener('click', () => closeModal());
gameSizeSection.addEventListener('click', () => closeModal());

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
});


//functions
// *******************************************************************************************

startGame();

// startGame
function startGame() {
  setButtonsOrder();
  removeButtons();
  outputButtons();
  setCoordinates();
  setButtonsPlaces();
  getEmptyButtonCoordinates();
}

// setNewGameSize
function setNewGameSize(e) {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;

  let refreshSize = +e.target.getAttribute('data-size-value');
  if (+size === refreshSize) return;

  size = +refreshSize;
  startGame();
}

// setButtonsOrder
function setButtonsOrder() {
  buttonsOrder = [];
  for (let i = 0; i < size * size; i += 1) {
    buttonsOrder.push(i + 1);
  }
}

// removeButtons
function removeButtons() {
  let buttons = document.querySelectorAll('.button');
  if (buttons) {
    buttons.forEach((el) => el.remove());
  }
}

// outputButtons
function outputButtons() {
  buttonsOrder.forEach((el) => {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = el;
    button.setAttribute('tabindex', '-1');
    gameButtonsWrapper.appendChild(button);

    button.setAttribute('data-order', el);
    button.setAttribute('data-value', el);

    const img = document.createElement('img');
    img.setAttribute('src', './images/hand_drawn.png');
    button.appendChild(img);

    if (el === size * size) button.classList.add('empty');
  })
}

// setCoordinates
function setCoordinates() {
  let x = 0;
  let y = 0;
  let buttons = document.querySelectorAll('.button');

  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].setAttribute('data-x', `${x}`);
    buttons[i].setAttribute('data-y', `${y}`);
    x += 1;
    if (x === size) y += 1;
    if (x === size) x = 0;
  }
}

// setButtonsPlaces
function setButtonsPlaces() {
  let buttons = document.querySelectorAll('.button');

  let currentSize = null;
  if (+size === 3) currentSize = 100;
  if (+size === 4) currentSize = 75;
  if (+size === 5) currentSize = 60;

  buttons.forEach((button) => {
    button.style.left = `${+button.getAttribute('data-x') * currentSize}px`;
    button.style.top = `${+button.getAttribute('data-y') * currentSize}px`;
    button.style.width = `${currentSize}px`;
    button.style.height = `${currentSize}px`;
  })
}

// getEmptyButtonCoordinates
function getEmptyButtonCoordinates() {
  let emptyButton = document.querySelector('.button.empty');
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

  // ОТЛАДКА
  let winGame = isEndGame();
  if (winGame) openModal();

}

// pressArrow
function pressArrow(e) {
  if (e.key === 'ArrowUp') {
    const buttonToMove =
      document.querySelector(
        `[data-x="${emptyCoordinates[0]}"][data-y="${+emptyCoordinates[1] + 1}"]`);

    if (buttonToMove) {
      const emptyBtn = document.querySelector('.empty');
      const clickedBtn = buttonToMove;
      replaceButtons(emptyBtn, clickedBtn);
      stepCounter();

      // ОТЛАДКА
      let winGame = isEndGame();
      if (winGame) openModal();
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
      stepCounter();

      // ОТЛАДКА
      let winGame = isEndGame();
      if (winGame) openModal();
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
      stepCounter();

      // ОТЛАДКА
      let winGame = isEndGame();
      if (winGame) openModal();
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
      stepCounter();

      // ОТЛАДКА
      let winGame = isEndGame();
      if (winGame) openModal();
    }
  }
}

// isEndGame
function isEndGame() {
  const buttons = Array.from(document.querySelectorAll('.button'));
  return buttons.every((el) => {
    return +el.getAttribute('data-order') === +el.getAttribute('data-value')
  });
}

// openModal
function openModal() {
  modal.classList.add('open');
}

// closeModal
function closeModal() {
  modal.classList.remove('open');
}

// helpers
// *******************************************************************************************

// replaceButtons
function replaceButtons(emptyBtn, clickedBtn) {
  emptyBtn.setAttribute('data-x', clickedBtn.getAttribute('data-x'));
  emptyBtn.setAttribute('data-y', clickedBtn.getAttribute('data-y'));

  let currentSize = null;
  if (+size === 3) currentSize = 100;
  if (+size === 4) currentSize = 75;
  if (+size === 5) currentSize = 60;

  emptyBtn.style.left = `${+emptyBtn.getAttribute('data-x') * currentSize}px`;
  emptyBtn.style.top = `${+emptyBtn.getAttribute('data-y') * currentSize}px`;

  clickedBtn.setAttribute('data-x', `${emptyCoordinates[0]}`);
  clickedBtn.setAttribute('data-y', `${emptyCoordinates[1]}`);

  clickedBtn.style.left = `${+clickedBtn.getAttribute('data-x') * currentSize}px`;
  clickedBtn.style.top = `${+clickedBtn.getAttribute('data-y') * currentSize}px`;

  emptyCoordinates[0] = +emptyBtn.getAttribute('data-x');
  emptyCoordinates[1] = +emptyBtn.getAttribute('data-y');

  // change data-order attributes
  const emptyDataOrder = emptyBtn.getAttribute('data-order');
  const clickedBtnDataOrder = clickedBtn.getAttribute('data-order');
  emptyBtn.setAttribute('data-order', clickedBtnDataOrder);
  clickedBtn.setAttribute('data-order', emptyDataOrder);
}

// getRandomNumber
function getRandomNumber(min = 1, max = size ** 2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// stepCounter
function stepCounter() {
  let stepsCount = steps.querySelector('span').textContent;
  steps.innerHTML = `steps: <span>${+stepsCount + 1}</span>`;
}

// toShuffle
function toShuffle() {
  for (let i = 0; i < 2000; i += 1) {
    const randomNum = getRandomNumber();
    document.querySelector(`[data-value="${randomNum}"]`).click();
  }
}

// resetSteps
function resetSteps() {
  steps.innerHTML = `steps: <span>0</span>`;
}

// resetTimer
function resetTimer() {
  time.textContent = 'time: 00:00:00';
  seconds = 0;
  minutes = 0;
  hours = 0;
}

// keyZ - START
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
    if (+size === 3) currentSize = 100;
    if (+size === 4) currentSize = 75;
    if (+size === 5) currentSize = 60;

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

  // ОТЛАДКА
  let winGame = isEndGame();
  if (winGame) openModal();
}