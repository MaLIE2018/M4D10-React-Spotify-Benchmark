import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import {Container,Row} from "react-bootstrap"
import NavBar from "./components/NavBar.jsx"
import MediaPlayer from './components/MediaPlayer'
import {Route, withRouter, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Album from "./components/Album"
import PlayList from "./components/playlist/PlayList.jsx"
import Artist from "./components/Artist"
import Search from "./components/Search"
import Queue from "./components/Queue"
import Nav from "./components/nav/Nav.jsx"
import MobileMediaPlayer from "./components/mediaplayer/MobileMediaPlayer.jsx"
import {useState, useEffect} from "react"
import Favs from './components/Favs';
import {useSelector} from "react-redux"
import { useMediaQuery } from 'react-responsive';
import Player from "../src/components/player/Player";
export const api = "https://striveschool-api.herokuapp.com/api/deezer"

function App(props) {
  const [currPath, setPath] = useState("")
  const [currTrack,setTrack] = useState({})
  const {queue, favorites} = useSelector((state) => state)
  const isMobile = useMediaQuery({ maxWidth: 718 })

  useEffect(() => {
    setPath(() => {
      return props.location.pathname},fetchData(props.location.pathname))
  },[props])

  useEffect(() => {
      localStorage.setItem("queue", JSON.stringify(queue))
      localStorage.setItem("favorites", JSON.stringify(favorites))
  },[queue, favorites])

  const fetchData = async (currPath) => {
    if(currPath.split("/")[3] ){try {
      let response = await fetch(
        api + "/track/"+ currPath.split("/")[3] , {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e88938dcfcmsh276f73df3fb1e5ep1a09e1jsn71c6fe23b716',
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            },
        }
    );
      if (response.ok) {
        let data = await response.json();
        setTrack([data]);
      }
    } catch (error) {
     console.log(error)
    }}
  };


  return (

    <Router>
      <Player />
     { !isMobile?<NavBar />:<Nav/>}
      <Container fluid>
        <MediaPlayer/>
        <MobileMediaPlayer/>
        <Row>
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path={["/album/:albumId"]} component={!isMobile?Album:PlayList}/>
            <Route path={["/artist/:artistId"]}  component={Artist}/>
            <Route path="/search"component={Search}/>
            <Route path="/queue"component={Queue}/>
            <Route path="/favorites"component={Favs}/>
            <Redirect from="/" to="/home" />
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}

export default withRouter(App);
