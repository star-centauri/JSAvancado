class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._ordemAtual = '';
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );

	  ConnectionFactory
	  	.getConnection()
	  	.then(connection => new NegociacaoDao(connection))
	  	.then(dao => dao.listaTodos())
	  	.then(negociacoes =>
	  		negociacoes.forEach(negociacao =>
	  			this._listaNegociacoes.adiciona(negociacao))
	  	).catch(erro => this._mensagem.texto = erro);

  }

  adiciona(event) {
    event.preventDefault();

	  ConnectionFactory
	  	.getConnection()
	  	.then(connection => {
			let negociacao = this._criaNegociacao();

			new NegociacaoDao(connection)
				.adiciona(negociacao)
				.then(() => {
					this._listaNegociacoes.adiciona(negociacao);
    					this._mensagem.texto = "Negociação adicionada com sucesso";
    					this._limpaFormulario();
				})
		})
	  	.catch(erro => this._mensagem.texto = erro);
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()
    ])
    .then(negociacoes => {
      negociacoes = negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])

      return negociacoes.filter(negociacao =>
          !this._listaNegociacoes.negociacoes.some(n =>
              JSON.stringify(negociacao) == JSON.stringify(n)))
    })
    .then(negociacoes => {
      negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso';
    })
    .catch(error => this._mensagem.texto = error);
  }

  apaga() {
	  ConnectionFactory
	  	.getConnection()
	  	.then(connection => new NegociacaoDao(connection))
	  	.then(dao => dao.apagaTodos())
	  	.then(msg => {
			 this._listaNegociacoes.esvazia();
    			this._mensagem.texto = msg;
		}).catch(error => this._mensagem.texto = error);
  }

  ordenar(coluna) {
    if (this._ordemAtual == coluna) {
        this._listaNegociacoes.inverteOrdem();
    } else {
        this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
    }

    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.StringToDate(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}
