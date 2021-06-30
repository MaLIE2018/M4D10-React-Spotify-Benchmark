

const showMenu = function(state={showMenu: false, selectedTrack:{}}, action){
    switch(action.type){
      case "SHOW_MENU":
        return {...state, showMenu: !state.showMenu}
      case "SET_SELECTED_TRACK":
        return  {...state, selectedTrack: action.payload}
      default: 
        return state
    }
}

export default showMenu