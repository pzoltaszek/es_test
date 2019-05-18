import { combineReducers } from "redux";
import { users } from "./users";
import { isLoading } from "./isLoading";
import { addToInformList } from './addToInformList';
import { isLogged } from './isLogged';

export default combineReducers({
  users,
  isLoading,
  addToInformList,
  isLogged
});