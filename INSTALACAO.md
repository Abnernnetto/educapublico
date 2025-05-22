# Guia de Instalação e Atualização do EducaPúblico

Este guia fornece instruções detalhadas para instalar e atualizar o projeto EducaPúblico em seu repositório GitHub.

## Pré-requisitos

- Conta no GitHub (você já possui: https://github.com/Abnernnetto)
- Git instalado em sua máquina local
- Node.js (versão 16 ou superior) e npm instalados

## Atualização do Repositório Existente

Se você já possui o repositório EducaPúblico em seu GitHub e deseja atualizá-lo com esta nova versão:

1. Clone seu repositório existente (se ainda não tiver feito):
   ```bash
   git clone https://github.com/Abnernnetto/educapublico.git
   cd educapublico
   ```

2. Extraia os arquivos do pacote `educapublico-entrega-final.zip` para uma pasta temporária

3. Copie os arquivos extraídos para seu repositório local:
   ```bash
   cp -r /caminho/para/pasta/temporaria/* /caminho/para/seu/repositorio/
   ```

4. Adicione as alterações ao Git:
   ```bash
   git add .
   ```

5. Faça o commit das alterações:
   ```bash
   git commit -m "Atualização com novas funcionalidades: ranking de estados, estatísticas nacionais e contadores destacados"
   ```

6. Envie as alterações para o GitHub:
   ```bash
   git push origin main
   ```

## Criação de Novo Repositório

Se preferir criar um novo repositório para o EducaPúblico:

1. Acesse https://github.com/new

2. Preencha o nome do repositório (ex: "educapublico")

3. Escolha a visibilidade (público ou privado)

4. Clique em "Create repository"

5. Siga as instruções para inicializar o repositório localmente:
   ```bash
   git clone https://github.com/Abnernnetto/educapublico.git
   cd educapublico
   ```

6. Extraia os arquivos do pacote `educapublico-entrega-final.zip` para o diretório do repositório

7. Adicione, faça commit e envie os arquivos:
   ```bash
   git add .
   git commit -m "Versão inicial do EducaPúblico"
   git push -u origin main
   ```

## Configuração do GitHub Pages

Para publicar o site usando GitHub Pages:

1. Acesse as configurações do seu repositório no GitHub

2. Navegue até a seção "Pages"

3. Em "Source", selecione a branch principal (main ou master)

4. Em "Folder", selecione "/docs" ou "/dist" (dependendo da estrutura do seu build)

5. Clique em "Save"

6. Aguarde alguns minutos para que o site seja publicado

7. O URL do seu site será exibido na seção Pages (geralmente no formato https://abnernnetto.github.io/educapublico/)

## Execução Local

Para executar o projeto localmente:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse http://localhost:5173 (ou a porta indicada no terminal)

## Construção para Produção

Para gerar os arquivos de produção:

1. Execute o comando de build:
   ```bash
   npm run build
   ```

2. Os arquivos serão gerados na pasta `dist`

3. Estes arquivos podem ser hospedados em qualquer servidor web estático

## Solução de Problemas

Se encontrar erros relacionados a conflitos de merge (como `<<<<<<< HEAD`):

1. Abra o arquivo indicado no erro
2. Remova os marcadores de conflito (`<<<<<<< HEAD`, `=======`, `>>>>>>> [identificador]`)
3. Salve o arquivo e tente novamente

Para outros problemas, consulte a documentação completa ou entre em contato para suporte.
