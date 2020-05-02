import unique from 'uniq';
// import Position from './carousel/position.service';
// import Rectangle from './carousel/carousel.controller';

// const inversify = require('inversify');
// require('reflect-metadata');

import { TYPES, container } from './config/container.config';

window.addEventListener('load', () => {
  const rectangle = container.get(TYPES.Rectangle);

  const data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

  console.log(unique(data));
  console.log(rectangle.sayHello());
});
