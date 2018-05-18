import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import GameOptions from './GameOptions';
import PopulateStreams from './PopulateStreams';
import Twitch from './Twitch';

console.log(Twitch);

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      gameNames: [
        'Street Fighter V',
        'Tekken 7',
        'Dragon Ball FighterZ',
        'Ultra Street Fighter IV',
        'Super Street Fighter II Turbo',
        'Under Night In-Birth Exe:Late[st]',
        'Bishoujo Senshi Sailor Moon S',
        'Vampire Savior',
        'Soul Calibur VI',
        'BlazBlue Cross Tag Battle',
        `Guilty Gear Xrd REV 2`,
        `Guilty Gear XX Λ Core`,
        `Street Fighter EX2 Plus`,
        'Injustice 2',
        'Mortal Kombat X',
        `Super Smash Bros. for Wii U`,
        `Arcana Heart 3: LOVE MAX SIX STARS!!!!!!`,
        `Marvel vs. Capcom Infinite`,
        `Street Fighter Alpha 2`,
        `Street Fighter Alpha 3`,
        `Samurai Showdown V Special`,
        `The King of Fighters XIV`,
        `Capcom Vs. SNK 2: Mark of the Millenium`,
        `Fighting Layer EX`,
        `Virtua Fighter 5 Final Showdown`,
        `Soul Calibur VI`,
        `Soul Calibur V`,
        `Akatsuki Blitzkampf`,
        `Melty Blood Actress Again: Current Code`,
        `Street Fighter III: Third Strike`,
        `Them's Fightin' Herds`,
        `Skullgirls`,
        `Super Smash Bros. Brawl`,
        `Super Smash Bros.`,
        `The King of Fighters '98: The Slugfest`,
        `Hokuto no Ken`,
        `Vampire Savior`,
        `The King of Fighters '97`,
        `Killer Instinct`,
        `Street Fighter X Tekken`,
        `Tatsunoko vs. Capcom: Ultimate All Stars`,
        `Divekick`,
        `Rising Thunder`,
        `For Honor`,
        `Karnov's Revenge`,
        `Ultimate Marvel vs. Capcom 3`
      ],
      gameData: [],
      streams: [],
      clientID: `lra80m629sy0ddxg15ib1ei5119vul`,
      clientAuth: `wbp4z9ojzyfw21c748mezgmyseagjk`,
      streamToOpen: '',
      twitchVisible: false
    };

    this.gameChange = this.gameChange.bind(this);
    this.streamOpen = this.streamOpen.bind(this);
  }

  componentDidMount() {
    Axios({
      method: "get",
      url: "https://api.twitch.tv/helix/games",
      params: {
        name: this.state.gameNames
      },
      headers: {
        "Client-ID": this.state.clientID,
        Authorization: `Bearer ${this.state.clientAuth}`
      }
    }).then(res => {
      const gameIDS = res.data.data;
      console.log(gameIDS);
      this.setState({
        gameData: gameIDS
      });
    });
  }

  streamOpen(id) {
    const streamerName = id;
    console.log(streamerName);

    this.setState({ 
      twitchVisible: true 
    }, ()=> {
      this.setState({
        streamToOpen: new Twitch.Embed(`twitch-embed`, {
          width: 1280,
          height: 720,
          channel: streamerName,
          theme: "dark"
        })
      });
    });
  
  }

  gameChange(e) {
    const selectedID = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    Axios({
      method: 'get',
      url: 'https://api.twitch.tv/helix/streams',
      params: {
        game_id: selectedID
      },
      headers: {
        "Client-ID": this.state.clientID,
        Authorization: `Bearer ${this.state.clientAuth}`
      }
    }).then(res => {
      const streamData = res.data.data;

      const dataCompiled = streamData.map((stream) => {
        const nameSpliced = stream.thumbnail_url.replace('https://static-cdn.jtvnw.net/previews-ttv/live_user_','').replace('-{width}x{height}.jpg','')
        return {
          userId: stream.user_id,
          userName: nameSpliced,
          gameName: selectedName,
          gameID: selectedID,
          userThumbnail: stream.thumbnail_url.replace('{width}','320').replace('{height}','180'),
          streamURL: `http://twitch.tv/${nameSpliced}`,
          viewerCount: stream.viewer_count
        }
      });

      console.log(dataCompiled);
      this.setState({
        streams: dataCompiled
      });
    });
  }

  render() {
    return <div className="content">
        <div className="header">
          <div className="header__heading">
            <h1>
              <i className="fab fa-twitch" /> Twitch Stream Finder
            </h1>
          </div>
          <div className="header__changer">
            <select name="gameSelect" id="gameSelect" onChange={this.gameChange}>
              <option value disabled defaultValue selected>
                --Please Choose a Game--
              </option>
              {this.state.gameData.map(game => {
                return <GameOptions gameID={game.id} gameName={game.name} key={game.id} />;
              })}
            </select>
          </div>
        </div>
        <div className="streamWrapper">
          {this.state.streams.map((stream, index) => {
            return <PopulateStreams streamer={stream.userName} game={stream.gameName} views={stream.viewerCount} streamLink={stream.streamURL} key={stream.userId} userImage={stream.userThumbnail} index={index + 1} streamOpen={this.streamOpen} />;
          })}
        </div>
        {this.state.twitchVisible 
        ? 
          <div className="video-container">
            <div id="twitch-embed"></div>
          </div> 
        : 
        null}
      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
