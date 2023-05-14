import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

//"implicit return"
const StartButton = ({ callback, disabled }) => (
    <StyledStartButton onClick={callback} disabled ={disabled} >
        Start Game
    </StyledStartButton>
);

export default StartButton;
