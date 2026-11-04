import test from "node:test";
import assert from "node:assert/strict";
import { concluirResgate } from "../src/services/concluirResgate.ts";

const registro = { id: 73, dataRecebimento: "2026-11-03", nomeUsuario: "Teste", descricaoRecompensa: "Benefício de teste", valor: 100 };

test("confirma o resgate antes de buscar o saldo real", async () => {
  const chamadas = [];
  const resultado = await concluirResgate(
    async () => { chamadas.push("resgatar"); return registro; },
    async () => { chamadas.push("saldo"); return 250; },
  );
  assert.deepEqual(chamadas, ["resgatar", "saldo"]);
  assert.deepEqual(resultado, { resgate: registro, saldo: 250 });
});

test("preserva resgate confirmado se a consulta do saldo falhar, sem repetir a escrita", async () => {
  let envios = 0;
  const resultado = await concluirResgate(
    async () => { envios++; return registro; },
    async () => { throw new Error("Sem conexão"); },
  );
  assert.equal(envios, 1);
  assert.equal(resultado.resgate, registro);
  assert.equal(resultado.saldo, null);
});

test("não consulta saldo nem repete o envio quando a tentativa falha", async () => {
  let consultas = 0;
  let envios = 0;
  const erro = new Error("Resultado desconhecido");
  await assert.rejects(concluirResgate(
    async () => { envios++; throw erro; },
    async () => { consultas++; return 250; },
  ), erro);
  assert.equal(envios, 1);
  assert.equal(consultas, 0);
});

test("saldo zero é um resultado válido", async () => {
  assert.equal((await concluirResgate(async () => registro, async () => 0)).saldo, 0);
});

test("saldo inválido não substitui o saldo por um valor inventado", async () => {
  for (const saldo of [NaN, Infinity, -10]) {
    assert.equal((await concluirResgate(async () => registro, async () => saldo)).saldo, null);
  }
});
