import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import {Container } from "react-bootstrap"
import NavBar from "./components/NavBar.jsx"
import {Row} from "react-bootstrap"
import MediaPlayer from './components/MediaPlayer'
import {Route, withRouter} from 'react-router-dom'
import Home from './components/Home'
import Album from "./components/Album"
import Artist from "./components/Artist"
import Search from "./components/Search"
import {useState, useEffect} from "react"

function App(props) {
  const [currPath, setPath] = useState("")
  const [currTrack,setTrack] = useState({})

  useEffect(() => {
    setPath(() => {
      return props.location.pathname},fetchData(props.location.pathname))
  },[props])

  const fetchData = async (currPath) => {
    console.log("crr",currPath.split("/")[3])
    if(currPath.split("/")[3] ){try {
      let response = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/track/"+ currPath.split("/")[3] , {
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
    <Container fluid>
      <Row>
      <NavBar></NavBar>
      <Route path="/home" component={Home}/>
      <Route path={["/album/:albumId"]} component={Album}/>
      <Route path={["/artist/:artistId"]}  component={Artist}/>
      <Route path="/search"component={Search}/>
      <MediaPlayer data={currTrack}></MediaPlayer>
      </Row>
    </Container>
  );
}

export default withRouter(App);
