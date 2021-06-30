import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../index";
import { TrackRowContainer, Track, AlbumTitle, TrackNumber } from "./styles";

const TrackRow = (props) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const { play } = player;
  const { track, index } = props;
  return (
    <TrackRowContainer>
      <TrackNumber>{index + 1}</TrackNumber>
      <Track
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "SET_TRACK", payload: track });
          dispatch({ type: "PLAY_TRACK" });
        }}
      >
        <span
          style={{
            color: `${
              play && track.id === player.track.id ? theme.spotifyC : "inherit"
            }`,
          }}
        >
          {track?.title}
        </span>
        <AlbumTitle>{track?.artist?.name}</AlbumTitle>
      </Track>
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "SHOW_MENU" });
        }}
      >
        <BsThreeDotsVertical color={theme.sc} size={theme.NavIconSize} />
      </div>
    </TrackRowContainer>
  );
};

export default TrackRow;
