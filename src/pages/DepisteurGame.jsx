
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import { AppContext } from '../context/AppContext';
import styles from 'assets/style/depisteurgame.module.scss';
import mainStyles from 'assets/style/main.module.scss';
import messages from 'pages/texte.json';


const NBR_OF_BOMB = 50;
const NBR_OF_ROWS = 8;
const MAX_LIVES = 6;


const createGrid = () => {
  const grid = [];
  for (let i = 0;i < NBR_OF_ROWS;i++) {
    grid.push([]);
    for (let j = 0;j < NBR_OF_ROWS;j++) {
      grid[i].push({
        id: `${i}-${j}`,
        value: 0,
        isRevealed: false,
        isFlagged: false,
        isBacteria: false,
        isVirus: false,
      });
    }
  }
  setDiseases(grid);
  setValues(grid);
  return grid;
};


const setDiseases = (grid) => {
  let count = 0;
  while (count < NBR_OF_BOMB) {
    const randomRow = Math.floor(Math.random() * NBR_OF_ROWS);
    const randomCol = Math.floor(Math.random() * NBR_OF_ROWS);
    const randomCell = grid[randomRow][randomCol];
    if (!randomCell.isBacteria && !randomCell.isVirus) {
      if (Math.random() < 0.5)
        randomCell.isBacteria = true;
      else
        randomCell.isVirus = true;

      count++;
    }
  }
  return grid;
};

const getAdjacentCases = (grid, row, col) => {
  row = parseInt(row);
  col = parseInt(col);

  const adjacentCases = [];
  for (let i = (row - 1);i <= (row + 1);i++) {
    for (let j = (col - 1);j <= (col + 1);j++) {
      if (i >= 0 && i < NBR_OF_ROWS && j >= 0 && j < NBR_OF_ROWS && !(i === row && j === col))
        adjacentCases.push(JSON.parse(JSON.stringify(grid[i][j])));
    }
  }
  return adjacentCases;
};

const setValues = (grid) => {
  for (let i = 0;i < NBR_OF_ROWS;i++) {
    for (let j = 0;j < NBR_OF_ROWS;j++) {
      if (!grid[i][j].isVirus && !grid[i][j].isBacteria) {
        const adjacentCases = getAdjacentCases(grid, i, j);
        let value = 0;
        for (let k = 0;k < adjacentCases.length;k++) {
          if (adjacentCases[k].isVirus || adjacentCases[k].isBacteria)
            value++;
        }
        grid[i][j].value = value;
      }
    }
  }
  return grid;
};

const getRandomMessage = () => {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
};

