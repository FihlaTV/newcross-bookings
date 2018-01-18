import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

// const createStoreWithMiddleware = applyMiddleware(apiMiddleware,thunk)(createStore);

export default function configureStore(initialState) {
	 const middlewares = [thunk];
	  if (process.env.NODE_ENV !== 'production') {
	    middlewares.push(createLogger());
	  }

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );

}

