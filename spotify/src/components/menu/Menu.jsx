import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { Track, AlbumTitle } from "../playlist/styles";
import { Link } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiHeart, BiUserVoice } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { theme } from "../../index";
import { RiRecordCircleLine } from "react-icons/ri";
import * as FetchModule from "../../modules/retrievedata.js";
import { api } from "../../App";
const { MenuContainer, List } = styles;

const Menu = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.showMenu.showMenu);
  const selectedTrack = useSelector((state) => state.showMenu.selectedTrack);
  const favorites = useSelector((state) => state.favorites);
  const [artistImg, setArtistImg] = useState("");
  const getArtist = async () => {
    if (selectedTrack?.artist?.id) {
      const artistdata = await FetchModule.retrieveData(
        api + `/artist/${selectedTrack.artist.id}`
      );
      setArtistImg(artistdata.picture_medium);
    }
  };

  useEffect(() => {
    getArtist();
  }, [selectedTrack]);

  return (
    <MenuContainer className={`slide-${showMenu ? "in" : "out"}-bottom`}>
      <div className="header">
        <img src={artistImg} alt="ArtistImage" height="64px" width="64px" />
        <Track>
          <span>{selectedTrack?.title}</span>
          <AlbumTitle>{selectedTrack?.artist?.name}</AlbumTitle>
        </Track>
      </div>
      <List>
        <Link>
          <li>
            {!favorites.some((f) => f?.id === selectedTrack?.id) ? (
              <BiHeart
                color="#B0B0B0"
                size="1.9rem"
                key={selectedTrack?.id}
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_FAVORITES",
                    payload: selectedTrack,
                  })
                }
              />
            ) : (
              <BsHeartFill
                key={selectedTrack?.id}
                size="1.9rem"
                color={theme.spotifyC}
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_FAVORITES",
                    payload: selectedTrack.id,
                  })
                }
              />
            )}
            <span> Like</span>{" "}
          </li>
        </Link>
        <Link>
          <li>
            <IoShareSocialOutline size="1.6rem" />
            <span> Share</span>{" "}
          </li>
        </Link>
        <Link
          to={`/artist/${selectedTrack?.artist?.id}`}
          onClick={() => dispatch({ type: "SHOW_MENU" })}
        >
          <li>
            <BiUserVoice size="1.6rem" />
            <span> View Artist</span>
          </li>
        </Link>
        {selectedTrack?.albumId && (
          <Link
            to={`/album/${selectedTrack?.albumId}`}
            onClick={() => dispatch({ type: "SHOW_MENU" })}
          >
            <li>
              <RiRecordCircleLine size="1.6rem" />
              <span> View Album</span>{" "}
            </li>
          </Link>
        )}
      </List>
      <button onClick={() => dispatch({ type: "SHOW_MENU" })}>Cancel</button>
    </MenuContainer>
  );
};

export default Menu;
