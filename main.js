// Gameboard IIFE
const gameBoard = (() => {
  const spaces = document.getElementsByClassName("ttt-space")

  const board = []
  for (let i = 0; i < 9; i++) {
    board.push(0)
  }

  


  return {board, spaces}
})()

// Game IIFE
const Game = (() => {
  const winModal = document.getElementById("win-modal")
  const winModalText = document.getElementById("win-modal-text")
  let turn = 'x'
  let turnDisplay = document.getElementById('turn')

  const checkWin = () => {
    let triples = [
      [gameBoard.board[0],gameBoard.board[3],gameBoard.board[6]],
      [gameBoard.board[1],gameBoard.board[4],gameBoard.board[7]],
      [gameBoard.board[2],gameBoard.board[5],gameBoard.board[8]],
      [gameBoard.board[0],gameBoard.board[1],gameBoard.board[2]],
      [gameBoard.board[3],gameBoard.board[4],gameBoard.board[5]],
      [gameBoard.board[6],gameBoard.board[7],gameBoard.board[8]],
      [gameBoard.board[0],gameBoard.board[4],gameBoard.board[8]],
      [gameBoard.board[2],gameBoard.board[4],gameBoard.board[6]]
    ]
    let winner = false
    for (let i = 0; i < triples.length; i++) {
      const triple = triples[i];
      
      
      if (triple.every(item => item == 'x') || triple.every(item => item == 'o')) {
        winModal.style.display = 'flex'
        winner = true
        if (turn == 'x') {
          winModalText.innerHTML = "O's Win!"
          console.log("o win")
        }
        else {
          winModalText.innerHTML = "X's Win!"
          console.log("x win")
        }
      }
    }
    if (gameBoard.board.every(value => value !== 0) && !winner) {
      winModalText.innerHTML = "The game was a tie!"
      winModal.style.backgroundColor = "rgba(138, 150, 27, 0.616)"
      winModal.style.display = "flex"
    }
  }
  for (let i = 0; i < gameBoard.spaces.length; i++) {
    let spaceDivs = document.getElementsByClassName('ttt-space')
    spaceDivs[i].addEventListener( 'click', () => {
      if (gameBoard.board[i] == 0 ) {
        if (turn == 'x') {
          gameBoard.board[i] = turn
          turnDisplay.innerHTML = "O's Turn"
          turnDisplay.style.color = 'black'
          spaceDivs[i].innerHTML = turn
          turn = 'o'
        } 
        else {
          gameBoard.board[i] = turn
          turnDisplay.innerHTML = "X's Turn"
          turnDisplay.style.color = 'black'
          spaceDivs[i].innerHTML = turn
          turn = 'x'
        }
      }
      else {
        turnDisplay.innerHTML = "That is not a valid move"
        turnDisplay.style.color = "red"
      }
      
      checkWin()
    })
  }

})()

document.getElementById("restart").addEventListener('click', function(){location.reload()})
