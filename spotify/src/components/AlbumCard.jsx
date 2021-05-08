import React, { Component } from "react";
import { Play } from "react-ionicons";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
class AlbumCard extends Component {
  render() {
    return (
      <div className='col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2 d-flex mt-3'>
        <div className='artist-album-card card align-self-stretch'>
          <Nav.Link as={Link} to={`/album/${this.props.album.id}`}>
            {" "}
            <div className='artist-album-img-container'>
              <img
                src={this.props.album.cover}
                className='card-img-top p-3'
                alt='...'
              />
            </div>
          </Nav.Link>
          <div className='card-body d-flex justify-content-center justify-self-end'>
            <Nav.Link
              as={Link}
              to={`/album/${this.props.album.id}`}
              className='artist-album-card-button btn rounded-circle'>
              <Play
                color={"#ffffff"}
                title={"play"}
                height='20px'
                width='20px'
              />
            </Nav.Link>
            <p className='card-text d-flex flex-column justify-content-center'>
              <span className='artist-album-card-albumTitle text-center'>
                {this.props.album.title}
              </span>
              <Nav.Link
                as={Link}
                to={`/artist/${this.props.album.artistid}`}
                className=''>
                <span className='artist-album-card-subTitle text-center'>
                  {this.props.album.name}
                </span>
              </Nav.Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumCard;
