import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import styles from './morpion.module.scss';

const boardValues = {
  empty: 'empty',
  morpion: 'morpion',
  razor: 'razor',
};

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}


const checkWin = (updatedPos, board) => {
  const { x, y } = updatedPos;
  let win = false;
  board.forEach((row) => {
    win = row.every((cell) => cell === board[y][x]);
  });

  if (win)
    return true;

  transpose(board).forEach((col) => {
    win = col.every((cell) => cell === board[y][x]);
  });
  if (win)
    return true;

  const rightDiag = [];
  const leftDiag = [];

  for (let i = 0;i < 3;i++) {
    rightDiag.push(board[i][i]);
    leftDiag.push(board[i][2 - i]);
  }

  win = rightDiag.every((cell) => cell === board[y][x]) || leftDiag.every((cell) => cell === board[y][x]);

  return win;
};


const initBoard = () => {
  const tempBoard = [];
  for (let i = 0;i < 3;i++) {
    tempBoard.push([]);
    for (let j = 0;j < 3;j++)
      tempBoard[i].push(boardValues.empty);
  }
  return tempBoard;
};

const getCells = (board, onClick) => {
  const cells = [];
  for (let i = 0;i < 3;i++) {
    for (let j = 0;j < 3;j++) {
      cells.push(
        <Cell value={board[i][j]} position={{ x: j, y: i }} onClick={() => onClick({ x: j, y: i })}/>
      );
    }
  }
  return cells;
};

const Morpion = () => {
  const [board, setBoard] = useState(initBoard());
  const [currentTurn, setCurrentTurn] = useState(boardValues.morpion);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const handleCellClick = (position) => {
    if (winner)
      return;
    const { x, y } = position;
    const tempBoard = [];
    if (board[y][x] !== boardValues.empty)
      return;

    for (let i = 0;i < 3;i++) {
      tempBoard.push([]);
      for (let j = 0;j < 3;j++)
        tempBoard[i].push((i === y && j === x) ? currentTurn : board[i][j]);
    }
    setBoard(tempBoard);
    if (checkWin(position, tempBoard)) {
      setWinner(currentTurn);
      setTimeout(() => {
        navigate('/');
      }, 4000);
    } else
      setCurrentTurn(currentTurn === boardValues.morpion ? boardValues.razor : boardValues.morpion);
  };

  return (
    <div className={styles.eGameWrapper}>
      { winner ? (
        <h2>{winner} won {winner === boardValues.morpion ? ':(' : ':D'}</h2>
      ) : (
        <h2>Current turn: {currentTurn}</h2>
      )}
      <div className={styles.eMorpionGrid}>
        {getCells(board, handleCellClick)}
      </div>
    </div>
  );
};

const Cell = ({ value, position, onClick }) => {
  const { x, y } = position;
  const classes = cn(styles.eGridCell, {
    [styles.mTopBorder]: y > 0,
    [styles.mBottomBorder]: y < 2,
    [styles.mLeftBorder]: x > 0,
    [styles.mRightBorder]: x < 2,
    [styles.mDarkHover]: value === boardValues.empty,
  });

  const mapping = {
    [boardValues.empty]: '',
    [boardValues.morpion]: 'X',
    [boardValues.razor]: 'O',
  };
  return (
    <div className={classes} onClick={onClick}>{mapping[value]}</div>
  );
};
export default Morpion;
