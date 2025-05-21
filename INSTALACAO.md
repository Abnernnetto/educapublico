# Guia de Instalação e Implantação do EducaPúblico

Este guia fornece instruções detalhadas para subir o projeto EducaPúblico em seu repositório GitHub e configurar o GitHub Pages para hospedagem.

## Pré-requisitos

- Conta GitHub (você já possui: https://github.com/Abnernnetto)
- Git instalado em seu computador local
- Node.js e npm instalados (para desenvolvimento local)

## Passo 1: Baixar o Pacote do Projeto

1. Baixe o arquivo ZIP do projeto que foi enviado a você
2. Descompacte o arquivo em uma pasta local em seu computador

## Passo 2: Inicializar um Repositório Git Local

1. Abra um terminal ou prompt de comando
2. Navegue até a pasta do projeto descompactado
3. Execute os seguintes comandos:

```bash
git init
git add .
git commit -m "Versão inicial do EducaPúblico"
```

## Passo 3: Criar um Novo Repositório no GitHub

1. Acesse sua conta GitHub: https://github.com/Abnernnetto
2. Clique no botão "New" para criar um novo repositório
3. Nomeie o repositório como "educapublico" (ou outro nome de sua preferência)
4. Deixe a opção "Initialize this repository with a README" desmarcada
5. Clique em "Create repository"

## Passo 4: Conectar e Enviar para o Repositório Remoto

Após criar o repositório, o GitHub mostrará instruções. Execute os comandos para um repositório existente:

```bash
git remote add origin https://github.com/Abnernnetto/educapublico.git
git branch -M main
git push -u origin main
```

## Passo 5: Configurar o GitHub Pages

1. No GitHub, acesse o repositório que você acabou de criar
2. Vá para "Settings" (aba de configurações)
3. Role para baixo até encontrar a seção "GitHub Pages"
4. Em "Source", selecione "main" como branch e "/docs" como pasta (ou "/(root)" se preferir usar a raiz)
5. Clique em "Save"

Após alguns minutos, seu site estará disponível em: https://abnernnetto.github.io/educapublico/

## Passo 6: Verificar a Implantação

1. Acesse a URL fornecida pelo GitHub Pages
2. Verifique se todas as páginas e funcionalidades estão funcionando corretamente
3. Teste em diferentes dispositivos para garantir a responsividade

## Desenvolvimento Futuro

Para continuar o desenvolvimento do projeto:

1. Clone o repositório em seu ambiente local:
   ```bash
   git clone https://github.com/Abnernnetto/educapublico.git
   ```

2. Instale as dependências:
   ```bash
   cd educapublico
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Após fazer alterações, envie-as para o GitHub:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push
   ```

## Suporte a Múltiplos Idiomas

O projeto está configurado para suportar três idiomas:

- Português do Brasil (padrão)
- Inglês
- Espanhol

Para adicionar ou modificar traduções, edite os arquivos na pasta `/src/locales/`.

## Contadores de Acesso

Os contadores de acesso estão implementados usando localStorage para usuários únicos e um contador global armazenado em um arquivo JSON. Para visualizar as estatísticas de acesso, acesse a rota `/admin/stats` (protegida por senha).

## Contato e Suporte

Se precisar de ajuda adicional com a implantação ou desenvolvimento, entre em contato através do GitHub ou por e-mail.
