class NegociacoesView extends View {
  constructor(element) {
    super(element);
  }

  _totalizadorVolume(model) {
    return model.negociacoes.reduce((total, n) => total + n.volume, 0.0);
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
          <thead>
              <tr>
                  <th onclick="negociacao.ordenar('data')">DATA</th>
                  <th onclick="negociacao.ordenar('quantidade')">QUANTIDADE</th>
                  <th onclick="negociacao.ordenar('valor')">VALOR</th>
                  <th onclick="negociacao.ordenar('volume')">VOLUME</th>
              </tr>
          </thead>

          <tbody>
            ${model.negociacoes.map(n =>
              `<tr>
                <td>${DateHelper.DateToString(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.volume}</td>
              </tr>`
            ).join('')}
          </tbody>
          <tfoot>
            <td colspan="3"></td>
            <td>${this._totalizadorVolume(model)}</td>
          </tfoot>
      </table>
    `;
  }
}
