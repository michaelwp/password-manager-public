import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from './middlewares'
import {
    passReducers,
    inputPassReducers,
    deletePassReducers
} from './reducers';

const rootReducers = combineReducers({
    passReducers,
    inputPassReducers,
    deletePassReducers
});

const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
);

export default store;