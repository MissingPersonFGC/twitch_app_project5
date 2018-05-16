import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      games: [
        {
          name: 'Street Fighter V',
          id: 488615
        },
        {
          name: 'Tekken 7',
          id: 461067
        },
        {
          name: 'Dragon Ball FighterZ',
          id: 497385
        },
        {
          name: 'Under Night In-Birth Exe:Late[st]',
          id: 496678
        },
        {
          name: 'Injustice 2',
          id: 494995
        },
        {
          name: 'Super Street Fighter II Turbo',
          id: 1150
        },
        {
          name: 'Bishoujo Senshi Sailor Moon S',
          id: 6992
        }
      ],
      streams: []
    };
  }

  componentDidMount() {
    Axios({
      method: "get",
      url: "https://api.twitch.tv/helix/streams",
      params: {
        game_id: this.state.games[0].id
      },
      headers: {
        "Client-ID": `lra80m629sy0ddxg15ib1ei5119vul`,
        Authorization: "Bearer " + `wbp4z9ojzyfw21c748mezgmyseagjk`
      }
    }).then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
