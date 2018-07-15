/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Provider as RebassProvider, Flex } from 'rebass';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Map from '../../components/Map/index';

import saga from './saga';
import reducer from './reducer';

import { loadWeatherForecasts } from './actions';
import {
  makeSelectWeatherForecasts,
  makeSelectLoading,
  makeSelectError,
  makeSelectDateTime,
  makeSelectCurrentForecast,
} from './selectors';
import TimeLine from 'components/TimeLine';
import { changeDateTime } from './actions';

const withReducer = injectReducer({ key: 'map', reducer });
const withSaga = injectSaga({
  key: 'map',
  saga,
});

const mapStateToMapProps = createStructuredSelector({
  markers: makeSelectWeatherForecasts(),
});

const mapStateToTimeLineProps = createStructuredSelector({
  dateTime: makeSelectDateTime(),
  currentForecast: makeSelectCurrentForecast(),
});

function mapDispatchToTimeLineProps(dispatch) {
  return {
    onSetDateTime: dt => dispatch(changeDateTime(dt)),
  };
}

const ConnectedMap = compose(
  withSaga,
  withReducer,
  connect(mapStateToMapProps),
)(props => <Map {...props} />);

const ConnectedTimeLine = compose(
  withSaga,
  withReducer,
  connect(
    mapStateToTimeLineProps,
    mapDispatchToTimeLineProps,
  ),
)(props => <TimeLine {...props} />);

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadWeatherForecasts());
  }

  render() {
    return (
      <RebassProvider>
        <div className="nav" />
        <ConnectedMap />
        <ConnectedTimeLine />
        <Flex className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Flex>
      </RebassProvider>
    );
  }
}

export default connect()(App);
