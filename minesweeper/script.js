//display/ui

import {
  createBoard,
  markTile,
  TILE_STATUSES,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const subText = document.querySelector(".subtext");
const reset = document.querySelector(".reset");
const modal = document.querySelector(".info-modal");
const modalText = document.querySelector(".modal-text");
const modalBtn = document.querySelector(".modal-close-btn");
const WIN_TEXT = "Congrats. You Win 😀";
const LOSE_TEXT = "Sorry, You Lose 😭";

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

boardElement.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (!win && !lose) {
    return;
  }

  if (win || lose) {
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
    boardElement.addEventListener("click", stopProp, { capture: true });
  }

  if (win) {
    // subText.textContent = "You Win";
    modalText.textContent = WIN_TEXT;
  }
  if (lose) {
    // subText.textContent = "You Lose";
    modalText.textContent = LOSE_TEXT;
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.mine) revealTile(board, tile);
        if (tile.status === TILE_STATUSES.MARKED && tile.mine == false)
          markTile(tile);
      });
    });
  }
  modal.classList.add("show");
}

function stopProp(e) {
  e.stopImmediatePropagation();
}

modalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});
