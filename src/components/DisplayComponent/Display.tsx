import React from 'react';
import Scoreboard from './Scoreboard';
import TurnDisplay from './TurnDisplay';
import './display.css';

const Display = () => {
    return (
        <nav className="display">
            <TurnDisplay type="O"/>
            <Scoreboard/>
            <TurnDisplay type="X"/>
        </nav>
    )
}

export default Display;