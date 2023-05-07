import React from 'react';
import { StyledStage } from './styles/StyledStage';

import Cell from './Cell';

//no prop type checking for this tutorial. You can verify props with prop types?? what is this?
const Stage = ({ stage }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
)

export default Stage;