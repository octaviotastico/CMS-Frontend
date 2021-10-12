import { combineReducers } from 'redux';
import ThemeReducer from './ThemeReducer';

const AppReducer = combineReducers({
  theme: ThemeReducer,
});

export default AppReducer;
