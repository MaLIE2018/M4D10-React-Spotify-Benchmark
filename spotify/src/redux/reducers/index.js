import { combineReducers } from "redux";
import QueueReducer from "../reducers/queue"
import favoritesReducer from "./favorites";
import PlayerReducer from "./player";


const bigReducer = combineReducers({
      queue: QueueReducer,
      favorites: favoritesReducer,
      player: PlayerReducer
})

export default bigReducer
