import type { MissaoValidacao } from "../types/ValidacaoTypes";
import reciclagemIcone from "../assets/icones/reciclagem-correta.png";
import transporteIcone from "../assets/icones/transporte-publico.png";
import bikeIcone from "../assets/icones/bike.png";
import caminhadaIcone from "../assets/icones/andando-pé.png";

export interface AcaoSustentavel {
  id: string; // Agora usa os Enums exatos do Java
  icone: string;
  titulo: string;
  pontos: number;
  comprovacao: string;
  exemplo: string;
}

export interface DicionarioVisual {
  id: string; // Vai cruzar com o "tipoAtividade" (ex: "RECICLAGEM")
  icone: string;
  iconeImg?: string; // Imagem aprovada; o emoji fica de reserva (ex.: energia)
  comprovacao: string;
  exemplo: string;
}

export const acoesSustentaveis: DicionarioVisual[] = [
  {
    id: "RECICLAGEM",
    icone: "♻",
    iconeImg: reciclagemIcone,
    comprovacao: "Envie uma foto ou comprovante mostrando a separação correta dos resíduos, reciclagem ou descarte consciente.",
    exemplo: "Ex.: Separei o lixo reciclável",
  },
  {
    id: "REDUCAO_ENERGIA",
    icone: "💡",
    comprovacao: "Envie prints, fotos ou relatos mostrando ações como apagar luzes, desligar aparelhos ou reduzir o consumo de energia.",
    exemplo: "Ex.: Desliguei aparelhos da tomada",
  },
  {
    id: "TRANSPORTE_PUBLICO",
    icone: "🚊",
    iconeImg: transporteIcone,
    comprovacao: "Envie foto, print do trajeto, bilhete ou comprovante mostrando o uso de ônibus, metrô, trem ou outro transporte público.",
    exemplo: "Ex.: Fui de metrô para a faculdade",
  },
  {
    id: "TRAJETO_BIKE",
    icone: "🗺",
    iconeImg: bikeIcone,
    comprovacao: "O trajeto precisa ser de, no mínimo, 3 km. Você pode enviar prints do mapa, aplicativos ou fotos.",
    exemplo: "Ex.: Pedalada até o mercado",
  },
  {
    id: "TRAJETO_CAMINHADA",
    icone: "⌁",
    iconeImg: caminhadaIcone,
    comprovacao: "O trajeto precisa ser de, no mínimo, 3 km. Você pode enviar links, prints e fotos como comprovante.",
    exemplo: "Ex.: Caminhada para o trabalho",
  }
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