import fotoAlexandre from '../assets/integrantes/alexandre-teixeira-profissional.png';
import fotoAna from '../assets/integrantes/ana-mendes-profissional.png';
import fotoEnzo from '../assets/integrantes/enzo-negrao-profissional.png';
import fotoFelipe from '../assets/integrantes/felipe-passos-profissional.png';
import fotoGustavo from '../assets/integrantes/gustavo-borba-profissional.png';
import fotoOto from '../assets/integrantes/oto-mendes-profissional.png';
import type {
  Estatistica,
  Missao,
  PessoaRanking,
} from '../types/MetricasTypes';

export const estatisticas: Estatistica[] = [
  {
    id: 1,
    titulo: "MOVE POINTS",
    valor: 500,
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
    valor: 4,
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
    diasRestantes: 2,
  },
  {
    id: 3,
    titulo: "🗺 Semana da reciclagem",
    pontos: 150,
    progressoAtual: 3,
    progressoTotal: 3,
    diasRestantes: 2,
  },
  {
    id: 4,
    titulo: "💡 Semana da economia de energia",
    pontos: 150,
    progressoAtual: 1,
    progressoTotal: 3,
    diasRestantes: 4,
  },
];

export const ranking: PessoaRanking[] = [
  {
    posicao: 1,
    iniciais: "AM",
    nome: "Ana Mendes",
    cidade: "Rio de Janeiro, RJ",
    pontos: 1000,
    foto: fotoAna,
  },
  {
    posicao: 2,
    iniciais: "GB",
    nome: "Gustavo Borba",
    cidade: "Piauí, PI",
    pontos: 900,
    foto: fotoGustavo,
  },
  {
    posicao: 3,
    iniciais: "OM",
    nome: "Oto Mendes",
    cidade: "Goiânia, GO",
    pontos: 800,
    foto: fotoOto,
  },
  {
    posicao: 4,
    iniciais: "AT",
    nome: "Alexandre Teixeira",
    cidade: "Rio de Janeiro, RJ",
    pontos: 700,
    foto: fotoAlexandre,
  },
  {
    posicao: 5,
    iniciais: "EN",
    nome: "Enzo Negrão",
    cidade: "São Paulo, SP",
    pontos: 600,
    foto: fotoEnzo,
  },
  {
    posicao: 6,
    iniciais: "FP",
    nome: "Filipe Passos",
    cidade: "São Paulo, SP",
    pontos: 500,
    foto: fotoFelipe,
    usuarioAtual: true,
  },
];