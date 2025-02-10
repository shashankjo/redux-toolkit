const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

// an Action is an object that contains a type property, but it can contain more properties as well
// Action creator is a function that returns the Action object

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 10
  }
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty
  }
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    quantity: 10
  }
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  }
}

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCream: 20
}

// Reducers specify how the app's state changes in response to actions sent to the store
// A reducer accepts state and action as arguments, and returns the next state of the application

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
      case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      }
    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1
      }
      case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload
      }
    default:
      return state
  }
}

// Creating a combined reducer to hold multiple reducers together
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

// Responsibilties of a redux store
// 1. Holds application state, via a reducer
const store = createStore(rootReducer, applyMiddleware(logger))

// 2. Allows access to state via getState()
console.log('Initial state', store.getState())

// 3. Registers listeners via subscribe(listener).
// subscribe() is called automaticlly whenever the app state is updated by action dispatch
const unsubscribe = store.subscribe(() => {})

// 4. Allows state to be updated via dispatch(action)
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

store.dispatch(restockCake(3))

store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())

store.dispatch(restockIceCream(3))

// 5. Handles unregistering of listeners via the function returned by subscribe(listener)
unsubscribe()
store.dispatch(orderCake()) // here subscribed() will not be invoked as we have unsubscribed from it above
