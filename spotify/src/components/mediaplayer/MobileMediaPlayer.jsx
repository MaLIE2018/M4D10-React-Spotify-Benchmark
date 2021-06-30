import React from "react";
import { Link } from "react-router-dom";

import { BiPlay, BiHeart, BiPause } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";

import { theme } from "../../index";
import { NowPlayer, Title, Artist, ProgressBar } from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const MobileMediaPlayer = (props) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const favorites = useSelector((state) => state.favorites);
  const { track, play, trackProgress } = player;
  const isMobile = useMediaQuery({ maxWidth: 718 });
  return (
    <NowPlayer isMobile={isMobile}>
      <ProgressBar id="file" value={trackProgress} max="100" />
      <div>
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
            color={theme.spotifyC}
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_FAVORITES",
                payload: track.id,
              })
            }
          />
        )}
      </div>
      <Link to="/player">
        <div
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "SHOW_PLAYER" });
          }}
        >
          <Title>{track?.title} • </Title>{" "}
          <Artist>{track?.artist?.name}</Artist>
        </div>
      </Link>
      <div>
        {play ? (
          <BiPause
            color="#FFFFFF"
            size="2.5rem"
            onClick={() => {
              dispatch({ type: "PAUSE_TRACK" });
            }}
          />
        ) : (
          <BiPlay
            color="#FFFFFF"
            size="2.5rem"
            onClick={() => dispatch({ type: "PLAY_TRACK" })}
          />
        )}
      </div>
    </NowPlayer>
  );
};

export default MobileMediaPlayer;
