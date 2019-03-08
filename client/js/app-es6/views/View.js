class View {
  constructor(element) {
    this._element = element;
  }

  template() {
    throw new Error("O método template tem que ser implementado.");
  }

  update(model) {
    this._element.innerHTML = this.template(model);
  }
}
