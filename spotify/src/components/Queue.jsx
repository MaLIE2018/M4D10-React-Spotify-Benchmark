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
`;

const Queue = (props) => {
  const queue = useSelector((state) => state.queue);

  return queue.length > 0 ? (
    <Col className="queue py-5 mb-5">
      <Styles>
        <h1 className=" album-title pt-5 mb-5 ml-5">Queue</h1>
        <Tracklist tracks={queue} />
      </Styles>
    </Col>
  ) : (
    <Col className="queue d-flex justify-content-center align-items-center text-white">
      <div className="text-center">
        <h1>Queue is empty!</h1>
        <p>Go add some songs already</p>
      </div>
    </Col>
  );
};

export default withRouter(Queue);
