import React, { Component } from "react";
import * as HelperModule from "../modules/helper.js";
import * as FetchModule from "../modules/retrievedata.js";
import Tracklist from "./Tracklist";

class Search extends Component {
  state = {
    data: {},
    searchText: "",
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText &&
      this.state.searchText.length > 3
    ) {
      console.log("cdu");
      let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${this.state.searchText}`;
      const responseData = await FetchModule.retrieveData(searchUrl);
      this.setState((state) => {
        console.log(responseData);
        return { data: responseData };
      });
      HelperModule.createAlbums(
        HelperModule.uniqueAlbums(responseData.data),
        document.querySelector(".album-row")
      );
    }
  }

  async componentDidMount() {
    let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${"Metallica"}`;
    const responseData = await FetchModule.retrieveData(searchUrl);
    this.setState((state) => {
      return { data: responseData };
    });
    HelperModule.createAlbums(
      HelperModule.uniqueAlbums(responseData.data),
      document.querySelector(".album-row")
    );
  }

  handleSearch = (e) => {
    this.setState((state) => {
      return { searchText: e.target.value };
    }, this.props.history.push(`/search/q=${e.target.value}`));
  };

  render() {
    return (
      <div className='search-section p-0 col-12 col-sm-11 col-md-10'>
        <div className='homepage col py-3 px-5'>
          {/* Navbar */}
          <nav className='navbar navbar-expand-lg navbar-dark col-12'>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
              <div className='navbar-nav d-flex'>
                <form className='form-inline my-2 my-lg-0'>
                  <input
                    className='searchField form-control mr-sm-2 rounded-pill w-100'
                    type='search'
                    placeholder='Artists, songs, or podcasts'
                    aria-label='Search'
                    onChange={(e) => this.handleSearch(e)}
                    value={this.state.searchText}
                  />
                </form>
              </div>
            </div>
          </nav>
          {/* End Navbar */}
          {/* StartSongs */}
          <section>
            <h1 id='h1' className='pt-3'>
              Songs
            </h1>
            <div className='row'>
              <div
                className='search-songlist col w-100 mt-5 overflow-auto'
                style={{ maxHeight: "20vh" }}>
                {this.state.data?.data !== undefined && (
                  <>
                    <Tracklist
                      tracks={HelperModule.getTracks(this.state.data.data)}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
          {/* Start first Songs */}
          {/* Start first Albumrow */}
          <section>
            <h1 id='h1' className='pt-3'>
              Albums
            </h1>
            <div className='album-row row d-flex justify-content-between'></div>
          </section>
          {/* Start Second Albumrow */}
        </div>
      </div>
    );
  }
}

Search.propTypes = {};

export default Search;
