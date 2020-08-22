import unique from 'uniq';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
// import Position from './carousel/position.service';
// import Rectangle from './carousel/carousel.controller';

// const inversify = require('inversify');
// require('reflect-metadata');

import { TYPES, container } from './config/container.config';

window.addEventListener('load', () => {
  const rectangle = container.get(TYPES.Rectangle);

  const data = [1, 2, 2, 3, 4, 5, 5, 5, 6, 7];

  console.log(unique(data));

  console.log(rectangle.sayHello());

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: moment().format(),
        value: '',
      };
      this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
      event.preventDefault();
      const { value } = event.target;
      console.log('entro en el gestor del input');
      this.setState({
        date: moment().format(),
        value,
      });
    }

    render() {
      const { date, value } = this.state;
      return (
        <form>
          <label htmlFor="test">
            <input type="text" id="test" onInput={this.handleInput} />
          </label>
          <div>{date}</div>
          <div>{value}</div>
        </form>
      );
    }
  }

  const main = window.document.getElementById('app');
  ReactDOM.render(<App />, main);
});
