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

export const acoesSustentaveis: AcaoSustentavel[] = [
  {
    id: "reciclagem",
    icone: "♻",
    titulo: "Reciclagem",
    pontos: 50,
    comprovacao:
      "Envie uma foto ou comprovante mostrando a separação correta dos resíduos, reciclagem ou descarte consciente.",
    exemplo: "Ex.: Separei o lixo reciclável",
  },
  {
    id: "energia",
    icone: "💡",
    titulo: "Economia de energia",
    pontos: 50,
    comprovacao:
      "Envie prints, fotos ou relatos mostrando ações como apagar luzes, desligar aparelhos ou reduzir o consumo de energia.",
    exemplo: "Ex.: Desliguei aparelhos da tomada",
  },
  {
    id: "transporte",
    icone: "🚊",
    titulo: "Transporte público",
    pontos: 35,
    comprovacao:
      "Envie foto, print do trajeto, bilhete ou comprovante mostrando o uso de ônibus, metrô, trem ou outro transporte público.",
    exemplo: "Ex.: Fui de metrô para a faculdade",
  },
  {
    id: "bike",
    icone: "🗺",
    titulo: "Trajeto de bike",
    pontos: 20,
    comprovacao:
      "O trajeto precisa ser de, no mínimo, 3 km. Você pode enviar prints do mapa, aplicativos ou fotos.",
    exemplo: "Ex.: Pedalada até o mercado",
  },
  {
    id: "pe",
    icone: "⌁",
    titulo: "Trajeto a pé",
    pontos: 20,
    comprovacao:
      "O trajeto precisa ser de, no mínimo, 3 km. Você pode enviar links, prints e fotos como comprovante.",
    exemplo: "Ex.: Caminhada para o trabalho",
  },
];

export const missoesValidacao: MissaoValidacao[] = [
  {
    id: 1,
    titulo: "♻️ Semana da reciclagem",
    pontos: 200,
    progresso: 3,
    total: 5,
    diasRestantes: 5,
  },
  {
    id: 2,
    titulo: "🚃 Semana do transporte",
    pontos: 200,
    progresso: 3,
    total: 5,
    diasRestantes: 5,
  },
];