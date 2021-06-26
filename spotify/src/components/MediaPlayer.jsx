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

const Styles = styled.footer`
  .player {
    max-height: 10vh;
    background-color: var(--footer-bg-color);
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

  .player .player-progress-divider {
    height: 2px;
    background-color: #404040;
  }

  .player .player-song-progress span {
    font-size: 0.7rem;
    color: var(--footer-player-text-color);
  }

  .player .player-volume-bar {
    height: 2px;
    background-color: var(--footer-player-text-color);
  }

  .container {
    height: 10vh;
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
  const [currentTrackProgress, setProgress] = useState(0);
  const { track, play, volume } = player;
  const [artistImg, setArtistImg] = useState("");

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
      setProgress(event.currentTarget.currentTime);
    });
    audio.current.volume = volume;
    return () => {
      audio.current.removeEventListener("ended", () => {});
      audio.current.removeEventListener("timeupdate", () => {});
    };
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
    <Styles>
      <div className="player fixed-bottom">
        <audio ref={audio} src={track?.preview}></audio>
        <div className="row align-items-center">
          {/*Start Preview */}
          <div className="col">
            <div className="d-flex flex-row align-items-center ml-2">
              <img
                className="img-fluid ml-3"
                src={artistImg ?? playerPreview}
                alt="playerPreview"
                style={{ maxWidth: "6vh" }}
              />
              <div className="player-preview-text d-inline-block d-sm-flex flex-column mx-2">
                <span className="text-white">
                  {track?.title_short ?? track?.title}
                </span>
                <span className="text-muted">
                  {track?.artist?.name ?? "Horace Silverman"}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <ion-icon
                className="player-controls mx-1 d-none d-sm-none d-md-none d-lg-none d-lg-inline-block"
                name="heart-outline"
              />
              <ion-icon
                className="player-controls mx-1 d-none d-sm-none d-md-none d-lg-none d-lg-inline-block"
                name="laptop-outline"
              />
            </div>
          </div>
          {/* End Preview  */}
          {/* Start Playercontrols */}
          <div className="col d-flex flex-column align-items-center">
            <div className="row">
              <div className="player-controls d-flex col mt-2 align-items-center">
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
                    const oldTrackIndex = queue.findIndex(
                      (e) => e.id === track.id
                    );
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
                    const oldTrackIndex = queue.findIndex(
                      (e) => e.id === track.id
                    );
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
            </div>
            <div className="player-song-progress row">
              <div className="col d-flex align-items-center">
                <span className="mx-2">
                  {(parseFloat(currentTrackProgress) / 60)
                    .toFixed(2)
                    .split(".")
                    .join(":")}
                </span>
                <ProgressBar
                  now={currentTrackProgress}
                  style={{ width: "200px", height: "4px" }}
                />
                <span className="mx-2">
                  {track.duration
                    ? (parseFloat(track.duration) / 60)
                        .toFixed(2)
                        .split(".")
                        .join(":")
                    : "0:00"}
                </span>
              </div>
            </div>
          </div>
          {/* End Playercontrols */}
          {/* Start Volume */}
          <div className="col player-controls d-none d-sm-none d-md-none d-lg-none d-xl-flex justify-content-end align-items-center ">
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
            <VolumeBar />
          </div>
          {/* End Volume */}
        </div>
      </div>
    </Styles>
  );
};

export default MediaPlayer;
