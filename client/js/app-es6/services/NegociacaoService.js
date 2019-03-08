class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  cadastrar(negociacao) {
    return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso")
            .catch(erro => {
              console.log(erro);
              throw new Error("Não foi possível adicionar a negociação")
            })
  }

  lista() {
    return ConnectionFactory
      	  	.getConnection()
      	  	.then(connection => new NegociacaoDao(connection))
      	  	.then(dao => dao.listaTodos())
            .catch(erro => {
              console.log(erro);
              throw new Error("Não foi possível obter as negociações")
            });
  }

  apaga() {
    return ConnectionFactory
      	  	.getConnection()
      	  	.then(connection => new NegociacaoDao(connection))
      	  	.then(dao => dao.apagaTodos())
            .then(() => "Negociação removidas com sucesso")
            .catch(erro => {
              console.log(erro);
              throw new Error("Não foi possível apagar as negociações")
            });
  }

  importa(listaAtual) {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ])
    .then(negociacoes => {
      negociacoes = negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
      return negociacoes.filter(negociacao =>
          !listaAtual.some(n =>
               JSON.stringify(negociacao) == JSON.stringify(n)))
    })
    .catch(erro => {
      console.log(erro);
      throw new Error("Não foi possível apagar as negociações")
    });
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
