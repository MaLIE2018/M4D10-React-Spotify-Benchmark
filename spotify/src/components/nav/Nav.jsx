import React from "react";
import { BiHome, BiBookOpen, BiSearch } from "react-icons/bi";
import { RiSpotifyFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { List, Header } from "./styles";
import { theme } from "../../index";
const Nav = () => {
  return (
    <Header>
      <List>
        <Link to="/home">
          <li>
            <BiHome size={theme.NavIconSize} />
            Home
          </li>
        </Link>
        <Link to="/search">
          <li>
            <BiSearch size={theme.NavIconSize} />
            Search
          </li>
        </Link>
        <Link to="/favorites">
          <li>
            <BiBookOpen size={theme.NavIconSize} />
            Your library
          </li>
        </Link>
        <li>
          <RiSpotifyFill size={theme.NavIconSize} />
          Get App
        </li>
      </List>
    </Header>
  );
};

export default Nav;
