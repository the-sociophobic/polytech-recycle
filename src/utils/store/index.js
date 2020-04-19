import storeClass from './storeClass'
import StoreContext from './StoreContext'


const initialState = stateRefs => ({
  store: new storeClass({
    stateRefs: stateRefs,
    DBlink: "https://trello.com/b/nKrfhtNh.json",
  }),
})

export {
  storeClass,
  StoreContext,
  initialState,
}
