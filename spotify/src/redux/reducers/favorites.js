const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []


const favoritesReducer = (state=savedFavorites, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return [...state,action.payload]
    case "REMOVE_FROM_FAVORITES":
        const newFavorites = state.filter(f => f.id !== action.payload)
        return [...newFavorites]
    default: 
      return state
  }
}

export default favoritesReducer