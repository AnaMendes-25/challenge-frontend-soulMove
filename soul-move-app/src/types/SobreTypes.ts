import type { IconType } from "react-icons";

export interface DestaqueSobre {
  id: number;
  icone: IconType;
  titulo: string;
  descricao: string;
}

export interface EtapaSobre {
  id: number;
  icone: IconType;
  passo: string;
  titulo: string;
  descricao: string;
}