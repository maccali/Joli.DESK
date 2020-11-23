import apiIBGE from "../services/apiIbge";

const IBGEHelper = {
  getEstados: async () => {
    const response = await apiIBGE.get("localidades/estados");
    const estadoSigla = response.data.map((uf) => uf.sigla);
    console.log(estadoSigla);
    return estadoSigla;
  },
  getCidades: async (uf: string) => {
    const response = await apiIBGE.get(`localidades/estados/${uf}/municipios`);
    const nomeCidade = response.data.map((cidade) => cidade.nome);
    console.log(nomeCidade);
    return nomeCidade;
  },
};

export default IBGEHelper;
