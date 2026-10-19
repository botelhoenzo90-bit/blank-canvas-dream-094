# Check-in de implementação — estado verificado

## Rotas esperadas do pacote
- [x] `/` — existe uma implementação React inicial, mas ainda não é espelho HTML/CSS pixel-perfect.
- [x] `/bonus/calendario-natal.html` — página estática existente em `public/bonus/calendario-natal.html`.
- [ ] `/bonus/top-30-natal.html` — página criada em `public/bonus/top-30-natal.html`; ainda precisa ser comparada com a baseline capturada.
- [x] `/bonus/guia-fotos.html` — página estática existente em `public/bonus/guia-fotos.html`.
- [ ] Segunda captura de `/` em `pages/home-3/index.html` — não pode compartilhar o mesmo caminho HTTP `/` sem regra explícita para distinguir a variante; precisa de decisão de roteamento/QA.

## Assets
- [ ] Assets originais do ZIP ainda não foram copiados para o repositório; a fidelidade visual completa não está aprovada.
- [ ] Não verificado que todos os caminhos locais de imagens/fontes estejam resolvidos.

## Interações
- [ ] Matriz completa de interações do pacote ainda não foi executada.
- [ ] Screenshots de baseline/estados não foram comparadas automaticamente.

## Backend
- [ ] Migration segura foi preparada, mas não aplicada: não há projeto Supabase novo conectado neste ambiente.
- [ ] GET /api/conteudo sem prova E2E.
- [ ] Login/Logout não implementados, pois os contratos são apenas inferidos e não devem ser inventados.

## Entrega
- [ ] Build e preview não foram executados neste ambiente.
- [ ] Pixel QA não aprovado.
- [x] Manifestos de cobertura/entrega foram adicionados com pendências explicitadas.

Não marcar a reconstrução integral como concluída enquanto os itens bloqueantes acima estiverem pendentes.