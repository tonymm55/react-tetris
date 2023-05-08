import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

//"implicit return"
const StartButton = ({ callback }) => (
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
)

export default StartButton;
