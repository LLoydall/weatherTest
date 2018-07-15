/**
 * sagas for the app container
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { LOAD_WEATHER_FORECASTS } from 'containers/App/constants';
import {
  weatherForecastsLoaded,
  weatherForecastsLoadingError,
} from 'containers/App/actions';
import towns from './northwales';
import { requestAll } from 'utils/request';

/**
 * Github weatherForecasts request/response handler
 */
export function* getWeatherForecasts() {
  const apiUrl =
    'http://api.openweathermap.org/data/2.5/forecast?appid=c54e656617f0e768f1cdc835e24830f1';

  try {
    // Call our request helper (see 'utils/request')
    const weatherForecasts = yield call(
      requestAll,
      towns.map(town => `${apiUrl}&id=${town.id}`),
    );
    yield put(weatherForecastsLoaded(weatherForecasts));
  } catch (err) {
    yield put(weatherForecastsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  // Watches for LOAD_WEATHER_FORECASTS actions and calls getWeatherForecasts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_WEATHER_FORECASTS, getWeatherForecasts);
}
