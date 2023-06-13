import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

//"implicit return"
const StartButton = ({ callback }) => (
    <StyledStartButton onClick={callback} >
        Reset Game
    </StyledStartButton>
); 

export default StartButton;
