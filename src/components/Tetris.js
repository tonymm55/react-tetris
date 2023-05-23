import React, { useState } from "react";
import { createStage, checkCollision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";
 
//Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

//React Hooks
const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

//React Custom Hooks
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  //Move Player Function
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  //Key Up Function
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the inteval again when user releases down arrow key
      if (keyCode === 40) {               //down key
        setDropTime(1000 / (level + 1));
      }
    }
  };

  //Start Game Function
  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  //Drop Function
  const drop = () => {
    // Increase level when player has cleared 5 rows
    if (rows > (level + 1) * 5) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Game Over
      if (player.pos.y < 1) {
        // code for posting score to UI
        window.parent.postMessage(
          JSON.stringify({ tetrisScore: score }),
          "https://arcade-game-room.netlify.app"
        );
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  //Drop Player Function
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  //UseInterval Custom Hook
  useInterval(() => {
      drop();
  }, dropTime);
  
  //Move Player Function
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) { //left arrow key
        movePlayer(-1);
      } else if (keyCode === 39) { //right arrow key
        movePlayer(1);
      } else if (keyCode === 40) { //down arrow key
        dropPlayer();
      } else if (keyCode === 38) { //up arrow key
        playerRotate(stage, 1); //need stage for collision detection and 1 is clockwise rotation
      } 
    }
  };

  //User Interface & Styling
  return (
    <StyledTetrisWrapper 
      role="button" 
      tabIndex="0" 
      onKeyDown={e => move(e)} 
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <div>
              <Display gameOver={gameOver} text="Game Over" />
              <Display text={`Score: ${score}`} />
            </div>
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
