import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../redux';
import thunk from 'redux-thunk';

const logger = (store) => (next) => (action) => {
  console.log('Dispatching:');
  console.log(JSON.stringify(action, null, 4));
  const result = next(action);
  console.log('Next state:\n', JSON.stringify(store.getState(), null, 4));
  return result;
};

export default applyMiddleware(logger, thunk)(createStore)(rootReducer);
