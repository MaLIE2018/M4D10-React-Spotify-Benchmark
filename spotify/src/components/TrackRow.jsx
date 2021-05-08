import React, { Component } from "react";
import { MusicalNote, PlayOutline, PauseOutline } from "react-ionicons";
import * as HelperModule from "../modules/helper.js";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
class TrackRow extends Component {
  handleClick = (e) => {
    this.props.onCLickHandler(this.props.track.id);
    HelperModule.playMusic(e, this.props.track.preview);
  };

  render() {
    return (
      <div className='album-songrow row flex-nowrap mx-1 my-1'>
        <div className='col-1 text-white d-inline-block d-md-flex justify-content-start justify-content-md-end'>
          <MusicalNote
            color={"#c0c0c0"}
            title={"musicnote"}
            height='25px'
            width='25px'
          />
        </div>
        <div className='col-1 text-white d-inline-block d-md-flex'>
          <button
            className='btn btn-outline-light rounded-circle songlist-playbutton'
            onClick={(e) => this.handleClick(e)}>
            <PauseOutline
              color={"#c0c0c0"}
              className='songlist-stopbutton d-none'
              title={"pauseOutline"}
              height='25px'
              width='25px'
            />
            <PlayOutline
              color={"#c0c0c0"}
              className='songlist-playbutton'
              title={"Play"}
              height='25px'
              width='25px'
            />
          </button>
        </div>
        <div className='col-9 text-white d-flex flex-column'>
          <span className='album-songname'>{this.props.track.title}</span>
          <Nav.Link
            as={Link}
            className='album-songrow-artistpagelink'
            to={`/artist/${this.props.track.artist.id}`}>
            <span className='album-artist'>{this.props.track.artist.name}</span>
          </Nav.Link>
        </div>
        <div className='col-1'>
          <span className='album-songname'>
            {(parseFloat(this.props.track.duration) / 60)
              .toFixed(2)
              .split(".")
              .join(":")}
          </span>
        </div>
      </div>
    );
  }
}

export default TrackRow;
