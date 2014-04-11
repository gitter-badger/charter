console.clear();

var charter = function () {
  'use strict';

  var graph = {
    type: 'bar',
    series: [],
    element: null,
    data: function (data) {
      if (!data) console.error(new Error('You must provide data.'));
      this.series = data;
      return this;
    },
    options: function (args) {
      this.type = args.type || 'bar';
      return this;
    },
    render: function () {
      var self = this;
      var svg = this.element.querySelector('svg');
      if (svg === null) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      }

      var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var path = '';
      
      var step = this.width / (this.series.length - 1);
      var padding = 10;

      this.series.forEach(function (value, index) {
        if (index === 0)
          path += 'M' + (index + padding) + ',' + (self.height - value.y - padding);
        else
          path += 'L' + (index * step - padding) + ',' + (self.height - value.y - padding);
      });
    
      this.element.appendChild(svg);
      
      newPath.setAttributeNS(null, 'style', 'stroke: #f44; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1; fill: none;');
      newPath.setAttributeNS(null, 'd', path);

      svg.appendChild(newPath);
      return this;
    }
  };
  
  return {
    select: function (element) {
      var g = Object.create(graph);
      g.element = document.querySelector(element);
      g.width = g.element.offsetWidth;
      g.height = g.element.offsetHeight;

      return g;
    }
  };
}

var myChart = charter()
  .select('#test')
  .data([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 10 },
    { x: 4, y: 100 },
    { x: 5, y: 150 },
    { x: 6, y: 180 },
    { x: 7, y: 150 },
    { x: 8, y: 100 },
    { x: 9, y: 10 },
    { x: 10, y: 0 },
    { x: 11, y: 0 },
    { x: 12, y: 0 }
  ])
  .options({type: 'line'})
  .render();

// charter()
//   .select('#test1')
//   .data([
//     { x: 0, y: 0 },
//     { x: 1, y: 0 },
//     { x: 2, y: 0 },
//     { x: 3, y: 10 },
//     { x: 4, y: 100 },
//     { x: 5, y: 150 },
//     { x: 6, y: 180 },
//     { x: 7, y: 150 },
//     { x: 8, y: 100 },
//     { x: 9, y: 10 },
//     { x: 10, y: 0 },
//     { x: 11, y: 0 },
//     { x: 12, y: 0 }
//   ])
//   .render();
