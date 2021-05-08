import React, { Component } from "react";
import "../css/HomePage.css";
import * as HelperModule from "../modules/helper.js";
import * as FetchModule from "../modules/retrievedata.js";
import AlbumCard from "../components/AlbumCard";
class Home extends Component {
  state = {
    data: [],
  };

  componentDidMount = async () => {
    let url =
      "https://deezerdevs-deezer.p.rapidapi.com/artist/412/top?limit=50";
    const data = await FetchModule.retrieveData(url);
    this.setState((state) => {
      return { data: HelperModule.uniqueAlbums(data.data) };
    });
    // HelperModule.createAlbums(
    //   HelperModule.uniqueAlbums(data.data),
    //   document.querySelector(".album-row")
    // );
  };
  render() {
    return (
      <div className='p-0 col-12 col-sm-11 col-md-10'>
        <div className='homepage col py-3 px-5'>
          <nav className='navbar navbar-expand-lg navbar-dark col-12'>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
              <div className='navbar-nav mx-auto'>
                <a
                  className='nav-link active mx-3 position-relative'
                  href='#'
                  id='trending'>
                  TRENDING<span className='sr-only'>(current)</span>
                </a>
                <a className='nav-link mx-3 position-relative' href='#'>
                  PODCAST
                </a>
                <a className='nav-link mx-3 position-relative' href='#'>
                  MOOD AND GENRES
                </a>
                <a
                  className='nav-link mx-3 position-relative'
                  href='#'
                  tabIndex={-1}
                  aria-disabled='true'>
                  NEW RELEASES
                </a>
                <a
                  className='nav-link mx-3 position-relative'
                  href='#'
                  tabIndex={-1}
                  aria-disabled='true'>
                  DISCOVER
                </a>
              </div>
            </div>
          </nav>
          {/* StartSongs */}
          {/* Start first Songs */}
          {/* Start first Albumrow */}
          <section>
            <h1 id='h1' className='pt-3'>
              #THROWBACKTHURSDAY
            </h1>
            <div className='album-row row d-flex justify-content-between'>
              {this.state.data.map((album) => {
                return <AlbumCard album={album} key={album.id} />;
              })}
            </div>
          </section>
          {/* Start Second Albumrow */}
        </div>
      </div>
    );
  }
}

export default Home;
