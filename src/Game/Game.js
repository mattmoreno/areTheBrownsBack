import React, { Component } from 'react';
import Moment from 'react-moment';
import preloader from '../images/preloader.svg';

const urlForUsername = 'http://www.nfl.com/liveupdate/scores/scores.json';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
      //this.intervalId = setInterval(() => this.loadData(), 5000);
      this.loadData(); // also load one immediately
  }

  componentWillUnmount() {
      clearInterval(this.intervalId);
  }

  loadData() {
    fetch(urlForUsername)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }

        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          games: data,
          myTeamGame: '2018122305',
          week: 'REG15',
          awayTeam: 'bengals',
          homeTeam: 'browns'
        })
      }, () => {
        this.setState({
          requestFailed: true,
        })
      })
  }

  render() {
    if (this.state.requestFailed) return <img src={preloader} alt="Preloader" />
    if (!this.state.games) return <img src={preloader} alt="Preloader" />

    //console.log(this.state.games);

    const myTeamGame = this.state.games[this.state.myTeamGame];

    /* ARE THE BEARS HOME OR AWAY
    ======================================== */
    var myTeam = '';
    var opponent = '';

    if (myTeamGame.away.abbr === 'CLE') {
      myTeam = myTeamGame.away;
      opponent = myTeamGame.home;
    } else {
      myTeam = myTeamGame.home;
      opponent = myTeamGame.away;
    }

    //console.log(myTeam.score.T);


    /* GET SCORE OF THE GAME
    ======================================== */
    var genNoWords = ["No", "Nope", "Nah", "Nay", "No Chance", "No Way", "Umm no", "Get Real", "Yea Right"];
    var	genNo = genNoWords[Math.floor(Math.random() * genNoWords.length)];

    var genYesWords = ["Yes", "Yea", "Uh-Huh", "Yup", "We Back", "Yessir", "Totally", "Sure", "You Bet", "Totes", "You know it"];
    var	genYes = genYesWords[Math.floor(Math.random() * genYesWords.length)];

    var genNotSureWords = ["..."];
    var	genNotSure = genNotSureWords[Math.floor(Math.random() * genNotSureWords.length)];

    function MyTeamWin() {
      return <h2>{genYes}</h2>
    }

    function MyTeamLoss() {
      return <h2>{genNo}</h2>
    }

    function MyTeamInGame() {
      return <h2>{genNotSure}</h2>
    }

    function DidMyTeamWin() {
      if ((myTeamGame.qtr === 'Final' || myTeamGame.qtr === 'final overtime') && myTeam.score.T > opponent.score.T) {
        return <MyTeamWin />
      }
      if ((myTeamGame.qtr === 'Final' || myTeamGame.qtr === 'final overtime') && myTeam.score.T < opponent.score.T) {
        return <MyTeamLoss />
      }
      return <MyTeamInGame />
    }


    function AwayScore() {
      if (myTeamGame.qtr === 'Final' || myTeamGame.qtr === 'final overtime') {
        return <div className="score">{myTeamGame.away.score.T}</div>
      }
      return null
    }

    function HomeScore() {
      if (myTeamGame.qtr === 'Final' || myTeamGame.qtr === 'final overtime') {
        return <div className="score">{myTeamGame.home.score.T}</div>
      }
      return null
    }

    return (
      <React.Fragment>
        <div className="section ucbg h-100">
        <div className="container h-100">
          <div class="align-items-center justify-content-center">
          <h1>Are the Browns Back?</h1>
          <div className="arethey">
            <DidMyTeamWin />
          </div>

          <div className="boxscore row justify-content-center">
            <div className="col-md-6 col-lg-5">

              <div className="gameinfo text-center">
                <h4 id="gamedate"><Moment format="dddd, MMMM D, YYYY">{this.state.myTeamGame.slice(0, -2)}</Moment></h4>
                <h5 id="gamearena">{myTeamGame.stadium}</h5>
              </div>

              <div className="gamescores row">
                <div id="vis" className="col">
                  <div className={'team ' +  myTeamGame.away.abbr.toLowerCase()}>
                    <img src={'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/'+ myTeamGame.away.abbr +'.svg'} alt={myTeamGame.away.abbr} className="img-fluid mx-auto d-block" />
                  </div>
                  <AwayScore />
                </div>
                <div id="home" className="col">
                  <div className={'team ' +  myTeamGame.home.abbr.toLowerCase()}>
                    <img src={'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/'+ myTeamGame.home.abbr +'.svg'} alt={myTeamGame.home.abbr} className="img-fluid mx-auto d-block" />
                  </div>
                  <HomeScore />
                </div>
              </div>

              <div id="fullbox" className="fullbox">
                <a href={'https://www.nfl.com/gamecenter/'+ this.state.myTeamGame+'/2018/'+ this.state.week +'/'+ this.state.awayTeam +'@'+ this.state.homeTeam} target="_blank" rel="noopener noreferrer">Full Game Details</a>
              </div>

            </div>
          </div>

          </div>
        </div>
        </div>



      </React.Fragment>
    )
  }
}

export default Game;
