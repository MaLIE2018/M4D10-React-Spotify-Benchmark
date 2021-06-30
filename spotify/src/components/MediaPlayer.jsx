import React, { useState, useEffect, createRef } from "react";
import {
  ShuffleOutline,
  PlaySkipBackOutline,
  PlayCircleOutline,
  PlaySkipForwardOutline,
  RepeatOutline,
  ReorderFourOutline,
  LaptopOutline,
  PauseCircleOutline,
} from "react-ionicons";
import { Link } from "react-router-dom";
import playerPreview from "../assets/img/player-preview.jpg";
import { ProgressBar } from "react-bootstrap";
import VolumeBar from "./VolumeBar";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as FetchModule from "../modules/retrievedata.js";
import { api } from "../App";
import { useMediaQuery } from "react-responsive";

const Styles = styled.footer`
  .player {
    background-color: var(--footer-bg-color);
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 0.8rem;
    visibility: ${(props) => (props.isMobile ? "hidden" : "visible")};
  }

  .player-controls {
    color: var(--sidebar-text-color);
  }

  .player-controls ion-icon[name="play-circle-outline"] {
    font-size: 2em;
  }

  .player-preview-text {
    line-height: 1.2em;
    text-overflow: ellipsis;
    /*truncates the text over 80px overflow with three ...*/
    white-space: nowrap;
    overflow: hidden;
  }
  .container {
    /* height: 10vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #181818;
  }
  .player-controls span {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  .progress-bar {
    background-color: var(--spotify-color);
  }
`;

const MediaPlayer = (props) => {
  const audio = createRef();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const queue = useSelector((state) => state.queue);

  const { track, play, volume, trackProgress } = player;
  const [artistImg, setArtistImg] = useState("");
  const isTablet = useMediaQuery({ maxWidth: 872 });
  const isMobile = useMediaQuery({ maxWidth: 718 });

  const getArtist = async () => {
    if (track?.artist?.id) {
      const artistdata = await FetchModule.retrieveData(
        api + `/artist/${track.artist.id}`
      );
      setArtistImg(artistdata.picture_small);
    }
  };

  useEffect(() => {
    getArtist();
    audio.current.addEventListener("timeupdate", (event) => {
      dispatch({
        type: "SET_TRACK_PROGRESS",
        payload: event.currentTarget.currentTime,
      });
    });
    audio.current.volume = volume;
    // return () => {
    //   audio.current.removeEventListener("ended", () => {});
    //   audio.current.removeEventListener("timeupdate", () => {});
    // };
  }, []);

  const nextTrack = () => {
    const oldTrackIndex = queue.findIndex((e) => e.id === track.id);
    if (queue[oldTrackIndex + 1]) {
      dispatch({
        type: "SET_TRACK",
        payload: queue[oldTrackIndex + 1],
      });
      dispatch({ type: "PLAY_TRACK" });
    } else {
      dispatch({ type: "PAUSE_TRACK" });
    }
  };

  useEffect(() => {
    getArtist();
    if (play) {
      audio.current.play();
      audio.current.addEventListener("ended", () => nextTrack());
    } else {
      audio.current.ended || audio.current.pause();
    }
  }, [play, track]);

  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);

  return (
    <Styles isMobile={isMobile}>
      <div className="player fixed-bottom d-flex justify-content-between">
        <audio ref={audio} src={track?.preview}></audio>
        {/*Start Preview */}

        <div className="d-flex flex-row align-items-center">
          <img
            className="img-fluid mx-3"
            src={artistImg ?? playerPreview}
            alt="playerPreview"
            style={{ maxWidth: "6vh" }}
          />
          <div className="player-preview-text d-flex flex-column">
            <span className="text-white">
              {track?.title_short ?? track?.title}
            </span>
            <span className="text-muted">
              {track?.artist?.name ?? "Horace Silverman"}
            </span>
          </div>
          <ion-icon className="" name="heart-outline" />
          <ion-icon className="player-controls" name="laptop-outline" />
        </div>

        {/* End Preview  */}
        {/* Start Playercontrols */}
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex align-items-center">
            <ShuffleOutline
              color={"#ffffff"}
              title={"shuffle"}
              height="30px"
              width="30px"
            />
            <PlaySkipBackOutline
              color={"#ffffff"}
              title={"PlaySkipBack"}
              height="30px"
              width="30px"
              onClick={() => {
                const oldTrackIndex = queue.findIndex((e) => e.id === track.id);
                try {
                  dispatch({
                    type: "SET_TRACK",
                    payload: queue[oldTrackIndex - 1],
                  });
                  dispatch({ type: "PLAY_TRACK" });
                } catch (error) {
                  console.log(error);
                  dispatch({ type: "PAUSE_TRACK" });
                }
              }}
            />
            {play ? (
              <PauseCircleOutline
                color={"#ffffff"}
                className="songlist-stopbutton"
                title={"pauseOutline"}
                height="25px"
                width="25px"
                onClick={() => {
                  dispatch({ type: "PAUSE_TRACK" });
                }}
              />
            ) : (
              <PlayCircleOutline
                color={"#ffffff"}
                title={"play"}
                height="30px"
                width="30px"
                onClick={() => {
                  dispatch({ type: "PLAY_TRACK" });
                }}
              />
            )}
            <PlaySkipForwardOutline
              color={"#ffffff"}
              title={"forward"}
              height="30px"
              width="30px"
              onClick={() => {
                const oldTrackIndex = queue.findIndex((e) => e.id === track.id);
                try {
                  dispatch({
                    type: "SET_TRACK",
                    payload: queue[oldTrackIndex + 1],
                  });
                  dispatch({ type: "PLAY_TRACK" });
                } catch (error) {
                  console.log(error);
                  dispatch({ type: "PAUSE_TRACK" });
                }
              }}
            />
            <RepeatOutline
              color={"#ffffff"}
              title={"repeat"}
              height="30px"
              width="30px"
            />
          </div>
          <div className="d-flex flex-row align-items-center">
            <span>
              {track.duration
                ? (parseFloat(trackProgress) / 60)
                    .toFixed(2)
                    .split(".")
                    .join(":")
                : "0:00"}
            </span>
            <ProgressBar
              now={trackProgress}
              className="mx-2"
              style={{
                width: `${isTablet ? "100px" : "200px"}`,
                height: "4px",
              }}
            />

            <span>
              {track.duration
                ? (parseFloat(track.duration) / 60)
                    .toFixed(2)
                    .split(".")
                    .join(":")
                : "0:00"}
            </span>
          </div>
        </div>
        {/* End Playercontrols */}
        {/* Start Volume */}
        <div className="d-flex flex-row align-items-center">
          <Link to="/queue" className="mx-2">
            <ReorderFourOutline
              color={"#ffffff"}
              title={"reorder"}
              height="30px"
            />
          </Link>
          <Link to="/">
            {" "}
            <LaptopOutline
              color={"#ffffff"}
              title={"speaker"}
              height="30px"
              width="30px"
            />
          </Link>
          <VolumeBar isTablet={isTablet} />
        </div>
      </div>
      {/* End Volume */}
    </Styles>
  );
};

export default MediaPlayer;
