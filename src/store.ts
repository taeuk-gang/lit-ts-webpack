import {
	createStore,
	compose,
	applyMiddleware,
	combineReducers,
	Reducer,
	StoreEnhancer,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import app, { AppState } from './reducers/app';
import { CounterState } from './reducers/counter';
import { ShopState } from './reducers/shop';
import { AppAction } from './actions/app';
import { CounterAction } from './actions/counter';
import { ShopAction } from './actions/shop';

declare global {
  interface Window {
    process?: Record<string, any>;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Overall state extends static states and partials lazy states.
export interface RootState {
  app?: AppState;
  counter?: CounterState;
  shop?: ShopState;
}

export type RootAction = AppAction | CounterAction | ShopAction;

const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	state => state as Reducer<RootState, RootAction>,
	devCompose(
		lazyReducerEnhancer(combineReducers),
		applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>),
	),
);

// Initially loaded reducers.
store.addReducers({
	app,
});
