import React from 'react';

class PopulateStreams extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.streamOpen(this.props.streamer);
    }
    
    render() {
        return (
            <a onClick={this.handleClick}>
                <div className="streamer" id={this.props.index}>
                    <div className="streamer__image">
                        <img src={this.props.userImage} alt={this.props.streamer}/>
                    </div>
                    <div className="streamer__description">
                        <p className="paragraph--large">
                            {this.props.streamer} is live!
                        </p>
                        <p className="paragraph--small">
                            Playing {this.props.game} for {this.props.views} viewers.
                        </p>
                    </div>
                </div>
            </a>
        )
    }
}

export default PopulateStreams;