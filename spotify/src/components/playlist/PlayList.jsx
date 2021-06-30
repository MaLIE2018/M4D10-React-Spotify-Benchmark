import React, { useEffect, useState } from "react";
import TopNav from "../nav/TopNav";

import TrackRow from "./TrackRow";
import Menu from "../menu/Menu";
import * as FetchModule from "../../modules/retrievedata.js";

import { EntityHeader, StickyHeader, Image, EntityView } from "./styles";
import { H1, SubTitle, Button, Info } from "../../styles/styles";

import { BiPlay, BiPause } from "react-icons/bi";

import { useInView } from "react-intersection-observer";
import { api } from "../../App";
import { useDispatch, useSelector } from "react-redux";

const PlayList = (props) => {
  const [data, setData] = useState({});
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    initialInView: true,
  });
  const albumId = props.match.params.albumId;
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { play } = player;
  const getData = async () => {
    let url = api + `/album/${albumId}`;
    const responseData = await FetchModule.retrieveData(url);
    setData(responseData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Menu />
      <TopNav inView={inView} />
      <StickyHeader>
        <EntityHeader>
          <Image src={data?.cover} alt=""></Image>
          <H1>{data?.artist?.name}</H1>
          <SubTitle>
            Heisse Tracks fuer heisse Tage: Hier ist dein Soundtrack fuer den
            Sommer.
          </SubTitle>
          <Info>
            {data?.release_date?.slice(0, 4)} • {data?.fans} likes • 1H 25 MIN
          </Info>
        </EntityHeader>
      </StickyHeader>
      <EntityView ref={ref}>
        <Button>
          {play ? (
            <BiPause
              color="#FFFFFF"
              size="2.5rem"
              onClick={() => {
                dispatch({ type: "PAUSE_TRACK" });
              }}
            />
          ) : (
            <BiPlay
              color="#FFFFFF"
              size="2.5rem"
              onClick={() => dispatch({ type: "PLAY_TRACK" })}
            />
          )}
        </Button>
        {data.tracks &&
          data.tracks.data.map((track, index) => (
            <TrackRow key={track.id} track={track} index={index} />
          ))}
      </EntityView>
    </>
  );
};

export default PlayList;
