# Matriz de cobertura dos contratos de backend

## Estado desta entrega

O pacote identifica um GET confirmado em `/api/conteudo`, mas não contém um esquema confiável do corpo de resposta. Os contratos POST/DELETE em `/api/login` são inferidos do bundle, não confirmados por tráfego observável. Não foram criados endpoints que imitem autenticação privada nem dados da origem.

| Contrato | Evidência | Implementação local | Teste E2E | Estado |
|---|---|---|---|---|
| GET /api/conteudo | Confirmado, resposta não especificada | Pendente de definir contrato de resposta e conectar Supabase novo | Não executado | Bloqueado |
| POST /api/login | Provável, inferido de bundle | Não implementado; não inventar campos/fluxo | Não executado | Não confirmado |
| DELETE /api/login | Provável, inferido de bundle | Não implementado; não inventar sessão da origem | Não executado | Não confirmado |

## Requisitos restantes

1. Criar/conectar um projeto Supabase novo controlado pelo proprietário.
2. Aplicar a migration em `supabase/migrations/00000000000000_copyai_new_equivalent_schema.sql`.
3. Revisar RLS no painel e testar como anônimo, proprietário e não proprietário.
4. Definir o contrato de resposta de `GET /api/conteudo` a partir de evidência autorizada; então implementar e registrar prova E2E.
5. Implementar login apenas após definir um fluxo novo e seguro. Não reutilizar cookies, tokens, credenciais, usuários ou dados privados da origem.

Nenhum teste E2E é declarado como concluído nesta entrega.