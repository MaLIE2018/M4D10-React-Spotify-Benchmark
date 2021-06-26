const initialstate = {
  track: {}, 
  play: false, 
  volume: 0.1
};

const PlayerReducer= (state = initialstate, action) =>{
      switch (action.type){
        case "SET_TRACK":
          return {...state,track:{...action.payload}}
        case "PLAY_TRACK":
          return {...state, play: true}
        case "PAUSE_TRACK":
          return {...state, play: false}
          case "SET_VOLUME":
          return {...state, volume: action.payload}
        default:
          return state
      }


}

export default PlayerReducer