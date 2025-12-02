# crud-movies

Esse projeto foi inspirado no site da Imagem Filmes: https://www.imagemfilmes.com.br

## Extensões Utilizadas

- Dracula Theme Official (Dracula Theme)
- ESLint (Microsoft)
- Live Server (Ritwick Dey)
- Markdown All in One (Yu Zhang)
- Material Icon Theme (Philipp Kief)
- PostCSS Language Support (csstools)
- Prettier - Code formatter (Prettier)
- REST Client (Huachao Mao)
- Tailwind CSS IntelliSense (Tailwind Labs)
- Thunder Client (Thunder Client)

## Comandos

### Criação do Projeto
- cd %UserProfile%
- cd Desktop
- mkdir myproject
- cd myproject
- code .

### Configuração Inicial do Projeto (package.json)
- echo {} > package.json
- npm init 
- npm init -y

### Instalar uma Nova Dependência (json-server)
- npm install --save json-server
- npm install json-server
- npm i json-server

### Instalar Todas Dependências do Projeto
- npm install
- npm i

### Executar o json-server, http-server e Tailwind
- npx json-server --watch db.json --port 3000
- npx http-server ./src --port 8080 -o
- npx tailwindcss -i ./src/css/tailwind.css -o ./src/css/style.css --watch
- npm run backend
- npm run frontend
- npm run tailwind

### Finalizar uma Tarefa (Task Kill)
- netstat -ano | findstr :3000
- taskkill /PID 2660 /F

### Configuração Inicial do Git
- git config --global user.name "Meu Nome"
- git config --global user.email "meu@email"

### Remover as credenciais do Git
- cmdkey /list
- cmdkey /delete:git:https://github.com