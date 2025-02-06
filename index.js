const CAKE_ORDERED = 'CAKE_ORDERED'

// an Action is an object that contains a type property, but it can contain more properties as well
// Action creator is a function that returns the Action object

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 10
  }
}

console.log(orderCake())
