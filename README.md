# Detalhe do desafio
Neste desafio foi desenvolvido uma implementação de cadasttro de gerenciamento de tarefas utilizando Nodejs , express, sequelize e sqlite.

# Comandos instalação do backend
-  npm i para instalar todas depedencias do projeto.

# Comandos docker para criação da imagem e buildar
- docker build -t gerenciamento-tarefas .

# Comandos docker para subir container.
- docker run -d -p 3000:3000 --name gerenciamento-tarefas-container gerenciamento-tarefas
- Depois realizar o acesso via web ou via postman: localhost:3000/tasks
- Acessar a interface do swagger: localhost:3000/api-docs

