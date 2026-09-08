import type { PessoaRanking } from "../types/MetricasData";

const MOVE_POINTS_STORAGE_KEY = "soulmove-move-points";
const INITIAL_MOVE_POINTS = 500;

export function getMovePoints(): number {
  const pontosSalvos = window.localStorage.getItem(MOVE_POINTS_STORAGE_KEY);
  const pontos = Number(pontosSalvos);

  return Number.isFinite(pontos) ? pontos : INITIAL_MOVE_POINTS;
}

export function addMovePoints(pontos: number): number {
  const novoSaldo = getMovePoints() + pontos;
  window.localStorage.setItem(
    MOVE_POINTS_STORAGE_KEY,
    String(novoSaldo),
  );

  return novoSaldo;
}

export function getCurrentRanking(ranking: PessoaRanking[]): PessoaRanking[] {
  return ranking
    .map((pessoa) => ({
      ...pessoa,
      pontos: pessoa.usuarioAtual ? getMovePoints() : pessoa.pontos,
    }))
    .sort((primeiraPessoa, segundaPessoa) =>
      segundaPessoa.pontos - primeiraPessoa.pontos,
    )
    .map((pessoa, indice) => ({
      ...pessoa,
      posicao: indice + 1,
    }));
}
