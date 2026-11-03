/**
 * Formata uma data da API no padrão pt-BR (dd/MM/yyyy).
 *
 * A API devolve `dataAtividade` como "yyyy-MM-dd" (sem horário, fuso de Brasília).
 * Por isso a conversão é feita só por texto: usar `new Date("2026-11-02")` interpreta
 * a data como UTC e, em UTC-3, exibiria o dia anterior (01/11/2026).
 */
export function formatarDataPtBr(dataApi: string): string {
  const partes = /^(\d{4})-(\d{2})-(\d{2})/.exec(dataApi);
  if (!partes) return dataApi;

  const [, ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}
