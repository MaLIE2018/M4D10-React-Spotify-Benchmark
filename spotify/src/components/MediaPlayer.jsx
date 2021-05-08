import React, { Component } from "react";
import {
  ShuffleOutline,
  PlaySkipBackOutline,
  PlayCircleOutline,
  PlaySkipForwardOutline,
  RepeatOutline,
  ReorderFourOutline,
  LaptopOutline,
  VolumeMediumOutline,
  VolumeMuteOutline,
  VolumeLowOutline,
  VolumeHighOutline,
  VolumeOffOutline,
} from "react-ionicons";
import playerPreview from "../assets/img/player-preview.jpg";
import "../css/MediaPlayer.css";

class MediaPlayer extends Component {
  componentDidMount() {
    const slider = document.querySelector(".slider");
    const sliderThumb = document.querySelector(".slider-thumb");
    const track = document.querySelector(".track");
    const trackwidth = track.offsetWidth;
    const trackoffset = document.querySelector(".track-container").offsetLeft;
    const volumeIcon = 29;

    //initial 50 % volume
    slider.style.width = "100px";
    sliderThumb.style.left = "129px";
    VolumeIconAnimation(50);

    track.addEventListener("mousedown", function (e) {
      e = e || window.event;
      e.preventDefault();
      slider.style.width = e.offsetX + "px";
      sliderThumb.style.left = e.offsetX + "px";
      document.onmouseup = closeDragElement;
      track.onmousemove = calculateCurrentSliderProgress;
    });

    function VolumeIconAnimation(value) {
      // Show Icons according to value
      switch (true) {
        case value === 0:
          document.querySelector(".volume-mute").classList.remove("d-none");
          document.querySelector(".volume-low").classList.add("d-none");
          document.querySelector(".volume-medium").classList.add("d-none");
          document.querySelector(".volume-high").classList.add("d-none");
          break;
        case value > 0 && value <= 25:
          document.querySelector(".volume-mute").classList.add("d-none");
          document.querySelector(".volume-low").classList.remove("d-none");
          document.querySelector(".volume-medium").classList.add("d-none");
          document.querySelector(".volume-high").classList.add("d-none");

          break;
        case value > 25 && value <= 75:
          document.querySelector(".volume-mute").classList.add("d-none");
          document.querySelector(".volume-low").classList.add("d-none");
          document.querySelector(".volume-medium").classList.remove("d-none");
          document.querySelector(".volume-high").classList.add("d-none");

          break;
        case value > 75 && value <= 100:
          document.querySelector(".volume-mute").classList.add("d-none");
          document.querySelector(".volume-low").classList.add("d-none");
          document.querySelector(".volume-medium").classList.add("d-none");
          document.querySelector(".volume-high").classList.remove("d-none");
          break;
        default:
          //document.querySelector("ion-icon[name='volume-off-outline']").classList.toggle("d-none")
          break;
      }
    }

    function calculateCurrentSliderProgress(e) {
      e = e || window.event;
      e.preventDefault();
      let value = 0;

      slider.style.width = e.offsetX + "px";
      sliderThumb.style.left = e.offsetX + volumeIcon + "px";

      //calculate the value of the slider
      if (
        slider.style.width.slice(0, slider.style.width.length - 2) >= trackwidth
      ) {
        value = 100;
        sliderThumb.style.left = trackwidth + trackoffset - volumeIcon + "px";
      } else if (
        slider.style.width.slice(0, slider.style.width.length - 2) <= 0
      ) {
        value = 0;
        sliderThumb.style.left = volumeIcon + "px";
      } else {
        value = parseInt(
          (slider.style.width.slice(0, slider.style.width.length - 2) /
            trackwidth) *
            100
        );
      }
      VolumeIconAnimation(value);
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      track.onmouseup = null;
      document.onmousemove = null;
    }

    function mute() {
      sliderThumb.style.left = volumeIcon + "px";
      slider.style.width = 0 + "px";
      VolumeIconAnimation(0);
    }
    [...document.querySelectorAll(".volumeIcon")].map((icon) =>
      icon.addEventListener("click", () => mute())
    );
  }

