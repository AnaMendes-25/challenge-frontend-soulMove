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

export const estatisticas: Estatistica[] = [
  {
    id: 1,
    titulo: "MOVE POINTS",
    valor: 1000,
    principal: true,
  },
  {
    id: 2,
    titulo: "Ações",
    valor: 1,
  },
  {
    id: 3,
    titulo: "Missões",
    valor: 1,
  },
  {
    id: 4,
    titulo: "Ranking",
    valor: 6,
  },
];

export const missoes: Missao[] = [
  {
    id: 1,
    titulo: "🚌 Semana do transporte",
    pontos: 200,
    progressoAtual: 5,
    progressoTotal: 5,
    diasRestantes: 5,
    destaque: true,
  },
  {
    id: 2,
    titulo: "♻️ Semana da reciclagem",
    pontos: 200,
    progressoAtual: 3,
    progressoTotal: 5,
    diasRestantes: 5,
  },
];

export const ranking: PessoaRanking[] = [
  {
    posicao: 1,
    iniciais: "AM",
    nome: "Ana Mendes",
    cidade: "Rio de Janeiro, RJ",
    pontos: 1000,
  },
  {
    posicao: 2,
    iniciais: "GB",
    nome: "Gustavo Borba",
    cidade: "Piauí, PI",
    pontos: 1000,
  },
  {
    posicao: 3,
    iniciais: "OM",
    nome: "Oto Mendes",
    cidade: "Goiânia, GO",
    pontos: 1000,
  },
  {
    posicao: 4,
    iniciais: "AT",
    nome: "Alexandre Teixeira",
    cidade: "Rio de Janeiro, RJ",
    pontos: 1000,
  },
  {
    posicao: 5,
    iniciais: "EN",
    nome: "Enzo Negrão",
    cidade: "São Paulo, SP",
    pontos: 1000,
  },
  {
    posicao: 6,
    iniciais: "AJ",
    nome: "Alexandre Jesus",
    cidade: "São Paulo, SP",
    pontos: 1000,
    usuarioAtual: true,
  },
];