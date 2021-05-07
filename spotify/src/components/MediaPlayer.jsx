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
} from "react-ionicons";
import playerPreview from "../assets/img/player-preview.jpg";
import "../css/MediaPlayer.css";

class MediaPlayer extends Component {
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
            <VolumeMediumOutline
              color={"#ffffff"}
              title={"volume"}
              height='30px'
              width='30px'
            />
            <hr
              className='player-volume-bar m-0 ml-2 mr-4'
              style={{ width: "20%" }}
              size={3}
              color='var(--footer-player-text-color)'
            />
          </div>
          {/* End Volume */}
        </div>
      </footer>
    );
  }
}

export default MediaPlayer;
