# Documentação Final - EducaPúblico

## Visão Geral do Projeto

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

## Arquitetura Técnica

### Frontend
- Desenvolvido com React e TypeScript
- Visualizações de dados com Chart.js
- Estilização com CSS moderno e responsivo
- Suporte a múltiplos idiomas

### Backend
- Sistema de extração de dados das APIs oficiais
- Mecanismo de cache para otimização de desempenho
- Fallback para dados simulados quando necessário

### Fontes de Dados
- API do IBGE para dados populacionais
- API do Portal da Transparência para dados orçamentários federais
- APIs estaduais para dados orçamentários estaduais (implementação progressiva)

## Guia de Instalação e Execução

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

### Implantação
- O projeto está configurado para implantação no GitHub Pages
- Após o build, o conteúdo da pasta `dist` pode ser publicado

## Estrutura de Arquivos

```
educapublico/
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── components/       # Componentes React reutilizáveis
│   ├── data/             # Dados estáticos e simulados
│   ├── services/         # Serviços de API e processamento de dados
│   ├── utils/            # Funções utilitárias
│   ├── App.tsx           # Componente principal
│   ├── visualizacoes.jsx # Componentes de visualização
│   └── index.tsx         # Ponto de entrada
├── public/               # Arquivos públicos
├── docs/                 # Documentação
│   ├── wireframes/       # Wireframes e protótipos
│   └── api_integracao.md # Documentação de integração com APIs
└── package.json          # Dependências e scripts
```

## Manutenção e Atualização

### Atualização de Dados
- Os dados são atualizados automaticamente a partir das APIs oficiais
- O sistema de cache evita requisições desnecessárias
- Para forçar uma atualização, limpe a pasta `cache`

### Adição de Novos Estados
- Todos os estados já estão incluídos no sistema
- Para adicionar dados reais de novos estados, implemente a integração com a API estadual correspondente

### Expansão de Funcionalidades
- O código está estruturado de forma modular para facilitar expansões
- Novos setores podem ser adicionados seguindo o padrão existente
- Novas visualizações podem ser implementadas no componente de visualizações

## Considerações de Segurança

Para garantir a integridade dos dados apresentados, o EducaPúblico implementa:

1. **Fonte única da verdade**: Conexão direta com APIs oficiais do governo
2. **Verificação de integridade**: Checksums para garantir que os dados não foram alterados
3. **Transparência nas fontes**: Links diretos para as fontes originais
4. **Logs de auditoria**: Registro detalhado de todas as atualizações
5. **Dados imutáveis**: Impossibilidade de edição manual após importação
6. **Atualizações automáticas**: Minimização da intervenção humana
7. **Documentação clara**: Explicação detalhada de toda a metodologia

## Próximos Passos

### Fase 1 (Atual)
- Implementação completa com dados federais
- Dados estaduais simulados para todos os estados

### Fase 2 (Planejada)
- Integração com APIs estaduais específicas
- Expansão das visualizações detalhadas
- Implementação de comparativos históricos

### Fase 3 (Futura)
- Expansão para nível municipal
- Adição de mais setores além dos três principais
- Implementação de recursos de compartilhamento social

## Contato e Suporte

Para questões relacionadas ao projeto, entre em contato através do GitHub ou pelo e-mail de suporte.

---

Documentação gerada em: Maio de 2025
