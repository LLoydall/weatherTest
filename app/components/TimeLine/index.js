/**
 *
 * TimeLine
 *
 */

import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import buildSlider from './buildSlider';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const mHour = () =>
  moment({
    hour: moment().hours(),
  });
/* eslint-disable react/prefer-stateless-function */
class TimeLine extends React.Component {
  createTimeline() {
    const { dateTime, currentForecast, onSetDateTime } = this.props;
    if (!currentForecast) return;
    const margin = {
      top: 50,
      right: 50,
      bottom: 0,
      left: 50,
    };
    const width = Math.min(window.innerWidth, 960) - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const x = d3
      .scaleTime()
      .domain([
        mHour().toDate(),
        mHour()
          .add(5, 'd')
          .toDate(),
      ])
      .range([0, width])
      .clamp(true);
    const y = d3.scaleLinear().range([100, 0]);

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(d => x(d.date))
      .y(d => y(d.temperature));

    const xAxis = d3
      .axisBottom(x)
      .ticks(d3.timeHour.every(24))
      .tickSizeInner(10)
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat('%m/%d'));

    // const hours = x.ticks(d3.timeHour.every(3));
    // const days = x.ticks(d3.timeDay);

    const slider = d3
      .select('#wrapper')
      .html('')
      .append('g')
      .attr('class', 'slider')
      .attr('transform', `translate(${margin.left},${height / 5})`);

    buildSlider(x, slider, onSetDateTime, dateTime);

    const graph = d3.select('#wrapper').append('g');

    graph
      .append('rect')
      .attr('class', 'graphs')
      .attr('width', x.range()[1])
      .attr('transform', `translate(${margin.left},${height / 4})`);

    const data = currentForecast.list.map(t => ({
      temperature: (t.main.temp - 273.15).toFixed(1),
      date: new Date(t.dt_txt),
    }));

    y.domain([-10, 40]);
    graph
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(${margin.left},${height / 4 + 100})`)
      .call(xAxis);

    graph
      .append('g')
      .attr('class', 'axis axis--y')
      .call(
        d3
          .axisLeft(y)
          .ticks(8)
          .tickPadding(12),
      )
      .attr('transform', `translate(${margin.left},${height / 4})`)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -50)
      .attr('dy', '1em')
      .attr('fill', '#000')
      .text('Temperature, ºc');

    graph
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('transform', `translate(${margin.left},${height / 4})`)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
  componentDidMount() {
    this.createTimeline();
  }
  componentDidUpdate() {
    this.createTimeline();
  }
  render() {
    return (
      <svg>
        <g id="wrapper" />
      </svg>
    );
  }
}

TimeLine.propTypes = {};

export default TimeLine;
