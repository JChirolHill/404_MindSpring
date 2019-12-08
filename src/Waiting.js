import React from "react";
import DocumentTitle from "react-document-title";
import { Redirect } from "react-router-dom";
import "./Loader.css";
import { getNumPlayers, getNumPlayersDone } from "./APIFetcher";
import PlayerLeaves from "./PlayerLeaves";

export default class Waiting extends React.Component {
  constructor(props) {
    super(props);
    this.interval = undefined;
    this.state = {
      numMaxLoads: 60,
      code: props.code,
      currPlayers: 1,
      totalPlayers: props.numPlayers,
      numQs: props.numQs,
      redirectGame: false,
      redirectResults: false,
      setup: props.setup
    };
  }

  componentDidMount() {
    this.checkNumPlayers();
    this.interval = setInterval(this.checkNumPlayers, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkNumPlayers = () => {
    if (this.state.setup) {
      getNumPlayers(this.state.code).then(response => {
        this.setState({
          currPlayers: response.curr_num_players,
          totalPlayers: response.total_players
        });

        if (this.state.currPlayers === this.state.totalPlayers) {
          setTimeout(() => {
            this.setState({
              redirectGame: true
            });
          }, 500);
        }
      });
    } else {
      getNumPlayersDone(this.state.code).then(response => {
        this.setState({
          currPlayers: response.curr_num_players_done,
          totalPlayers: response.total_players
        });

        if (this.state.currPlayers === this.state.totalPlayers) {
          setTimeout(() => {
            this.setState({
              redirectResults: true
            });
          }, 500);
        }
      });
    }
  };

  render() {
    return (
      <DocumentTitle title="MindSpring | Prepping">
        <div>
          {this.state.redirectGame && (
            <Redirect to={`/multiplayer/play/${this.state.code}`} />
          )}
          {this.state.redirectResults && (
            <Redirect to={`/multiplayer/results/${this.state.code}`} />
          )}

          <h2 className="text-center mt-5">
            {this.state.setup
              ? "Waiting for Players to Join"
              : "Waiting for Players to Finish"}
          </h2>

          {this.state.setup && (
            <div className="text-center">
              <div>Your Group Code:</div>
              <div id="group_code">{this.state.code}</div>
            </div>
          )}

          <div className="loader">Loading...</div>
          <div className="text-center">
            <PlayerLeaves
              value={this.state.currPlayers}
              size="2x"
              clickable={false}
              leafCount={this.state.totalPlayers}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
