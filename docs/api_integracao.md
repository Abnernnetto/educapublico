# Análise de Integração de APIs para o EducaPúblico

## Visão Geral

Este documento apresenta uma análise detalhada das APIs disponíveis no Portal da Transparência e outras fontes de dados governamentais que podem ser utilizadas para implementar as consultas dinâmicas no projeto EducaPúblico.

## Requisitos de Dados

Para atender às necessidades do projeto EducaPúblico, precisamos de APIs que forneçam:

1. **Dados orçamentários por nível governamental** (Federal e Estadual)
2. **Dados por setor** (Educação, Saúde e Segurança)
3. **Dados por estado** (quando o nível Estadual for selecionado)
4. **Visualização macro** (comparativo entre os 3 setores)
5. **Visualização detalhada** (distribuição dentro de cada setor)

## APIs do Portal da Transparência

### Endpoint Principal para Consulta por Setor

O endpoint mais relevante identificado é:

```
GET /api-de-dados/despesas/por-funcional-programatica
```

Este endpoint permite consultar despesas do Poder Executivo Federal pela classificação funcional programática, que inclui:

- **Função**: Representa o setor (ex: Educação, Saúde, Segurança)
- **Subfunção**: Subdivisões dentro de cada setor
- **Programa**: Programas específicos dentro de cada subfunção

**Parâmetros disponíveis:**
- `ano` (obrigatório): Ano da despesa (AAAA)
- `funcao`: Código SIAFI da função (setor)
- `subfuncao`: Código SIAFI da subfunção
- `programa`: Código SIAFI do programa

**Limitações identificadas:**
- Este endpoint fornece apenas dados do Poder Executivo Federal
- Não há parâmetro para filtrar por estado diretamente

### Outros Endpoints Relevantes

1. **Consulta de despesas por órgão**:
   ```
   GET /api-de-dados/despesas/por-orgao
   ```
   Útil para obter dados de despesas por órgãos federais específicos.

2. **Consulta de movimentação líquida anual**:
   ```
   GET /api-de-dados/despesas/por-funcional-programatica/movimentacao-liquida
   ```
   Fornece dados de movimentação líquida anual por classificação funcional programática.

## Limitações e Desafios

1. **Dados Estaduais**: A API do Portal da Transparência é focada em dados federais. Para dados estaduais, será necessário:
   - Buscar APIs específicas de cada estado
   - Ou utilizar o Portal de Dados Abertos (dados.gov.br) que agrega alguns dados estaduais

2. **Padronização de Dados**: Cada estado pode ter sua própria estrutura de dados e classificação orçamentária, o que exigirá um trabalho de normalização.

3. **Códigos SIAFI**: Será necessário mapear os códigos SIAFI para os setores de interesse:
   - Educação: Função 12
   - Saúde: Função 10
   - Segurança Pública: Função 06

## Estratégia de Implementação

1. **Fase 1 - Dados Federais**:
   - Implementar consultas usando a API do Portal da Transparência
   - Focar nos três setores principais usando os códigos de função
   - Criar visualizações macro e detalhadas

2. **Fase 2 - Dados Estaduais**:
   - Pesquisar e integrar APIs de portais de transparência estaduais
   - Começar com estados que possuem APIs bem documentadas
   - Padronizar os dados para permitir comparações

3. **Solução Alternativa**:
   - Para estados sem APIs disponíveis, considerar web scraping como último recurso
   - Ou utilizar dados consolidados de relatórios oficiais disponíveis em formato estruturado

## Próximos Passos

1. Mapear os códigos SIAFI completos para os setores e subfunções de interesse
2. Testar o endpoint de despesas por classificação funcional programática
3. Pesquisar APIs de transparência dos principais estados brasileiros
4. Definir estratégia de cache para otimizar o desempenho das consultas
5. Implementar a camada de abstração para unificar dados federais e estaduais

## Conclusão

A API do Portal da Transparência oferece dados robustos para o nível federal, mas para uma solução completa que inclua dados estaduais, será necessário integrar múltiplas fontes. O projeto EducaPúblico deverá implementar uma abordagem em fases, começando com dados federais e expandindo gradualmente para incluir dados estaduais à medida que as integrações forem desenvolvidas.