  render() {
    const track = this.props.data[0];
    return (
      <footer className='player fixed-bottom'>
        <div className='row align-items-center'>
          {/*Start Preview */}
          <div className='col'>
            <div className='d-flex flex-row align-items-center ml-2'>
              <img
                className='img-fluid ml-3'
                src={track?.artist?.picture ?? playerPreview}
                alt='playerPreview'
                style={{ maxWidth: "6vh" }}
              />
              <div className='player-preview-text d-inline-block d-sm-flex flex-column mx-2'>
                <span className='text-white'>
                  {track?.title_short ?? "Song For My Father"}
                </span>
                <span className='text-muted'>
                  {track?.artist?.name ?? "Horace Silverman"}
                </span>
              </div>
            </div>
            <div className='ml-3'>
              <ion-icon
                className='player-controls mx-1 d-none d-sm-none d-md-none d-lg-none d-lg-inline-block'
                name='heart-outline'
              />
              <ion-icon
                className='player-controls mx-1 d-none d-sm-none d-md-none d-lg-none d-lg-inline-block'
                name='laptop-outline'
              />
            </div>
          </div>
          {/* End Preview  */}
          {/* Start Playercontrols */}
          <div className='col d-flex flex-column align-items-center'>
            <div className='row'>
              <div className='player-controls d-flex col mt-2 align-items-center'>
                <ShuffleOutline
                  color={"#ffffff"}
                  title={"shuffle"}
                  height='30px'
                  width='30px'
                />
                <PlaySkipBackOutline
                  color={"#ffffff"}
                  title={"PlaySkipBack"}
                  height='30px'
                  width='30px'
                />
                <PlayCircleOutline
                  color={"#ffffff"}
                  title={"play"}
                  height='30px'
                  width='30px'
                />
                <PlaySkipForwardOutline
                  color={"#ffffff"}
                  title={"forward"}
                  height='30px'
                  width='30px'
                />
                <RepeatOutline
                  color={"#ffffff"}
                  title={"repeat"}
                  height='30px'
                  width='30px'
                />
              </div>
            </div>
            <div className='player-song-progress row'>
              <div className='col d-flex align-items-center'>
                <span className='mx-2'>0:00</span>
                <hr
                  className='player-progress-divider m-0'
                  size={3}
                  color='var(--sidebar-text-color)'
                />
                <span className='mx-2'>7:18</span>
              </div>
            </div>
          </div>
          {/* End Playercontrols */}
          {/* Start Volume */}
          <div className='col player-controls d-none d-sm-none d-md-none d-lg-none d-xl-flex justify-content-end align-items-center '>
            <ReorderFourOutline
              color={"#ffffff"}
              title={"reorder"}
              height='30px'
              width='30px'
            />
            <LaptopOutline
              color={"#ffffff"}
              title={"speaker"}
              height='30px'
              width='30px'
            />
            <div className='track-container position-relative d-flex align-items-center'>
              <VolumeMuteOutline
                color={"#ffffff"}
                title={"play"}
                height='250px'
                width='25px'
                className='volumeIcon volume-mute mr-2'
              />
              <VolumeLowOutline
                color={"#ffffff"}
                title={"play"}
                height='25px'
                width='25px'
                className='volumeIcon volume-low d-none mr-2'
              />
              <VolumeMediumOutline
                color={"#ffffff"}
                title={"play"}
                height='25px'
                width='25px'
                className='volumeIcon volume-medium d-none mr-2'
              />
              <VolumeHighOutline
                color={"#ffffff"}
                title={"play"}
                height='25px'
                width='25px'
                className='volumeIcon volume-high d-none mr-2'
              />
              <VolumeOffOutline
                color={"#ffffff"}
                title={"play"}
                height='25px'
                width='25px'
                className='volumeIcon volume-off d-none mr-2'
              />
              <div className='slider-thumb' />
              <div className='track position-relative'>
                <div className='slider position-absolute'></div>
              </div>
            </div>
          </div>
          {/* End Volume */}
        </div>
      </footer>
    );
  }
}

export default MediaPlayer;
