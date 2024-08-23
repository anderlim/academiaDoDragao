# Academia do Dragão

Bem-vindo ao repositório da **Academia do Dragão**, um projeto desenvolvido como parte do Trabalho de Conclusão de Curso (TCC). Este site tem como objetivo ajudar novos jogadores a entenderem e se familiarizarem com os conceitos básicos de RPGs, fornecendo um ambiente amigável e acessível.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)
- [Contato](#contato)

## Descrição do Projeto

A **Academia do Dragão** é uma plataforma web que oferece um guia e acessível para quem deseja aprender a jogar RPG. O site aborda conceitos básicos, dicas de criação de personagens, mecânicas de jogo e outras informações úteis para novos jogadores.

## Funcionalidades

- **Guias:** Explicações detalhadas sobre as regras básicas de RPG.
- **Calculadora de dados:** Ferramenta para rolagem de dados de rpg, incluindo histórico de rolagem.
- **Fórum interativo:**Ferramenta para os jogadores postarem dúvidas, ajudarem outros jogadores, ajudar outros mestres, postar histórias de aventura ou personagens.

## Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript, React.
- **Back-end:** Node.js, JavaScript.
- **Banco de Dados:** MongoDB
- **Outras Ferramentas:** Git, Visual Studio code.

## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/rpg-para-iniciantes.git](https://github.com/anderlim/academiaDoDragao.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd academiaDoDragao
   ```
<!-- 3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
     ```
     DATABASE_URL=sua-url-do-banco-de-dados
     PORT=3000
     ```
5. Inicie o servidor:
   ```bash
   npm start
   ``` -->

## Como Contribuir

Se você quiser contribuir para este projeto, siga os passos abaixo:

1. Faça um fork deste repositório.
2. Crie uma nova branch com a sua funcionalidade ou correção:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Faça as alterações necessárias e commit-as:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie para o repositório original:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Abra um Pull Request para que possamos revisar suas alterações.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para mais informações, você pode entrar em contato pelo e-mail: anderson19lim@gmail.com

##Abaixo está como iniciar o fórum em sua máquina pessoal
# Forum App

A simple forum app. This is my first foray into full-stack web development using the MERN stack, as part of my full stack course, FullStackOpen. By the way, it's such a great course for anybody who knows the basics of HTML, CSS and JavaScript.

## Features

- CRUD functionality of posts (both frontend and backend)
- Like and comment functionality
- User authentication using JSON Web Token
- Clean and usable UI

## Stack and Frameworks used

### Frontend

<img src="https://www.svgrepo.com/show/354259/react.svg"  width="40px" alt="ReactJS"> <img src="https://www.svgrepo.com/show/354274/redux.svg"  width="40px" alt="Redux"> <img src="https://www.svgrepo.com/show/354262/react-router.svg"  width="40px" alt="React-Router"> <img src="https://www.svgrepo.com/show/374118/tailwind.svg"  width="40px" alt="Tailwind CSS">

### Backend

<img src="https://www.svgrepo.com/show/354118/nodejs.svg" class="ml-2" width="40px" alt="NodeJS"> <img src="https://www.svgrepo.com/show/373845/mongo.svg" class="ml-2" width="40px" alt="MongoDB">

### Testing

<img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-svg-vector.svg" class="ml-2" width="40px" alt="Jest"> <img src="https://miro.medium.com/max/364/0*JAWNOBEDxJLXxHUj.png" class="ml-2" width="40px" alt="Cypress">

## Screenshots

<img src='https://raw.githubusercontent.com/xxdydx/forum-app/main/images/blogList.png' width='800' height='467'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/blogView.png' width='800' height='467'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/commenting.png' width='800' height='436'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/createPost.png' width='800'>

## Installing this project locally
It's an easy process. 
1. Install NodeJS and the NPM package manager.
2. Get your own MongoDB database (you can get one for free at MongoDB Atlas or you can set up one locally)
3. Clone this git repository
4. `cd back`
5. Set your MongoDB database link and port (3003 by default) variables under the .env file
6. `npm install`
7. `npm start`

There you go! Hopefully I find time to make a Dockerfile for this lol.


## Upcoming Features

- Fix up some user interfaces (I have trouble with CSS :/)
- Dockerfile and automated CI/CD
- Markdown support for posts
- Abilty to like and unlike posts (user-unique likes, it's currently anonymous now)
- Nested commenting features (quite lazy to do tbh)
- Better and more secure user authentication
