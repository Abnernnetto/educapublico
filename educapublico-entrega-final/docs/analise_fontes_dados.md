# Análise de Fontes de Dados para o EducaPúblico

## Fontes de Dados Populacionais

### API do IBGE
- **Endpoint principal**: `https://servicodados.ibge.gov.br/api/v3/agregados`
- **Dados disponíveis**: População por estado, faixa etária, sexo
- **Periodicidade**: Anual (com projeções até 2024)
- **Granularidade**: Nacional, Estadual, Municipal
- **Endpoint específico para população estadual**: 
  - `https://servicodados.ibge.gov.br/api/v3/agregados/4714/periodos/2024/variaveis?localidades=N3[all]`

## Fontes de Dados Orçamentários

### API do Portal da Transparência
- **URL Base**: `http://api.portaldatransparencia.gov.br`
- **Autenticação**: Requer cadastro para obter token
- **Limitações**: 90 requisições/minuto (6:00-23:59), 300 requisições/minuto (00:00-5:59)

#### Endpoints Relevantes:
- **Despesas por Função**: Permite filtrar por Educação (12), Saúde (10) e Segurança Pública (06)
- **Cobertura**: Principalmente dados federais, com limitações para dados estaduais

### Desafios para Dados Estaduais
- O Portal da Transparência federal foca principalmente em dados do governo federal
- Cada estado possui seu próprio portal de transparência com APIs diferentes
- Não existe uma API unificada para todos os estados brasileiros

## Estratégia de Implementação

### Fase 1: Dados Federais
- Implementar visualizações usando a API do Portal da Transparência federal
- Focar nos três setores: Educação, Saúde e Segurança
- Mostrar distribuição percentual entre os setores

### Fase 2: Dados Estaduais
- Implementar integração com portais estaduais selecionados (começando por SP, RJ, MG)
- Criar camada de abstração para padronizar dados de diferentes fontes
- Expandir gradualmente para outros estados

### Alternativas para Estados sem API
- Utilizar dados abertos em formato de planilha quando disponíveis
- Implementar scraping controlado para portais sem API
- Manter registro da data de atualização para transparência

## Próximos Passos
1. Cadastrar no Portal da Transparência para obter token de API
2. Testar endpoints específicos para confirmar formato e disponibilidade dos dados
3. Desenvolver protótipos de visualização com dados reais federais
4. Mapear APIs estaduais disponíveis, começando pelos estados mais populosos
