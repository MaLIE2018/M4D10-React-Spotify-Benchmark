import React, { Component } from "react";
import PropTypes from "prop-types";
import { EllipsisHorizontalOutline } from "react-ionicons";
import * as HelperModule from "../modules/helper.js";
import * as FetchModule from "../modules/retrievedata.js";
import AlbumCard from "../components/AlbumCard";
import "../css/Artist.css";
class Artist extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const artistId = this.props.match.params.artistId;
    let url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/top?limit=50`;
    const data = await FetchModule.retrieveData(url);
    const artistdata = await FetchModule.retrieveData(
      `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`
    );
    this.fillArtistDetails(artistdata);
    this.setState((state) => {
      return { data: HelperModule.uniqueAlbums(data.data) };
    });
  }

  fillArtistDetails = (artistdata) => {
    document.querySelector(
      ".artist-header"
    ).style.backgroundImage = `url(${artistdata.picture_xl})`;
    document.querySelector(".artistpage-artist-title").innerHTML =
      artistdata.name;
    document.querySelector(".fancount").innerHTML = artistdata.nb_fan;
  };

  render() {
    return (
      <div className='artist-section p-0 col-12 col-sm-11 col-md-10'>
        <div className='artist-section-container'>
          <div className='artist-header position-relative d-flex justify-content-center pt-3 pt-sm-5'>
            <div className='row position-relative d-flex flex-column align-items-center flex-grow-1 m-0'>
              <h5>
                <span className='fancount d-flex justify-content-center'></span>
              </h5>
              <h1 className='artistpage-artist-title d-flex justify-content-center'></h1>
              <div className='col artist-header-button-row d-flex justify-content-center mt-3'>
                <button className='button artist-playButton btn rounded-pill mx-2 w-25'>
                  Play
                </button>
                <button className='btn button artist-followButton rounded-pill mx-2 w-25'>
                  Follow
                </button>
                <button
                  className='btn artist-menuButton'
                  style={{ color: "var(--sidebar-bg-text-color)" }}>
                  <EllipsisHorizontalOutline
                    color={"#c0c0c0"}
                    title={"menu"}
                    height='25px'
                    width='25px'
                  />
                </button>
              </div>
              {/* navbar */}
              <div className='col d-flex justify-content-center'>
                <nav className='artist-nav navbar mt-5 mb-3'>
                  <ul className='navbar-nav d-flex flex-row'>
                    <li className='nav-item mx-3 my-1 my-sm-0'>OVERVIEW</li>
                    <li className='nav-item mx-3 my-1 my-sm-0'>
                      RELATED ARTISTS
                    </li>
                    <li className='nav-item mx-3 my-1 my-sm-0'>ABOUT</li>
                  </ul>
                </nav>
              </div>
              {/* navbar end */}
            </div>
          </div>
          {/* End Header */}
          {/* Section Albums */}
          <section className='artist-albums p-3 mt-3 mb-3 position-relative'>
            {/* <div class="pt-5 position-absolute bg-secondary w-100" style="top:20px;height:30px"></div> */}
            <h3>Discography</h3>
            <div className='row d-flex mt-4 pb-4 justify-content-between'>
              {this.state.data?.map((album) => {
                return <AlbumCard album={album} key={album.id} />;
              })}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Artist.propTypes = {};

export default Artist;
