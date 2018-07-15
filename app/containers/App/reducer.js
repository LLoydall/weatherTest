/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_WEATHER_FORECASTS_SUCCESS,
  LOAD_WEATHER_FORECASTS,
  LOAD_WEATHER_FORECASTS_ERROR,
  CHANGE_DATE_TIME,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  weatherForecasts: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE_TIME:
      return state.set('dateTime', action.dt);
    case LOAD_WEATHER_FORECASTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('weatherForecasts', false);
    case LOAD_WEATHER_FORECASTS_SUCCESS:
      return state
        .set('weatherForecasts', action.weatherForecasts)
        .set('loading', false);
    case LOAD_WEATHER_FORECASTS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
