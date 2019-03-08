'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
  function HttpService() {
    _classCallCheck(this, HttpService);
  }

  _createClass(HttpService, [{
    key: '_handleErrors',
    value: function _handleErrors(response) {
      if (!response.ok) throw new Error(response.statusText);
      return response;
    }
  }, {
    key: 'get',
    value: function get(url) {
      var _this = this;

      return fetch(url).then(function (response) {
        return _this._handleErrors(response);
      }).then(function (response) {
        return response.json();
      });

      /* VERSÃO DE REQUISIÇÃO INFERIOR AO ES6 
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
          xhr.onreadystatechange = () => {
          if(xhr.readyState == 4) {
            if(xhr.status == 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(xhr.responseText);
            }
          };
        };
        xhr.send();
      });
      */
    }
  }, {
    key: 'post',
    value: function post(url, dado) {
      var _this2 = this;

      return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(dado)
      }).then(function (response) {
        return _this2._handleErrors(response);
      }).then(function (response) {
        return response.json();
      });

      /* VERSÃO DE REQUISIÇÃO INFERIOR AO ES6 
       return new Promise((resolve, reject) => {
         let xhr = new XMLHttpRequest();
         xhr.open("POST", url, true);
         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.onreadystatechange = () => {
             if (xhr.readyState == 4) {
                 if (xhr.status == 200) {
                     resolve(JSON.parse(xhr.responseText));
                 } else {
                       reject(xhr.responseText);
                 }
             }
         };
         xhr.send(JSON.stringify(dado));
       });
      */
    }
  }]);

  return HttpService;
}();
//# sourceMappingURL=HttpService.js.map