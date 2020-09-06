import { combineReducers } from 'redux';
import todo from './todo';
import contact from './contact';
import navbar from './navbar';

export default combineReducers({todo, contact, navbar});