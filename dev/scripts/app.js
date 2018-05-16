import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import GameOptions from './GameOptions';


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
      streams: []
    };
  }

  componentDidMount() {
    Axios({
      method: "get",
      url: "https://api.twitch.tv/helix/games",
      params: {
        name: this.state.gameNames
      },
      headers: {
        "Client-ID": `lra80m629sy0ddxg15ib1ei5119vul`,
        Authorization: "Bearer " + `wbp4z9ojzyfw21c748mezgmyseagjk`
      }
    }).then(res => {
      const gameIDS = res.data.data;
      gameIDS.sort();
      console.log(gameIDS);
      this.setState({
        gameData: gameIDS
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Twitch Stream Finder</h1>
        <select name="gameSelect" id="gameSelect">
          {this.state.gameData.map((game) => {
            return <GameOptions gameID={game.id} gameName={game.name} />
          })}
        </select>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
