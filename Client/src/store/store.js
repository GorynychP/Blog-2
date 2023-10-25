import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore,
} from 'redux';
import {
	appReducer,
	postReducer,
	postsReducer,
	userReducer,
	usersReducer,
} from './reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
});

const conmposeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	reducer,
	conmposeEnhacers(applyMiddleware(thunk)),
);
