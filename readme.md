<h1 align="center">
  Desafio Hvex
</h1>

<h3 align="center">
Nodejs, Sequelize, Docker e  Mysql
</h3>

<p align="center">Projeto realizado como desafio para a vaga de desenvolvedor junior.</p>

## 👨🏼‍💻 Autor

- [Junior Garcia](https://github.com/garciajunior)

## 🚀 Tecnologias

- Express — A web framework for Node.js
- Sequelize — SQL dialect ORM for Node.js
- MySql — Banco de dados relacional
- Handlebars - Template engine
- Portainer - Administração de containers

## ✋🏻 Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Docker](https://www.docker.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Sequelize](https://sequelize.org/)
- [Portainer](https://www.portainer.io/)

## 🔥 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta `cd git_repo`;
3. Rode `yarn` para instalar as dependências;
4. Altere as credencias dentro de `/src/config/database.js`;
5. Rode `docker-compose up` para subir o container do Mysql.
5. Rode `yarn sequelize db:create` para criar o banco de dados;
6. Rode `yarn sequelize db:migrate` para executar as migrations;
7. Rode `yarn start` para iniciar o servidor.

## ⚡️ Alterações no projeto

- O campo senha foi alterado sua quantidade de caracteres, pois houve necessidade de armazenar criptografado.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
