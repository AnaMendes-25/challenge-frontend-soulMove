

export interface AcaoSustentavel {
  id: string;
  icone: string;
  titulo: string;
  pontos: number;
  comprovacao: string;
  exemplo: string;
}

export interface PessoaRankingValidacao {
  posicao: number;
  iniciais: string;
  nome: string;
  cidade: string;
  pontos: number;
}

export interface MissaoValidacao {
  id: number;
  titulo: string;
  pontos: number;
  progresso: number;
  total: number;
  diasRestantes: number;
}

//precisei desse type por causa da rota get/atividades ... resumindo gambiarra + reslve o B.O...
export interface AtividadeBackend {
    id: number;
    nome: string;
    descricao: string;
    validacao: string;
    pontuacao: number;
    tipoAtividade: string;
  }