import d3 from 'd3';
import topojson from 'topojson';
import jsdom from 'jsdom';
import us from './us-land';
import airports from './airports'

export default class MapRenderer {

  constructor(width, height, scale) {
    this._width = width;
    this._height = height;
    this._scale = scale;
  }

  render() {
    return new Promise((resolve, reject) => {

      jsdom.env({
        html: '',
        features: {
          QuerySelector: true
        },
        done: (err, window) => {
          if (err) reject(err);

          window.d3 = d3.select(window.document);

          let projection = d3.geo.albers()
            .scale(this._scale)
            .translate([this._width / 2, this._height / 2]);

          let path = d3.geo.path()
            .projection(projection);

          let svg = window.d3.select('body')
            .append('div').attr('class', 'container')
            .append('svg')
            .attr({
              width: this._width,
              height: this._height
            });

          svg.insert('path')
            .datum(topojson.feature(us, us.objects.land))
            .attr('d', path)
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', '1')
            .style('stroke-linejoin', 'round');

          svg.append('path')
            .datum(topojson.feature(airports, airports.objects.airports))
            .attr('class', 'points')
            .attr('d', path);

          resolve(window.d3.select('.container').html());
        }
      });

    });
  }

}
