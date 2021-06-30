import { combineReducers } from "redux";
import QueueReducer from "../reducers/queue"
import favoritesReducer from "./favorites";
import PlayerReducer from "./player";
import showPlayer from './showPlayer';
import showMenu from "./showMenu"


const bigReducer = combineReducers({
      queue: QueueReducer,
      favorites: favoritesReducer,
      player: PlayerReducer,
      showMenu,
      showPlayer
})

export default bigReducer
