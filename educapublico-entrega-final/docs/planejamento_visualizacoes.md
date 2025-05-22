# Planejamento de Visualizações para o EducaPúblico

## 1. Ranking Comparativo entre Estados

### Visualização por Setor (Educação, Saúde, Segurança)
- **Tipo de Gráfico**: Barras horizontais ordenadas por valor
- **Dados Exibidos**: 
  - Valor absoluto investido por estado em cada setor
  - Percentual em relação ao orçamento total do estado
  - Valor per capita (investimento dividido pela população do estado)
- **Filtros**:
  - Ano (últimos 5 anos disponíveis)
  - Setor (Educação, Saúde, Segurança)
  - Métrica (Valor absoluto, Percentual, Per capita)
  - Região do Brasil (opcional)
- **Interatividade**:
  - Ordenação dinâmica (crescente/decrescente)
  - Tooltip detalhado ao passar o mouse
  - Opção para destacar estado específico

### Visualização Comparativa dos Três Setores
- **Tipo de Gráfico**: Gráfico de radar ou treemap
- **Dados Exibidos**:
  - Distribuição percentual entre os três setores por estado
  - Comparação com média nacional
- **Filtros**:
  - Ano (últimos 5 anos disponíveis)
  - Estados selecionados (até 5 simultaneamente)
- **Interatividade**:
  - Seleção múltipla de estados para comparação
  - Animação de evolução temporal

## 2. Painel de Estatísticas Nacionais

### Estatísticas de Acesso ao Portal da Transparência
- **Tipo de Visualização**: Cards informativos + gráfico de pizza
- **Dados Exibidos**:
  - População total do Brasil (212,6 milhões)
  - Usuários de internet (159 milhões - 74,8% da população)
  - Acessos ao Portal da Transparência (17,7 milhões - 8,33% da população)
  - Percentual de usuários de internet que acessam o Portal (11,13%)
- **Interatividade**:
  - Alternância entre valores absolutos e percentuais
  - Infográfico explicativo sobre a importância da transparência

### Evolução Temporal de Acessos
- **Tipo de Gráfico**: Linha temporal
- **Dados Exibidos**:
  - Evolução anual de acessos ao Portal da Transparência
  - Eventos importantes relacionados à transparência pública
- **Interatividade**:
  - Zoom em períodos específicos
  - Marcadores de eventos importantes

## 3. Contadores de Acesso Destacados

### Contador de Acessos Totais
- **Localização**: Topo da página, área de destaque
- **Visualização**: Número com animação de incremento
- **Dados**: Total de visualizações da página desde o lançamento

### Contador de Usuários Únicos
- **Localização**: Ao lado do contador de acessos totais
- **Visualização**: Número com animação de incremento
- **Dados**: Total de visitantes únicos (baseado em IPs/cookies)

### Contador de Acessos Atuais
- **Localização**: Área de destaque secundária
- **Visualização**: Número com atualização em tempo real
- **Dados**: Usuários ativos no momento

## 4. Considerações Técnicas

### Implementação Progressiva
- Fase 1: Visualizações com dados federais completos
- Fase 2: Incorporação gradual de dados estaduais

### Acessibilidade
- Paletas de cores acessíveis para daltônicos
- Textos alternativos para todas as visualizações
- Navegação por teclado para todas as interações

### Performance
- Carregamento assíncrono de dados
- Cache local para reduzir requisições à API
- Paginação para grandes volumes de dados

### Responsividade
- Adaptação das visualizações para dispositivos móveis
- Simplificação de gráficos complexos em telas pequenas
- Priorização de informações essenciais em cada breakpoint
