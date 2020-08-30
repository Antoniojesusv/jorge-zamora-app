class Position {
  constructor() {
    this.say = '';
  }

  sayHello2() {
    this.say = 'I am the position dependencies';
    return this.say;
  }
}

export default Position;
