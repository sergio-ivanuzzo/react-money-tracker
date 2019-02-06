import { combineReducers } from 'redux';
import { money } from './money';
import { category } from "./category";

export default combineReducers({
    money,
    category
})