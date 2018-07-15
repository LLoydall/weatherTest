import { createSelector } from 'reselect';
import moment from 'moment';

const filterAndMapForecastsToMarkers = globalState => {
  const areas = globalState.get('weatherForecasts');
  if (!areas) return [];
  return areas.map(a => ({
    city: a.city,
    weather: a.list.find(
      l => moment(l.dt_txt).valueOf() === globalState.get('dateTime'),
    ),
  }));
};

const selectRoute = state => state.get('route');

const selectGlobal = state => state.get('global');

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectWeatherForecasts = () =>
  createSelector(selectGlobal, filterAndMapForecastsToMarkers);

const makeSelectDateTime = () =>
  createSelector(selectGlobal, globalState => globalState.get('dateTime'));

const makeSelectTicks = () =>
  createSelector(selectGlobal, globalState => globalState.get('ticks'));

const makeSelectCurrentForecast = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('currentForecast'),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
  makeSelectLocation,
  makeSelectError,
  makeSelectLoading,
  makeSelectWeatherForecasts,
  makeSelectDateTime,
  makeSelectTicks,
  makeSelectCurrentForecast,
};
