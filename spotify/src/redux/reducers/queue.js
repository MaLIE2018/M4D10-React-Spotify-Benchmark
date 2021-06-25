const savedQueue = JSON.parse(localStorage.getItem("queue")) || []

const queueReducer = (state=savedQueue, action) => {
  switch (action.type) {
    case "ADD_TO_QUEUE":
      return [...action.payload]
    default: 
      return state
  }
}

export default queueReducer