import { Reducer } from 'redux';
import {
	UPDATE_PAGE,
	UPDATE_OFFLINE,
	OPEN_SNACKBAR,
	CLOSE_SNACKBAR,
	UPDATE_DRAWER_STATE,
} from '../actions/app';
import { RootAction } from '../store';

// 인터페이스 선언
export interface AppState {
  page: string;
  offline: boolean;
  drawerOpened: boolean;
  snackbarOpened: boolean;
}

// 이런 식을 초기 값을 지정하는구나
const INITIAL_STATE: AppState = {
	page: '',
	offline: false,
	drawerOpened: false,
	snackbarOpened: false,
};

// 이게 리듀서
const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case UPDATE_PAGE:
		return {
			...state,
			page: action.page,
		};
	case UPDATE_OFFLINE:
		return {
			...state,
			offline: action.offline,
		};
	case UPDATE_DRAWER_STATE:
		return {
			...state,
			drawerOpened: action.opened,
		};
	case OPEN_SNACKBAR:
		return {
			...state,
			snackbarOpened: true,
		};
	case CLOSE_SNACKBAR:
		return {
			...state,
			snackbarOpened: false,
		};
	default:
		return state;
	}
};

export default app;
