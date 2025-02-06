const CAKE_ORDERED = 'CAKE_ORDERED'

// an Action is an object that contains a type property, but it can contain more properties as well
// Action creator is a function that returns the Action object

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 10
  }
}

const intialState = {
  numOfCakes: 10
}

// Reducers specify how the app's state changes in response to actions sent to the store
// A reducer accepts state and action as arguments, and returns the next state of the application

const reducer = (state = intialState, acttion) => {
  switch (acttion.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    default:
      return state
  }
}
