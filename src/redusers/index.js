import { combineReducers } from 'redux';
import data from './data';
import active from './data-active';
import focus from './focus';



const allReducers = combineReducers({
    Data: data,
    Active: active,
    actFocus: focus
})

export default allReducers