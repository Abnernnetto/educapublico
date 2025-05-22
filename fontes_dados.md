# Fontes de Dados para o Projeto EducaPúblico

## Fontes Federais

### Portal da Transparência do Governo Federal
- **API REST**: https://api.portaldatransparencia.gov.br/
- **Endpoints relevantes**:
  - `/api-de-dados/despesas/por-orgao`: Consulta despesas por órgão do Poder Executivo Federal
  - `/api-de-dados/despesas/por-funcional-programatica`: Consulta despesas pela classificação funcional programática (inclui funções como Educação, Saúde e Segurança)
  - `/api-de-dados/despesas/documentos`: Consulta documentos de despesas
  - `/api-de-dados/emendas`: Consulta emendas parlamentares
- **Autenticação**: Requer cadastro de e-mail para obtenção de token
- **Limitações**: 90 requisições por minuto (6:00-23:59) e 300 requisições por minuto (00:00-5:59)

### Portal de Dados Abertos
- **URL**: https://dados.gov.br/
- **Categorias relevantes**: Educação, Saúde, Segurança Pública
- **Formatos disponíveis**: CSV, JSON, XML (varia por conjunto de dados)
- **APIs**: Disponíveis para alguns conjuntos de dados

## Fontes Estaduais

### Portal de Dados Abertos de São Paulo
- **URL**: https://dadosabertos.sp.gov.br/
- **Cobertura**: Dados econômicos, sociais, saúde e educação do estado de SP

### Portal de Dados Abertos do Espírito Santo
- **URL**: https://dados.es.gov.br/
- **Organizações relevantes**: SEDU (Secretaria de Estado da Educação)

### Outros portais estaduais
- Cada estado possui seu próprio portal de transparência com diferentes níveis de detalhamento e APIs

## Limitações Identificadas

1. **Heterogeneidade de formatos**: Diferentes portais usam diferentes formatos e estruturas
2. **Cobertura desigual**: Alguns estados oferecem mais dados abertos que outros
3. **Granularidade variável**: Nem todos os portais permitem filtrar por áreas específicas (Educação, Saúde, Segurança)
4. **Atualização**: Frequência de atualização varia entre fontes
5. **Acesso programático**: Nem todos os portais oferecem APIs, alguns apenas downloads de arquivos

## Estratégia de Integração

Para o projeto EducaPúblico, recomenda-se:

1. **Priorizar dados federais**: Começar com a API do Portal da Transparência Federal
2. **Complementar com dados estaduais**: Adicionar dados de estados com melhor estrutura de dados abertos
3. **Padronização**: Criar camada de abstração para uniformizar dados de diferentes fontes
4. **Cache local**: Armazenar dados processados para reduzir chamadas às APIs e melhorar performance
5. **Documentação clara**: Informar ao usuário a fonte, data e limitações dos dados apresentados

## Próximos Passos

1. Definir estrutura de dados unificada para as três áreas (Educação, Saúde, Segurança)
2. Implementar conectores para as principais APIs
3. Criar visualizações que funcionem mesmo com dados parciais
4. Estabelecer política de atualização e cache
