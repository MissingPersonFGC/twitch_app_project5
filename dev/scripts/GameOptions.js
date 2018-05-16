import React from 'react';

const GameOptions = (props) => {
    return(
        <option value={props.gameID} key={props.gameID}>{props.gameName}</option>
    )
}

export default GameOptions;