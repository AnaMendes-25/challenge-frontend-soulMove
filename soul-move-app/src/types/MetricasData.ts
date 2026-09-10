export interface Estatistica {
  id: number;
  titulo: string;
  valor: number;
  principal?: boolean;
}

export interface Missao {
  id: number;
  titulo: string;
  pontos: number;
  progressoAtual: number;
  progressoTotal: number;
  diasRestantes: number;
  destaque?: boolean;
}

export interface PessoaRanking {
  posicao: number;
  iniciais: string;
  nome: string;
  cidade: string;
  pontos: number;
  usuarioAtual?: boolean;
}

export interface Recompensa {
  id: number;
  marca: string;
  titulo: string;
  empresa: string;
  pontos: number;
}

