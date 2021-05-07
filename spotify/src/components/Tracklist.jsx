import React, { Component } from "react";
import TrackRow from "./TrackRow";
import { withRouter } from "react-router-dom";
import "../css/Tracklist.css";

class Tracklist extends Component {
  state = {
    currTrackId: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currTrackId !== this.state.currTrackId) {
      this.props.history.push(
        this.props.match.url + "/" + this.state.currTrackId
      );
    }
  }

  handleClick = (id) => {
    this.setState((state) => {
      return { currTrackId: id };
    });
  };

  render() {
    return this.props.tracks.map((track) => {
      return (
        <>
          <TrackRow
            track={track}
            key={track.id}
            onCLickHandler={this.handleClick}
          />
        </>
      );
    });
  }
}

export default withRouter(Tracklist);
