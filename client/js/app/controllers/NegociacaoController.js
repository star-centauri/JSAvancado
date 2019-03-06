class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._ordemAtual = '';
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacaoService = new NegociacaoService();
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

    this._init();
  }

  _init() {
    this._negociacaoService
        .lista()
        .then(negociacoes =>
          negociacoes.forEach(negociacao =>
  	  			this._listaNegociacoes.adiciona(negociacao)))
        .catch(erro => this._mensagem.texto = erro);

      setInterval(() => this.importaNegociacoes(), 3000);
  }

  isEquals(negociacao) {
    return JSON.stringify(this) == JSON.stringify(negociacao)
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();
    this._negociacaoService
        .cadastrar(negociacao)
        .then(mensagem => {
          this._listaNegociacoes.adiciona(negociacao);
          this._mensagem.texto = mensagem;
          this._limpaFormulario();
        })
        .catch(erro => this._mensagem.texto = erro);
  }

  importaNegociacoes() {
    this._negociacaoService
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => {
          negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);
  }

  apaga() {
    this._negociacaoService
        .apaga()
        .then(msg => {
          this._listaNegociacoes.esvazia();
       		this._mensagem.texto = msg;
        })
        .catch(erro => this._mensagem.texto = erro);
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
