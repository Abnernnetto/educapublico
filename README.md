# EducaPúblico

## Visão Geral

O EducaPúblico é uma plataforma web interativa desenvolvida para aumentar a educação política da população brasileira, fornecendo visualizações claras e acessíveis sobre como os recursos públicos são distribuídos entre os setores de Educação, Saúde e Segurança nos níveis federal e estadual.

## Funcionalidades Principais

### 1. Ranking Comparativo entre Estados
- Visualização ordenada dos estados por volume de investimento em cada setor
- Opções para visualizar valores absolutos, per capita ou percentuais
- Gráficos interativos com informações detalhadas

### 2. Painel de Estatísticas Nacionais
- Dados sobre população total do Brasil (212,6 milhões)
- Informações sobre usuários de internet (159 milhões - 74,8% da população)
- Estatísticas de acesso ao Portal da Transparência (17,7 milhões - 8,33% da população)
- Gráfico de pizza mostrando a proporção desses números

### 3. Contadores de Acesso Destacados
- Contador de acessos totais com animação
- Contador de usuários únicos
- Contador de usuários ativos no momento

### 4. Fluxo Interativo Completo
- Seleção de nível (Federal/Estadual)
- Escolha do estado (quando Estadual for selecionado)
- Seleção do tipo de visualização (Macro/Detalhada por setor)
- Filtros por ano e tipo de métrica

### 5. Recursos Adicionais
- Suporte completo a múltiplos idiomas (Português, Inglês e Espanhol)
- Seção "Sobre" explicando o propósito do projeto
- Lista de estados em ordem alfabética
- Dados para todos os estados brasileiros

## Instalação e Execução

### Requisitos
- Node.js 16+ e npm/yarn
- Navegador moderno com suporte a ES6

### Instalação
1. Clone o repositório: `git clone https://github.com/seu-usuario/educapublico.git`
2. Instale as dependências: `npm install` ou `yarn install`
3. Configure as variáveis de ambiente (opcional)

### Execução
- Desenvolvimento: `npm run dev` ou `yarn dev`
- Produção: `npm run build` ou `yarn build`

### Implantação no GitHub Pages
1. Execute o comando de build: `npm run build`
2. Configure o GitHub Pages para servir a partir da pasta `dist`
3. Ou use a ação automática do GitHub Actions (incluída no repositório)

## Estrutura do Projeto

```
educapublico/
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── components/       # Componentes React reutilizáveis
│   ├── data/             # Dados estáticos e simulados
│   ├── services/         # Serviços de API e processamento de dados
│   ├── utils/            # Funções utilitárias
│   ├── App_final.jsx     # Componente principal
│   ├── visualizacoes.jsx # Componentes de visualização
│   └── extracao_dados.py # Script para extração de dados
├── docs/                 # Documentação
│   ├── wireframes/       # Wireframes e protótipos
│   └── api_integracao.md # Documentação de integração com APIs
└── DOCUMENTACAO_FINAL.md # Documentação detalhada do projeto
```

## Próximos Passos

### Fase 1 (Atual)
- Implementação completa com dados federais
- Dados estaduais simulados para todos os estados

### Fase 2 (Planejada)
- Integração com APIs estaduais específicas
- Expansão das visualizações detalhadas
- Implementação de comparativos históricos

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
