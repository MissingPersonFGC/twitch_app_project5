import React from 'react';

const GameOptions = (props) => {
    return(
        <option value={props.gameID} choice={props.gameName}>{props.gameName}</option>
    )
}

export default GameOptions;