import * as d3 from 'd3';
import moment from 'moment';
export default function buildSlider(x, slider, slideCallback, startDate) {
  const formatDate = d3.timeFormat('%d/%m %H:%M');

  slider
    .append('line')
    .attr('class', 'track')
    .attr('x1', x.range()[0])
    .attr('x2', x.range()[1])
    .select(function() {
      return this.parentNode.appendChild(this.cloneNode(true));
    })
    .attr('class', 'track-inset')
    .select(function() {
      return this.parentNode.appendChild(this.cloneNode(true));
    })
    .attr('class', 'track-overlay')
    .call(
      d3
        .drag()
        .on('start.interrupt', () => {
          slider.interrupt();
        })
        .on('start drag', () => update(x.invert(d3.event.x), 'mid'))
        .on('end', () => update(x.invert(d3.event.x), 'end')),
    );

  let handle = slider
    .insert('circle', '.track-overlay')
    .attr('class', 'handle')
    .attr('r', 9)
    .attr('cx', x(startDate));

  let label = slider
    .append('text')
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .attr('x', x(startDate))
    .text(formatDate(startDate))
    .attr('transform', `translate(0,${-25})`);

  function update(h, e) {
    const dt = moment(h).startOf('hour');

    handle.attr('cx', x(dt.toDate()));
    label.attr('x', x(dt.toDate())).text(formatDate(dt.toDate()));
    if (e === 'end') slideCallback(dt.valueOf());
  }
}
