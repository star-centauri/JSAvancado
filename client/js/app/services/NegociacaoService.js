class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível importar negociações da semana.');
      });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível importar negociações da semana retrasada.');
      });
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(error => {
        console.log(error);
        throw new Error('Não foi possível importar negociações da semana anterior.');
      });
  }
}
