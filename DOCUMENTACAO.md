# EducaPúblico - Documentação do Projeto

## Visão Geral

O EducaPúblico é uma plataforma web que visa aumentar a educação política da população brasileira através da visualização simplificada de dados orçamentários nas áreas de Educação, Saúde e Segurança, em níveis federal e estadual (com expansão futura para municipal).

## Objetivos

- Criar uma plataforma web que simplifique e torne mais acessíveis os dados do Portal da Transparência
- Focar em três áreas prioritárias: Educação, Saúde e Segurança
- Apresentar dados em níveis Federal e Estadual (com expansão futura para Municipal)
- Mostrar a distribuição percentual de recursos entre esses três pilares
- Aumentar o engajamento cidadão e a educação política da população

## Requisitos Funcionais

1. **Visualização de dados**:
   - Gráficos comparativos de investimentos em Educação, Saúde e Segurança
   - Filtros por período (anual, por mandato) e por esfera (federal/estadual)
   - Indicadores percentuais de distribuição orçamentária

2. **Contextualização**:
   - Explicações sucintas sobre o significado dos dados
   - Comparativos com anos anteriores
   - Glossário simplificado de termos orçamentários

3. **Interatividade**:
   - Possibilidade de personalizar visualizações
   - Compartilhamento de dados em redes sociais
   - Exportação de informações em formatos simples

4. **Educação política**:
   - Seção "Como interpretar estes dados"
   - Explicações sobre o ciclo orçamentário
   - Dicas sobre como acompanhar e fiscalizar gastos públicos

5. **Contadores de Acesso**:
   - Contador de acessos totais à página
   - Contador de usuários únicos (baseado em IPs ou cookies)

6. **Acessibilidade**:
   - Paleta de cores acessível (contraste adequado, compatível com daltonismo)
   - Textos alternativos para todas as imagens e gráficos
   - Navegação completa por teclado
   - Legendas e descrições textuais para todos os gráficos
   - Design responsivo para diferentes dispositivos

7. **Internacionalização**:
   - Português do Brasil (idioma principal)
   - Inglês e Espanhol (idiomas alternativos)
   - Seletor de idiomas no cabeçalho

## Fontes de Dados

### Fontes Federais

- **Portal da Transparência do Governo Federal**
  - API REST: https://api.portaldatransparencia.gov.br/
  - Endpoints relevantes para despesas por órgão e classificação funcional programática

- **Portal de Dados Abertos**
  - URL: https://dados.gov.br/
  - Categorias relevantes: Educação, Saúde, Segurança Pública

### Fontes Estaduais

- **Portal de Dados Abertos de São Paulo**
- **Portal de Dados Abertos do Espírito Santo**
- Outros portais estaduais conforme disponibilidade

## Arquitetura Técnica

O EducaPúblico é desenvolvido como uma aplicação React, priorizando:

- **Componentização**: Facilita a criação de visualizações reutilizáveis
- **Performance**: Otimizada para renderização de gráficos e visualizações
- **Responsividade**: Design adaptável a diferentes dispositivos
- **Acessibilidade**: Seguindo diretrizes WCAG

### Estrutura de Diretórios

```
educapublico/
├── src/
│   ├── components/       # Componentes React
│   ├── services/         # Serviços de API
│   ├── hooks/            # Custom hooks
│   ├── contexts/         # Contextos React
│   ├── utils/            # Funções utilitárias
│   ├── pages/            # Páginas da aplicação
│   ├── locales/          # Arquivos de tradução
│   ├── assets/           # Recursos estáticos
│   └── styles/           # Estilos CSS
├── public/               # Arquivos públicos
└── docs/                 # Documentação
```

## Medidas de Segurança e Integridade de Dados

Para garantir a credibilidade da plataforma, implementamos:

1. **Fonte única da verdade**: Conexão direta com APIs oficiais
2. **Verificação de integridade**: Checksums para validação de dados
3. **Transparência na fonte**: Links diretos para fontes originais
4. **Logs de auditoria**: Registro detalhado de atualizações
5. **Dados imutáveis**: Impossibilidade de edição manual
6. **Atualizações automáticas**: Minimização de intervenção humana
7. **Documentação de metodologia**: Explicação clara dos processos

## Próximos Passos

### Fase 1: MVP (Produto Mínimo Viável)
- Implementar visualizações para dados federais
- Focar nas três áreas principais
- Criar visualizações básicas

### Fase 2: Expansão
- Adicionar dados estaduais
- Implementar comparativos entre estados
- Adicionar mais contexto e explicações

### Fase 3: Refinamento
- Adicionar dados municipais
- Implementar recursos avançados de análise
- Melhorar a experiência educativa

## Contribuição

O projeto é open-source e contribuições são bem-vindas. Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Envie um pull request

## Licença

Este projeto está licenciado sob a licença MIT.
