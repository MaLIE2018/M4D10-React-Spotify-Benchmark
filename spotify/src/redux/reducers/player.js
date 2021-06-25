const initialstate = {
  track: {}, 
  play: false, 
  pause: true
};

const PlayerReducer= (state = initialstate, action) =>{
      switch (action.type){
        case "SET_TRACK":
          return {...state,track:{...action.payload}}
        case "PLAY_TRACK":
          return {...state, play: true, pause:false}
        case "PAUSE_TRACK":
          return {...state, play: true, pause:true}
        case "STOP_TRACK":
            return {...state, play: false, pause:true}  
        default:
          return state
      }


}

export default PlayerReducer