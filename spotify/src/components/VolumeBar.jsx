import React, { useEffect, createRef, useState } from "react";
import {
  VolumeMediumOutline,
  VolumeMuteOutline,
  VolumeLowOutline,
  VolumeHighOutline,
  VolumeOffOutline,
} from "react-ionicons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .progress-bar {
    background-color: var(--spotify-color);
  }

  .track-container {
    position: relative;
  }

  .track-container .slider {
    height: 10px;
    width: 0px;
    background-color: #f5f5f5;
    left: 0;
    z-index: 1;
  }

  .track-container:hover .slider-thumb {
    visibility: visible;
  }

  .track-container:hover .slider {
    background-color: #1db954;
  }

  .slider-thumb {
    position: absolute;
    visibility: hidden;
    /* slider  left */
    left: 29px;
    transform: translateY(-50%);
    top: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* background-color: #FFFFFF; */
    background-color: white;
    z-index: 5;
  }
`;

const VolumeBar = (props) => {
  const dispatch = useDispatch();
  const track = createRef();
  const sliderThumb = createRef();
  // const trackContainer = createRef();
  const volume = useSelector((state) => state.player.volume);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // function closeDragElement() {
  //   stop moving when mouse button is released:
  //   track.current.onmouseup = null;
  //   document.onmousemove = null;
  // }

  function mute() {
    dispatch({ type: "SET_VOLUME", payload: 0 });
    sliderThumb.current.style.left = 0 + "px";
  }

  useEffect(() => {
    track.current.addEventListener("mousedown", (e) => {
      setCoords({ x: e.offsetX, y: e.offsetY });
    });
    const trackElement = track.current;
    return (track) => {
      trackElement.removeEventListener("mousedown", () => {});
    };
  }, []);

  useEffect(() => {
    if (!(coords.x === 0 && coords.y === 0)) {
      dispatch({
        type: "SET_VOLUME",
        payload:
          coords.x /
          track.current.style.width.slice(
            0,
            track.current.style.width.length - 2
          ),
      });
      sliderThumb.current.style.left = coords.x + "px";
    }
  }, [coords]);

  return (
    <Styles>
      {volume * 100 === 0 ? (
        <VolumeMuteOutline
          color={"#ffffff"}
          title={"play"}
          height="25px"
          width="25px"
          onClick={() => mute()}
          className="volumeIcon mr-2"
        />
      ) : volume * 100 > 0 && volume * 100 <= 25 ? (
        <VolumeLowOutline
          color={"#ffffff"}
          title={"play"}
          height="25px"
          width="25px"
          onClick={() => mute()}
          className="volumeIcon mr-2"
        />
      ) : volume * 100 > 25 && volume * 100 <= 75 ? (
        <VolumeMediumOutline
          color={"#ffffff"}
          title={"play"}
          height="25px"
          width="25px"
          onClick={() => mute()}
          className="volumeIcon mr-2"
        />
      ) : (
        <VolumeHighOutline
          color={"#ffffff"}
          title={"play"}
          height="25px"
          width="25px"
          onClick={() => mute()}
          className="volumeIcon mr-2"
        />
      )}
      <div className="track-container">
        <ProgressBar
          ref={track}
          now={volume * 100}
          style={{
            width: `${props.isTablet ? "100px" : "200px"}`,
            height: "4px",
          }}
          className="mx-2"
        />
        <div ref={sliderThumb} className="slider-thumb"></div>
      </div>
    </Styles>
  );
};

export default VolumeBar;
