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
} from './selectors';

const withReducer = injectReducer({ key: 'map', reducer });
const withSaga = injectSaga({
  key: 'map',
  saga,
});

const mapStateToProps = createStructuredSelector({
  markers: makeSelectWeatherForecasts(),
});

const MyMap = compose(
  withSaga,
  withReducer,
  connect(mapStateToProps),
)(props => <Map markers={props.markers} />);

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadWeatherForecasts());
  }

  render() {
    return (
      <RebassProvider>
        <div className="nav" />
        <MyMap />
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
