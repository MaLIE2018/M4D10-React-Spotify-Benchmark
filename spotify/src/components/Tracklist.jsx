import React from "react";
import TrackRow from "./TrackRow";
import MobileTrackRow from "./playlist/TrackRow";
import { withRouter } from "react-router-dom";
import "../css/Tracklist.css";

import { useMediaQuery } from "react-responsive";

const Tracklist = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 718 });

  return props.tracks.map((track, index) => {
    if (!isMobile) {
      return (
        <TrackRow
          track={track}
          key={track.id}
          albumId={props.albumId}
          index={index}
        />
      );
    } else {
      return (
        <MobileTrackRow
          track={track}
          key={track.id}
          albumId={props.albumId}
          index={index}
        />
      );
    }
  });
};

export default withRouter(Tracklist);
