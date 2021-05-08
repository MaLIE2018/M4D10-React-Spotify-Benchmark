import React, { Component } from "react";
import { Heart } from "react-ionicons";

import * as FetchModule from "../modules/retrievedata.js";
import "../css/Album.css";
import Tracklist from "./Tracklist";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
class Album extends Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const albumId = this.props.match.params.albumId;
    let url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;
    const responseData = await FetchModule.retrieveData(url);
    console.log("beforeStatefunction");
    this.setState((state) => {
      return { data: responseData };
    }, this.fillArtist(responseData));
  }

  fillArtist = (album) => {
    let tracks = album.tracks.data;
    document.querySelector(".album-title").innerHTML = album.title;
    document.querySelector(".artist").innerHTML = tracks[0].artist.name;
    document.querySelector(".artist").parentElement.id = tracks[0].artist.id;
    document.querySelector(".trackcount").innerHTML = album.nb_tracks;
    document.querySelector(".albumyear").innerHTML = album.release_date.split(
      "-"
    )[0];
    document.querySelector(".album-img").src = album.cover;
  };

  render() {
    return (
      <div className='album-section p-0 col-12 col-sm-11 col-md-10'>
        <div className='albumsongs-section row pb-3'>
          <div className='col-12 col-sm-4 d-flex flex-column align-items-center mt-5'>
            <img className='album-img' src alt='albumcover' />
            <h1 className='album-title text-center mt-2'>tt</h1>
            <Nav.Link
              as={Link}
              className='album-songrow-artistpagelink'
              to={`/artist/${this.data?.tracks?.data[0]?.artist.id}`}>
              <h6 className='artist'>fff</h6>
            </Nav.Link>
            <button className='button artist-playButton btn rounded-pill my-3 mt-3 w-50'>
              PLAY
            </button>
            <div className='Year'>
              <p>
                <span className='albumyear'>dd</span> •{" "}
                <span className='trackcount'>ddd</span>
                Songs
              </p>
            </div>
            <div className='album-icons mt-4 d-flex align-items-center position-relative'>
              <Heart
                color={"#c0c0c0"}
                title={"heart"}
                height='40px'
                width='40px'
              />
              <div className='dots'>
                <div className='dot' />
              </div>
            </div>
          </div>
          <div className='albumpage-songlist col-12 col-sm-8 mt-5'>
            {this.state.data?.tracks !== undefined && (
              <>
                <Tracklist tracks={this.state.data.tracks.data} />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
