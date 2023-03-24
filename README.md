# My_First_API

![download (1)](https://user-images.githubusercontent.com/107224769/227101504-573500f1-e712-424b-bd1e-345c41ff9fd9.png)

![Badge Finalizado](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge)

Este é um projeto que representa minha primeira experiência com APIs. Utilizando a Tecnologia Node.js, 
desenvolvi um CRUD completo para cadastro de jogos, com um banco de dados Workbench integrado, que permite a 
realização de operações de criação, leitura, atualização e exclusão de dados. Além disso, o sistema conta com uma camada
extra de segurança através do uso de autenticação JWT 
(JSON Web Tokens), garantindo que somente usuários cadastrados no sistema tenham acesso à lista de jogos cadastrados.

## :white_check_mark: Tecnologias Utilizadas

- Node.js
- Express

## :point_right: Como Fazer as requisições

1. Utilizar alguma plataforma de requisições API
2. Retornar lista de jogos - *Get*
```
/games
```
3.Retornar Usuário - *Post*
```
/auth
```
4. Retornar um game pelo id - *Get*
```
/game/:id
```
5. Criando um novo Game - *Post*
```
/game
```
6. Criando um Novo Usuário - *Post*
```
/user
```
7. Deletando um Game - *Delete*
```
/game/:id 
```
8. Editando um Game - *Put*
```
/game/:id
```
