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
import moment from 'moment';
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
  dateTime: moment({
    hour: moment().hours(),
  }).valueOf(),
  ticks: [],
  currentForecast: false,
});

function appReducer(state = initialState, action) {
  let ticks = state.get('ticks');
  if (action.type === LOAD_WEATHER_FORECASTS_SUCCESS) {
    ticks = action.weatherForecasts[0].list.map(t =>
      moment(t.dt_txt).valueOf(),
    );
  }
  switch (action.type) {
    case CHANGE_DATE_TIME:
      console.log(ticks.find(t => action.dt + 60 * 60 * 1000 < t));
      return state.set(
        'dateTime',
        ticks.find(t => action.dt + 60 * 60 * 1000 < t) ||
          ticks[ticks.length - 1],
      );
    case LOAD_WEATHER_FORECASTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('weatherForecasts', false)
        .set('currentForecast', false);
    case LOAD_WEATHER_FORECASTS_SUCCESS:
      return state
        .set('ticks', ticks)
        .set('dateTime', ticks[0])
        .set('weatherForecasts', action.weatherForecasts)
        .set('currentForecast', action.weatherForecasts[0])
        .set('loading', false);
    case LOAD_WEATHER_FORECASTS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
