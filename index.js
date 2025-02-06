const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'

// an Action is an object that contains a type property, but it can contain more properties as well
// Action creator is a function that returns the Action object

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 10
  }
}

const initialState = {
  numOfCakes: 10
}

// Reducers specify how the app's state changes in response to actions sent to the store
// A reducer accepts state and action as arguments, and returns the next state of the application

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    default:
      return state
  }
}

// Responsibilties of a redux store
// 1. Holds application state, via a reducer
const store = createStore(reducer)

// 2. Allows access to state via getState()
console.log('Initial state', store.getState())

// 3. Registers listeners via subscribe(listener).
// subscribe() is called automaticlly whenever the app state is updated by action dispatch
const unsubscribe = store.subscribe(() =>
  console.log('Updated state', store.getState())
)

// 4. Allows state to be updated via dispatch(action)
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

// 5. Handles unregistering of listeners via the function returned by subscribe(listener)
unsubscribe()
store.dispatch(orderCake()) // here subscribed() will not be invoked as we have unsubscribed from it above
