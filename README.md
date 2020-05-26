<h1 align="center">ProCear</h1>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/PauloDavi/proCear?color=gree">
  <img alt="Linguagem principal" src="https://img.shields.io/github/languages/top/PauloDavi/proCear">
  <img alt="License" src="https://img.shields.io/github/license/PauloDavi/proCear">
  <img alt="Stargazers" src="https://img.shields.io/github/stars/PauloDavi/proCear?style=social">
</p>

<p align="center">
  <a href="#como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>
</p>

# :zap: goBarbar
É uma aplicação para a administração conjunta da reitoria do curso de engenharia elétrica a UFPB

## Como usar
**Clone o repositorio e execute os segintes comandos para instalar os pacotes necessários**
```
cd backend
yarn install
cd ..
cd frintend
yarn install
cd ..
cd mobile
yarn install

``` 

**Para executar o backend execute na raiz**
```
cd backend
yarn dev

``` 
O backend por padrão vai executar no `http://localhost:3333`, para executar não exqueça de configurar o arquivo .env a partir do .env.example com os dados da sua aplicação e do seu banco de dados

**Para executar o frontend execute na raiz**
```
cd backend
yarn start

``` 
O frontend por padrão vai executar no `http://localhost:3000`, ele deve abrir altomaticamente no seu navegador padrão quando excutar os comando acima

## Funcionalidades
- Cadastro de clientes, com e sem permisão de administrador
- Edição de cadastro
- Ciação de Posts
- Ciação de Projetos
- Votação nos projetos preferidos dos clientes
- Criação de susjestões
- Aviso das susjestões por email
- Listagem dos items sitados acima com filtros
