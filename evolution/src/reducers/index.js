import { combineReducers } from "redux";
import { users } from "./users";
import {isLoading} from "./isLoading";
import {addToInformList} from './addToInformList';

export default combineReducers({
  users,
  isLoading,
  addToInformList
});