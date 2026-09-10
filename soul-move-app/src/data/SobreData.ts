import type { DestaqueSobre, EtapaSobre } from "../types/SobreDataTypes";


import {
  FaBicycle,
  FaCirclePlus,
  FaGift,
  FaRankingStar,
  FaSeedling,
  FaUserPlus,
} from "react-icons/fa6";

export const destaquesSobre: DestaqueSobre[] = [
  {
    id: 1,
    icone: FaBicycle,
    titulo: "Mobilidade ativa",
    descricao: "Incentivo ao uso de bike, caminhada e corrida.",
  },
  {
    id: 2,
    icone: FaRankingStar,
    titulo: "Ranking",
    descricao: "Competição saudável para manter o engajamento.",
  },
  {
    id: 3,
    icone: FaSeedling,
    titulo: "Impacto",
    descricao: "Visualização do benefício ambiental gerado.",
  },
];

export const etapasSobre: EtapaSobre[] = [
  {
    id: 1,
    icone: FaUserPlus,
    passo: "Passo 01",
    titulo: "Registre",
    descricao:
      "Informe a ação realizada e envie uma foto, vídeo ou conecte um app parceiro como prova.",
  },
  {
    id: 2,
    icone: FaCirclePlus,
    passo: "Passo 02",
    titulo: "Ganhe pontos",
    descricao:
      "Receba pontos com base no impacto ambiental da ação. Missões especiais valem pontos em dobro.",
  },
  {
    id: 3,
    icone: FaRankingStar,
    passo: "Passo 03",
    titulo: "Suba no ranking",
    descricao:
      "Acompanhe sua posição entre todos os usuários e compita com seu grupo de amigos.",
  },
  {
    id: 4,
    icone: FaGift,
    passo: "Passo 04",
    titulo: "Conquiste recompensas",
    descricao:
      "Troque seus pontos por benefícios reais: descontos, recompensas exclusivas e muito mais.",
  },
];