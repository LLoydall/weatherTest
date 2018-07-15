import { createSelector } from 'reselect';
import moment from 'moment';

const filterAndMapForecastsToMarkers = globalState => {
  const areas = globalState.get('weatherForecasts');
  if (!areas) return [];
  return areas.map(a => ({
    city: a.city,
    weather: a.list.find(l => moment(l.dt).isSame(globalState.get('dateTime'))),
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

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
  makeSelectLocation,
  makeSelectError,
  makeSelectLoading,
  makeSelectWeatherForecasts,
};
