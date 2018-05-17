import React from 'react';

const PopulateStreams = (props) => {
    return (
        <a href={props.streamLink}>
            <div className="streamer">
                <div className="streamer__image">
                    <img src={props.userImage} alt={props.streamer}/>
                </div>
                <div className="streamer__description">
                    <p className="paragraph--large">
                        {props.streamer} is live!
                    </p>
                    <p className="paragraph--small">
                        Playing {props.game} for {props.views} viewers.
                    </p>
                </div>
            </div>
        </a>
    )
}

export default PopulateStreams;