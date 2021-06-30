import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TopHeader } from "./styles";
import { theme } from "../../index";
import { Button, TopNavTitle } from "../../styles/styles";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

const TopNav = (props) => {
  const { inView } = props;
  const player = useSelector((state) => state.player);

  const { track } = player;
  return (
    <TopHeader inView={inView}>
      <AiOutlineArrowLeft
        color={theme.sc}
        size={theme.NavIconSize}
        onClick={() => props.history.goBack()}
      />
      {!inView ? (
        <Button>FOLLOW</Button>
      ) : (
        <TopNavTitle>{track?.artist?.name}</TopNavTitle>
      )}
      <BsThreeDotsVertical color={theme.sc} size={theme.NavIconSize} />
    </TopHeader>
  );
};

export default withRouter(TopNav);
