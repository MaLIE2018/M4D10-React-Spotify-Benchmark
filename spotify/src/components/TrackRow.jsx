import React from "react";
import { MusicalNote, PlayOutline, PauseOutline } from "react-ionicons";
import * as HelperModule from "../modules/helper.js";
import { Link } from "react-router-dom";
import { Nav, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useSelector, useDispatch, connect } from "react-redux";
import { addToQueue } from "../redux/actions/index.js";

const TrackRow = (props) => {
  const pause = useSelector((state) => state.player.pause);
  const playing = useSelector((state) => state.player.play);
  const currentSongId = useSelector((state) => state.player.track.id);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="album-songrow row flex-nowrap mx-1 my-1">
      <div className="col-1 text-white d-inline-block d-md-flex justify-content-start justify-content-md-end">
        <MusicalNote
          color={"#c0c0c0"}
          title={"musicnote"}
          height="25px"
          width="25px"
        />
      </div>
      <div className="col-1 text-white d-inline-block d-md-flex">
        {!pause && currentSongId === props.track.id ? (
          <PauseOutline
            color={"#c0c0c0"}
            className="songlist-stopbutton"
            title={"pauseOutline"}
            height="25px"
            width="25px"
            onClick={() => {
              props.addQueue(props.track.trackListURL ?? props.track.albumId);
              props.setCurrentSong(props.track);
              props.pause();
            }}
          />
        ) : (
          <PlayOutline
            color={"#c0c0c0"}
            className="songlist-playbutton"
            title={"Play"}
            height="25px"
            width="25px"
            onClick={() => {
              props.addQueue(props.track.trackListURL ?? props.track.albumId);
              props.setCurrentSong(props.track);
              props.play();
            }}
          />
        )}
      </div>

      <div className="col-8 text-white d-flex flex-column">
        <span className="album-songname">{props.track.title}</span>
        <Nav.Link
          as={Link}
          className="album-songrow-artistpagelink"
          to={`/artist/${props.track.artist.id}`}
        >
          <span className="album-artist">{props.track.artist.name}</span>
        </Nav.Link>
      </div>
      <Col md={1} className="d-flex justify-content-center align-items-center">
        {!favorites.some((f) => f?.id === props.track.id) ? (
          <Icon.Heart
            key={props.track.id}
            color="var(--footer-player-text-color)"
            onClick={() =>
              dispatch({
                type: "ADD_TO_FAVORITES",
                payload: props.track,
              })
            }
          />
        ) : (
          <Icon.HeartFill
            key={props.track.id}
            color="var(--spotify-color)"
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_FAVORITES",
                payload: props.track.id,
              })
            }
          />
        )}
      </Col>
      <div className="col-1 d-flex justify-content-center align-items-center">
        <span className="album-songname">
          {(parseFloat(props.track.duration) / 60)
            .toFixed(2)
            .split(".")
            .join(":")}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  queue: state.queue,
});

const mapDispatchToProps = (dispatch) => ({
  addQueue: (trackListURL) => dispatch(addToQueue(trackListURL)),
  setCurrentSong: (track) => dispatch({ type: "SET_TRACK", payload: track }),
  play: () => dispatch({ type: "PLAY_TRACK" }),
  pause: () => dispatch({ type: "PAUSE_TRACK" }),
  stop: () => dispatch({ type: "STOP_TRACK" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackRow);
