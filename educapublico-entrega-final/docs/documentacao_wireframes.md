# Documentação de Wireframes e Fluxos - EducaPúblico

Este documento apresenta os wireframes e fluxos de interação para as novas funcionalidades avançadas do EducaPúblico, conforme solicitado pelo usuário.

## Wireframes Principais

### 1. Ranking Comparativo entre Estados
![Ranking Comparativo](/home/ubuntu/educapublico/docs/wireframes/ranking_estados.png)

Este wireframe mostra a visualização de ranking comparativo entre estados brasileiros, com:
- Filtros para ano, setor (Educação, Saúde, Segurança) e tipo de visualização (valor absoluto, percentual, per capita)
- Gráfico de barras horizontais ordenado por valor
- Estados em ordem decrescente de investimento

### 2. Painel de Estatísticas Nacionais
![Estatísticas Nacionais](/home/ubuntu/educapublico/docs/wireframes/estatisticas_nacionais.png)

Este wireframe apresenta o painel de estatísticas nacionais sobre acesso ao Portal da Transparência, incluindo:
- População total do Brasil (212,6 milhões)
- Usuários de internet (159 milhões - 74,8% da população)
- Acessos ao Portal da Transparência (17,7 milhões - 8,33% da população)
- Gráfico de pizza mostrando a proporção desses números

### 3. Contadores de Acesso Destacados
![Contadores de Acesso](/home/ubuntu/educapublico/docs/wireframes/contadores_acesso.png)

Este wireframe mostra os contadores de acesso destacados no topo da página:
- Contador de acessos totais (1.245.678 visualizações)
- Contador de usuários únicos (358.921 visitantes)
- Contador de usuários ativos no momento (127 pessoas navegando)

### 4. Fluxo Interativo de Seleção de Dados
![Fluxo Interativo](/home/ubuntu/educapublico/docs/wireframes/fluxo_interativo.png)

Este wireframe ilustra o fluxo completo de interação do usuário:
1. Seleção inicial de nível (Federal/Estadual)
2. Se Estadual for selecionado, escolha do estado
3. Seleção do tipo de visualização (Macro/Detalhada por setor)
4. Exibição dos resultados com visualização de dados

## Considerações de Design

### Acessibilidade
- Todos os wireframes seguem princípios de design acessível
- Alto contraste entre texto e fundo
- Elementos interativos claramente identificáveis
- Estrutura hierárquica clara para leitores de tela

### Responsividade
- Os layouts serão adaptados para diferentes tamanhos de tela
- Em dispositivos móveis, os gráficos serão simplificados
- Menus colapsáveis em telas menores

### Interatividade
- Todos os gráficos terão tooltips detalhados
- Opções de ordenação e filtragem dinâmicas
- Animações sutis para melhorar a experiência do usuário

## Próximos Passos

Com base nestes wireframes, a próxima etapa será implementar a extração e atualização automática de dados reais, seguida pelo desenvolvimento das visualizações comparativas e painéis de estatísticas conforme planejado.