const DepisteurGame = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(null);
  const [lives, setLives] = useState(MAX_LIVES);
  const [revealedDiseases, setRevealedDiseases] = useState(null);
  const [moves, setMoves] = useState(0);
  const { currentScore, setCurrentScore } = useContext(AppContext);
  const modalRef = useRef();

  const revealCase = (grid, row, col) => {
    setMoves(moves + 1);
    let newGrid = JSON.parse(JSON.stringify(grid));
    const currentCase = newGrid[row][col];
    if (currentCase.isRevealed || currentCase.isFlagged)
      return newGrid;
    if (currentCase.isBacteria || currentCase.isVirus) {
      if (currentCase.isVirus)
        setLives(Math.max(lives - 3, 0));
      else
        setLives(Math.max(lives - 2, 0));
    }
    currentCase.isRevealed = true;
    newGrid = revealAdjacentCases(newGrid, row, col);
    setGrid(newGrid);
    if (checkVictory(newGrid)) {
      setCurrentScore(100 - moves);
      console.log('Victory');
      //navigate('/games/depisteur/leaderboard');
    }
  };

  const resetGrid = () => {
    setGrid(createGrid());
    setLives(MAX_LIVES);
    setRevealedDiseases(null);
    setMoves(0);
  };

  const checkVictory = (grid) => {
    let count = 0;
    for (let i = 0;i < NBR_OF_ROWS;i++) {
      for (let j = 0;j < NBR_OF_ROWS;j++) {
        if (grid[i][j].isRevealed)
          count++;
      }
    }
    if (count === (NBR_OF_ROWS * NBR_OF_ROWS) - NBR_OF_BOMB)
      return true;
    return false;
  };

  const checkDeath = () => {
    if (lives <= 0) {
      modalRef.current.open('Vous avez perdu...', getRandomMessage().message);
      return true;
    }
    return false;
  };

  const revealAdjacentCases = (grid, row, col) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    const currentCase = newGrid[row][col];
    if (currentCase.value === 0 && !currentCase.isBacteria && !currentCase.isVirus) {
      const adjacentCases = getAdjacentCases(JSON.parse(JSON.stringify(newGrid)), row, col);
      for (let i = 0;i < adjacentCases.length;i++) {
        const adjacentCase = adjacentCases[i];
        if (!adjacentCase.isRevealed && !adjacentCase.isFlagged && adjacentCase.isBacteria === false && adjacentCase.isVirus === false) {
          adjacentCase.isRevealed = true;
          newGrid[adjacentCase.id.split('-')[0]][adjacentCase.id.split('-')[1]] = adjacentCase;
          newGrid = revealAdjacentCases(JSON.parse(JSON.stringify(newGrid)), adjacentCase.id.split('-')[0], adjacentCase.id.split('-')[1]);
        }
      }
    }
    return newGrid;
  };


  useEffect(() => {
    setGrid(createGrid());
  }, []);

  useEffect(() => {
    //if (grid == null)
    //return;
    //console.log(grid);
    //console.log(getAdjacentCases(grid, 3, 3));
  }, [grid]);

  const handleImage = (item) => {
    if (item.isRevealed) {
      if (item.isBacteria)
        return (<img src='/img/games/depisteur/bacterie.png'></img>);
      if (item.isVirus)
        return (<img src='/img/games/depisteur/virus.png'></img>);
      return item.value === 0 ? undefined : item.value;
    }
    if (item.isFlagged)
      return (<img src='/img/games/depisteur/capote_normale_orange.png'></img>);
    return undefined;
  };

  const handleOnClick = (item, i, j) => {
    if (checkDeath())
      return;
    if (item.isRevealed)
      return;
    revealCase(grid, i, j);
  };

  const handleOnContextMenu = (event, item, i, j) => {
    event.preventDefault();
    if (checkDeath())
      return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (item.isRevealed)
      return;
    newGrid[i][j].isFlagged = !newGrid[i][j].isFlagged;
    setGrid(newGrid);
  };

  return (
    <div className={mainStyles.main}>
      <header>
        <h1>Depisteur</h1>
        <div className={styles.container}>
          <div className={styles.lives}>
            {lives} / {MAX_LIVES}
          </div>
          <table>
            <tbody>
              {grid ? grid.map((line, index) => (
                <tr key={`line-${index}`}>
                  {line.map((item, index2) => (
                    <td key={`elem-${index}-${index2}`} className={item.isRevealed ? styles.isRevealed : styles.isHidden}
                      onClick={() => {
                        handleOnClick(item, index, index2);
                      }}
                      onContextMenu={(e) => {
                        handleOnContextMenu(e, item, index, index2);
                      }}
                    >
                      {handleImage(item)}
                    </td>
                  ))}
                </tr>
              )) : <td>no grid</td>}
            </tbody>
          </table>
          <div className={styles.bottom}>
            {grid ? checkVictory(grid) ? <div><span>Victoire !</span><Link to='/games/depisteur/leaderboard'>Scores</Link></div> : undefined : undefined}
            {grid ? checkDeath() ? <button onClick={() => {
              resetGrid();
            }}>Recommencer</button> : undefined : undefined}
          </div>
        </div>
      </header>
      <Modal ref={modalRef} />
    </div>
  );
};

export default DepisteurGame;
