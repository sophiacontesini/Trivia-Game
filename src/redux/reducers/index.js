import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import config from './config';

const rootReducer = combineReducers({ player, token, config });

export default rootReducer;
