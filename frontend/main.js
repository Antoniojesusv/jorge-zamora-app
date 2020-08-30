import unique from 'uniq';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
// import moment from 'moment';
// import Position from './carousel/position.service';
// import Rectangle from './carousel/carousel.controller';

// const inversify = require('inversify');
// require('reflect-metadata');

// import { TYPES, container } from './config/container.config';

// const rectangle = container.get(TYPES.Rectangle);

const data = [1, 2, 2, 3, 4, 5, 5, 5, 6, 7];

console.log(unique(data));

// console.log(rectangle.sayHello());

const main = window.document.getElementById('app');
ReactDOM.render(<App />, main);
