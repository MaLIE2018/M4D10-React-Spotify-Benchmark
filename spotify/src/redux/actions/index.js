import {api} from "../../App.js"
 
export const addToQueue = (trackListURL) => {
  let albumNo 
  if(!Number(trackListURL)){
    albumNo = trackListURL.replace(/\D/g,'')
  } else{
    albumNo = trackListURL
  }
  const URL = api + "/album/" + albumNo
  return async(dispatch) =>{
    try {
      
      const res = await fetch(URL)
      if(res.ok){
        const data = await res.json()
        dispatch({type:"ADD_TO_QUEUE", payload: data.tracks.data.map(track => {return {...track, albumId: data.id}})})
      }
    } catch (error) {
        console.log(error)
    }
  }

}
export const addToFavorites = (song) => {
  return {
    type: "ADD_TO_FAVORITES",
    payload: song
  }

}
export const removeFromFavorites = (id) => {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload: id
  }

}
export const setTrack = (track) => {
  return { 
    type: "SET_TRACK",
    payload: track
  }
}

export const setTrackProgress= (count) => {
  return { 
    type: "SET_TRACK_PROGRESS",
    payload: count
  }
}
export const setTrackProgressNull= () => {
  return { 
    type: "SET_TRACK_PROGRESS_NULL",
    payload: 0
  }
}


export const playTrack = () => {
  return { 
    type: "PLAY_TRACK",
    
  }
}
export const pauseTrack = () => {
  return { 
    type: "PAUSE_TRACK",
  }
}

export const setVolume = () => {
  return { 
    type: "SET_VOLUME",
  }
}

export const showPlayer = () => {
  return {
    type:"SHOW_PLAYER"
  }
}

export const showMenu = () => {
  return {
    type:"SHOW_MENU",
  }
}