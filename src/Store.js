import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/Index';
// import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk)

const store = createStore(
  reducers,
  middleware
)

export default store;