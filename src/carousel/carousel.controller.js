class Rectangle {
  constructor(Position, height, weight) {
    this.Position = Position;
    this.height = height;
    this.weight = weight;
    this.say = 'cut';
  }

  sayHello() {
    console.log(this.Position.sayHello2());
    console.log(this.height);
    console.log(this.weight);
    this.say = 'Yo digo hola con import';
    return this.say;
  }
}

export default Rectangle;
