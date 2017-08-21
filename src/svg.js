export default class Svg {
  constructor(element) {
    this._name = 'Svg';
    this.svg = element;
  }
  get name() {
    return this._name;
  }
  text(){

  }
  showTools(){
	console.log(this.svg);
  }
}
