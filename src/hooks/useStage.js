import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage => {
      return newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);
    };

    const updateStage = prevStage => {
      //First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Then draw the tetromoino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // Then check if we have collided
      if (player.collided) {
        resetPlayer();
        const clearedRows = sweepRows(newStage);
        setRowsCleared(prev => prev + clearedRows.length);

        // Use the callback function syntax to update the stage state based on the previous state
        setStage(prev => {
          const newStage = [...prev];
          clearedRows.forEach((row, index) => {
            newStage[index] = row;
          });
          return newStage;
        });
        return;
      }

      setStage(newStage);
      return newStage;
    };

    // Call the updateStage function and pass the current stage state as an argument
    updateStage(stage);

  }, [player, resetPlayer, stage, setRowsCleared, setStage]);

  // Return the stage, setStage and rowsCleared values as an array
  return [stage, setStage, rowsCleared];
};
