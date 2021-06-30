import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { Track, AlbumTitle } from "../playlist/styles";
import { Link } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiHeart, BiUserVoice } from "react-icons/bi";

import { RiRecordCircleLine } from "react-icons/ri";
const { MenuContainer, List } = styles;

const Menu = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.showMenu);
  return (
    <MenuContainer className={`slide-${showMenu ? "in" : "out"}-bottom`}>
      <div className='header'>
        <img
          src='https://via.placeholder.com/64'
          alt=''
          height='64px'
          width='64px'
        />
        <Track>
          <span>Slipping Away</span>
          <AlbumTitle>LEISURE</AlbumTitle>
        </Track>
      </div>
      <List>
        <li>
          <BiHeart size='1.6rem' />
          <Link>Like</Link>
        </li>
        <li>
          <IoShareSocialOutline size='1.6rem' />
          <Link>Share</Link>
        </li>
        <li>
          <BiUserVoice size='1.6rem' />
          <Link>View Artist</Link>
        </li>
        <li>
          <RiRecordCircleLine size='1.6rem' />
          <Link>View Album</Link>
        </li>
      </List>
      <button onClick={() => dispatch({ type: "SHOW_MENU" })}>Cancel</button>
    </MenuContainer>
  );
};

export default Menu;
