import Position from '../carousel/position.service';
import Rectangle from '../carousel/carousel.controller';

const inversify = require('inversify');
require('reflect-metadata');

const TYPES = {
  Position: Symbol.for('Position'),
  Rectangle: Symbol.for('Rectangle'),
  height: Symbol.for('height'),
  weight: Symbol.for('weight'),
};

inversify.decorate(inversify.injectable(), Position);
inversify.decorate(inversify.injectable(), Rectangle);
inversify.decorate(inversify.inject(TYPES.Position), Rectangle, 0);
inversify.decorate(inversify.inject(TYPES.height), Rectangle, 1);
inversify.decorate(inversify.inject(TYPES.weight), Rectangle, 2);

const container = new inversify.Container();
container.bind(TYPES.Position).to(Position);
container.bind(TYPES.Rectangle).to(Rectangle);
container.bind(TYPES.height).toConstantValue(42);
container.bind(TYPES.weight).toConstantValue(30);

export { TYPES, container };
