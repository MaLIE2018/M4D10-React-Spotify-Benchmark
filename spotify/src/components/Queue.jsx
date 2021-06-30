import React from "react";
import { Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Tracklist from "./Tracklist";
import styled from "styled-components";

const Styles = styled.div`
  h1 {
    color: var(--login-bg-color);
  }
  min-height: 100vh;
`;

const Queue = (props) => {
  const queue = useSelector((state) => state.queue);

  return queue.length > 0 ? (
    <Col xs={12} sm={11} md={10} className="queue py-5 mb-5 ml-auto">
      <Styles>
        <h1 className=" album-title pt-5 mb-5 ml-5">Queue</h1>
        <Tracklist tracks={queue} />
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
        <h1>Queue is empty!</h1>
        <p>Go add some songs already</p>
      </div>
    </Col>
  );
};

export default withRouter(Queue);
