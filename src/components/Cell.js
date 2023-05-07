import React from "react";
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';
 
const Cell = ({ type }) => (
    <StyledCell type={'I'} color={TETROMINOS['I'].color} />
)

export default Cell;
