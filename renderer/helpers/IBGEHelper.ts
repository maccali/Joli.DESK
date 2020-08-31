import apiIBGE from '../services/apiIbge'

const IBGEHelper = {
  getEstados: () => {
    console.log('bosta')
    apiIBGE
      .get(
        'localidades/estados'
      )
      .then((response) => {

        console.log(response.data)
        // const estadoSigla = response.data.map((uf) => uf.sigla);
        return response.data
      }).catch((error) => {
        console.log(error)
        return []
      });
      return []
  },
  getCidades: (uf: string) => {
    apiIBGE
      .get(
        `localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        // const nomeCidade = response.data.map((cidade) => cidade.nome);
        return response.data
      }).catch((error) => {
        return []
      });
      return []
  },
}

export default IBGEHelper

