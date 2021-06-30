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
    <Col xs={12} sm={11} md={10} className="queue ml-auto">
      <Styles>
        <h1 className=" album-title pt-5 mb-5 ml-5">Liked Songs</h1>
        <Tracklist tracks={favorites} />
      </Styles>
    </Col>
  ) : (
    <Col
      xs={12}
      sm={11}
      md={10}
      className="queue d-flex justify-content-center align-items-center text-white ml-auto"
    >
      <div className="text-center">
        <h1>Favorites are empty</h1>
        <p>Go add some songs already</p>
      </div>
    </Col>
  );
};

export default withRouter(Favs);
