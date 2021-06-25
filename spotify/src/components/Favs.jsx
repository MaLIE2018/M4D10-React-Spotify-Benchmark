import React from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Tracklist from "./Tracklist";

import styled from "styled-components";

const Styles = styled.div`
  padding: 0;
  padding-bottom: 10vh;
  margin: -15px -15px;
  min-height: 100vh;
  h1 {
    color: var(--login-bg-color);
  }
`;

const Favs = (props) => {
  const favorites = useSelector((state) => state.favorites);

  return favorites.length > 0 ? (
    <Col className="queue">
      <Styles>
        <h1 className=" album-title pt-5 mb-5 ml-5">Liked Songs</h1>
        <Tracklist tracks={favorites} />
      </Styles>
    </Col>
  ) : (
    <Col className="queue d-flex justify-content-center align-items-center text-white">
      <div className="text-center">
        <h1>Favorites are empty</h1>
        <p>Go add some songs already</p>
      </div>
    </Col>
  );
};

export default withRouter(Favs);
