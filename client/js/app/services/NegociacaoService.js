"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this._http = new HttpService();
  }

  _createClass(NegociacaoService, [{
    key: "cadastrar",
    value: function cadastrar(negociacao) {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return "Negociação adicionada com sucesso";
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível adicionar a negociação");
      });
    }
  }, {
    key: "lista",
    value: function lista() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível obter as negociações");
      });
    }
  }, {
    key: "apaga",
    value: function apaga() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.apagaTodos();
      }).then(function () {
        return "Negociação removidas com sucesso";
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações");
      });
    }
  }, {
    key: "importa",
    value: function importa(listaAtual) {
      return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
        negociacoes = negociacoes.reduce(function (arrayAchatado, array) {
          return arrayAchatado.concat(array);
        }, []);
        return negociacoes.filter(function (negociacao) {
          return !listaAtual.some(function (n) {
            return JSON.stringify(negociacao) == JSON.stringify(n);
          });
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações");
      });
    }
  }, {
    key: "obterNegociacoesDaSemana",
    value: function obterNegociacoesDaSemana() {
      return this._http.get('negociacoes/semana').then(function (negociacoes) {
        return negociacoes.map(function (obj) {
          return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Não foi possível importar negociações da semana.');
      });
    }
  }, {
    key: "obterNegociacoesDaSemanaRetrasada",
    value: function obterNegociacoesDaSemanaRetrasada() {
      return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
        return negociacoes.map(function (obj) {
          return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Não foi possível importar negociações da semana retrasada.');
      });
    }
  }, {
    key: "obterNegociacoesDaSemanaAnterior",
    value: function obterNegociacoesDaSemanaAnterior() {
      return this._http.get('negociacoes/anterior').then(function (negociacoes) {
        return negociacoes.map(function (obj) {
          return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Não foi possível importar negociações da semana anterior.');
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map