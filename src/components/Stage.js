import React from 'react';

import Cell from './Cell';

//no prop type checking for this tutorial. You can verify props with prop types?? what is this?
const Stage = ({ stage }) => (
    <div>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </div>
)

export default Stage;