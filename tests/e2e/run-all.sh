#!/bin/bash
# Roda todos os testes ponta a ponta (ambiente local com IA simulada) e para no primeiro erro.
set -e
cd "$(dirname "$0")/../.."
for t in flow a2 exam fase2 fase3 fase4 fase6 reset conversa ligacao voz-travada dominio plano responsive a11y custo; do
  echo "== $t"
  npx tsx tests/e2e/$t.e2e.ts
done
echo "TODOS OS TESTES PONTA A PONTA PASSARAM"
