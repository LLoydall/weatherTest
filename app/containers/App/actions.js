import {
  LOAD_WEATHER_FORECASTS,
  LOAD_WEATHER_FORECASTS_SUCCESS,
  LOAD_WEATHER_FORECASTS_ERROR,
  CHANGE_DATE_TIME,
} from './constants';

/**
 * Change the date/time
 *
 * @return {object} An action object with a type of CHANGE_DATE_TIME
 */
export function changeDateTime(dt) {
  return {
    type: CHANGE_DATE_TIME,
    dt,
  };
}

/**
 * Load the weather forecasts, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_WEATHER_FORECASTS
 */
export function loadWeatherForecasts() {
  return {
    type: LOAD_WEATHER_FORECASTS,
  };
}

/**
 * Dispatched when the forecasts are loaded by the request saga
 *
 * @param  {array} forecasts The forecast data
 *
 * @return {object}      An action object with a type of LOAD_WEATHER_FORECASTS_SUCCESS passing the forecasts
 */
export function weatherForecastsLoaded(forecasts) {
  return {
    type: LOAD_WEATHER_FORECASTS_SUCCESS,
    forecasts,
  };
}

/**
 * Dispatched when loading the forecasts fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_WEATHER_FORECASTS_ERROR passing the error
 */
export function weatherForecastsLoadingError(error) {
  return {
    type: LOAD_WEATHER_FORECASTS_ERROR,
    error,
  };
}
