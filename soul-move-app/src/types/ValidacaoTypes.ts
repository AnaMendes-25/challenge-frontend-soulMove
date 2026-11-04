import type { AtividadeBackend } from "../services/atividadesTypes";

export interface AcaoSustentavel {
  id: string;
  icone: string;
  iconeImg?: string;
  titulo: string;
  pontos: number;
  comprovacao: string;
  exemplo: string;
  dadoOriginalJava?: AtividadeBackend;
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