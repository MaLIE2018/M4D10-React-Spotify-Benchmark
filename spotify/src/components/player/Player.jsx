import React, { useEffect, useState } from "react";
import Styles from "./styles";
import {
  IoChevronDownOutline,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoShareSocialOutline,
  IoShuffle,
} from "react-icons/io5";

import {
  H1,
  H3,
  SubTitle,
  Button,
  Info,
  TopNavTitle,
} from "../../styles/styles";

import { useMediaQuery } from "react-responsive";

import { BiPlay, BiHeart, BiPause } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";

import * as FetchModule from "../../modules/retrievedata.js";

import { theme } from "../../index";

import { api } from "../../App";

const { ModalLayer, Image, NowPlayerView, PlayerHeader, ProgressBar } = Styles;

const Player = () => {
  const [artistImg, setArtistImg] = useState("");
  const dispatch = useDispatch();
  const showPlayer = useSelector((state) => state.showPlayer);
  const isMobile = useMediaQuery({ maxWidth: 360 });
  const player = useSelector((state) => state.player);
  const favorites = useSelector((state) => state.favorites);
  const queue = useSelector((state) => state.queue);
  const { track, play, trackProgress } = player;

  const getArtist = async () => {
    if (track?.artist?.id) {
      const artistdata = await FetchModule.retrieveData(
        api + `/artist/${track.artist.id}`
      );
      setArtistImg(artistdata.picture_medium);
    }
  };

  useEffect(() => {
    getArtist();
  }, [track]);

  return (
    <ModalLayer className={`slide-${showPlayer ? "in" : "out"}-bottom`}>
      <div className="player-header">
        <IoChevronDownOutline
          onClick={() => dispatch({ type: "SHOW_PLAYER" })}
          size="2rem"
        />
        <TopNavTitle>{track?.artist?.title}</TopNavTitle>
      </div>
      <div className="img-container">
        <Image src={artistImg} alt="ArtistImage" isMobile={isMobile}></Image>
      </div>
      <PlayerHeader>
        <H1>{track?.title}</H1>
        <H3>{track?.artist?.name}</H3>
      </PlayerHeader>
      <NowPlayerView>
        <div>
          <ProgressBar>
            <progress id="file" value={trackProgress} max="100"></progress>
            <div className="duration">
              <span>
                {track.duration
                  ? (parseFloat(trackProgress) / 60)
                      .toFixed(2)
                      .split(".")
                      .join(":")
                  : "0:00"}
              </span>
              <span>
                {track.duration
                  ? (parseFloat(track.duration) / 60)
                      .toFixed(2)
                      .split(".")
                      .join(":")
                  : "0:00"}
              </span>
            </div>
          </ProgressBar>
        </div>
        <div className="controls">
          {!favorites.some((f) => f?.id === track?.id) ? (
            <BiHeart
              color="#B0B0B0"
              size="2.0rem"
              key={track?.id}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_FAVORITES",
                  payload: track,
                })
              }
            />
          ) : (
            <BsHeartFill
              key={track.id}
              size="2.0rem"
              color={theme.spotifyC}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_FAVORITES",
                  payload: track.id,
                })
              }
            />
          )}
          <IoPlaySkipBackSharp
            size="2.5rem"
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
            <BiPause
              color="#FFFFFF"
              size="5rem"
              onClick={() => {
                dispatch({ type: "PAUSE_TRACK" });
              }}
            />
          ) : (
            <BiPlay
              color="#FFFFFF"
              size="5em"
              onClick={() => dispatch({ type: "PLAY_TRACK" })}
            />
          )}
          <IoPlaySkipForwardSharp
            size="2.5rem"
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
          <IoShuffle size="1.5rem" />
        </div>
        <div className="controls-footer">
          <IoShareSocialOutline size="1.5rem" />
        </div>
      </NowPlayerView>
    </ModalLayer>
  );
};

export default Player;
