# telegram-bot-vue

## Tabela de Conteúdo
- [Overview](#overview)
  - [Ferramentas](#ferramentas-utilizadas)
  - [Screenshot](#screenshot)  
- [Documentação](#documentação)
  - [Instalação](#instalação)

## Overview

Uma aplicação WEB criada com o framework Vue.js com objetivo de gerenciar e manipuar um bot do Telegram através do consumo de uma API REST realizadas por requisições HTTP utilizando Axios. Essa aplicação WEB é utilizada como uma interface de usuário, realizando as funções da aplicação sem necessidade de linha de comando ou outros meios complexos.

Essa aplicação foi criada em conjunto com um API REST desenvolvida em Node.js que pode ser encontrada no seguinte repositório: <a href="https://github.com/mateusmdev/telegram-bot-api" >Telegram Bot API</a>

Um resumo do projeto:
<ul>
  <li>Listagens do Chat com os dados de seus respectivos usuários e suas mensagens, apresentando de forma amigável</li>
  <li>Um chat que recebe e envia mensagens direto para o telegram do usuário interceptado e realizado através do bot</li>
  <li>Mensagens do chat na aplicação Vue são atualizadas em tempo real</li>
  <li>Realiza requisições HTTP a uma API REST utilizando Axios</li>
  <li>Permite autenticação do Admin através de login com usuário e senha</li>
  <li>Autenticação utilizando JWT</li>
  <li>Consome dados do Firebase (Firestore) direto para o Vue, recuperando os dados salvos</li>

### Ferramentas utilizadas
<ul>
  <li>Vue.js</li>
  <li>Javascript</li>
  <li>Node.js</li>
  <li>Axios</li>
  <li>Firebase (Firestore)</li>
  <li>JWT Decode</li>
  <li>NPM (Gerenciador de dependências)</li>
</ul>

## Screenshot

<img src="./img-readme/3.png" />

## Documentação

### Instalação

Após clonar o repositório, faça os passos abaixo para completar a instalação do projeto:

Entre dentro do diretório clonado do projeto, abra o terminal e execute o comando abaixo para baixar as dependências necessárias.


```sh
npm install
```

#### Executar em Desenvolvimento

```sh
npm run dev
```


#### Compilar e Minificar para a Produção

```sh
npm run build
```

</br>
