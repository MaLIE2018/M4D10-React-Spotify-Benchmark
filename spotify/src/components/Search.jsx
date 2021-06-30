import React, { Component } from "react";
import * as HelperModule from "../modules/helper.js";
import * as FetchModule from "../modules/retrievedata.js";
import Tracklist from "./Tracklist";
import AlbumCard from "../components/AlbumCard";
import { api } from "../App";

class Search extends Component {
  state = {
    data: {},
    searchText: "",
    uniqueAlbums: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText &&
      this.state.searchText.length > 3
    ) {
      let searchUrl = api + `/search?q=${this.state.searchText}`;
      const responseData = await FetchModule.retrieveData(searchUrl);
      this.setState((state) => {
        return {
          uniqueAlbums: HelperModule.uniqueAlbums(responseData.data),
          data: responseData,
        };
      });
    }
  }

  async componentDidMount() {
    let searchUrl = api + `/search?q=${"Metallica"}`;
    const responseData = await FetchModule.retrieveData(searchUrl);
    this.setState((state) => {
      return {
        data: responseData,
        uniqueAlbums: HelperModule.uniqueAlbums(responseData.data),
      };
    });
  }

  handleSearch = (e) => {
    this.setState((state) => {
      return { searchText: e.target.value };
    }, this.props.history.push(`/search/q=${e.target.value}`));
  };

  render() {
    return (
      <div className="search-section p-0 col-12 col-sm-11 col-md-10 ml-auto">
        <div className="homepage col py-3 px-sm-5 px-3">
          {/* Navbar */}
          <div className="d-flex">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="searchField form-control mr-sm-2 rounded-pill w-100"
                type="search"
                placeholder="Artists, songs, or podcasts"
                aria-label="Search"
                onChange={(e) => this.handleSearch(e)}
                value={this.state.searchText}
              />
            </form>
          </div>

          {/* End Navbar */}
          {/* StartSongs */}
          <section>
            <h1 id="h1" className="pt-3">
              Songs
            </h1>
            <div className="row">
              <div
                className="search-songlist col w-100 mt-5 overflow-auto"
                style={{ maxHeight: "20vh" }}
              >
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
            <h1 id="h1" className="pt-3">
              Albums
            </h1>
            <div className="row d-flex justify-content-sm-between justify-content-center">
              {this.state.uniqueAlbums?.map((album) => {
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

export default Search;
