import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/Index';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise())

const store = createStore(
  reducers,
  middleware
)

export default store;