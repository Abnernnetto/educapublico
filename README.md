<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
# README.md - EducaPúblico

## Sobre o Projeto

O EducaPúblico é uma plataforma web que visa aumentar a educação política da população brasileira através da visualização simplificada de dados orçamentários nas áreas de Educação, Saúde e Segurança, em níveis federal e estadual.

![Logo do EducaPúblico](./screenshots/prototipo_homepage.png)

## Características Principais

- **Visualização simplificada** de dados orçamentários governamentais
- **Foco em três áreas prioritárias**: Educação, Saúde e Segurança
- **Múltiplos níveis de governo**: Federal e Estadual (com expansão futura para Municipal)
- **Suporte a múltiplos idiomas**: Português do Brasil (principal), Inglês e Espanhol
- **Contadores de acesso**: Total de visitas e usuários únicos
- **Design acessível**: Seguindo diretrizes WCAG para acessibilidade web
- **Segurança de dados**: Garantia de integridade das informações apresentadas

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Visualização de Dados**: Recharts
- **Internacionalização**: i18next
- **Hospedagem**: GitHub Pages

## Começando

Para instruções detalhadas sobre como instalar e implantar o projeto, consulte o arquivo [INSTALACAO.md](./INSTALACAO.md).

Para entender a arquitetura e os requisitos do projeto, consulte a [DOCUMENTACAO.md](./DOCUMENTACAO.md).

## Capturas de Tela

### Página Inicial
![Página Inicial](./screenshots/prototipo_homepage.png)

### Comparativo entre Áreas
![Comparativo](./screenshots/prototipo_comparativo.png)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Abner Netto - [GitHub](https://github.com/Abnernnetto)
>>>>>>> d3df0c5856c8dbb3da71ca6e9378aac0cd29d65c
