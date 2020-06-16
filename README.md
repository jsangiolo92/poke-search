# Poke-Search
https://poke-search.io

"Are there any Pokemon who can learn Giga-Drain, Surf, and Cut? I'm playing Fire-Red." This is the question a friend asked rhetorically that spawned Poke-Search - a tool for searching Pokemon by moves across generations.

## Project Outline

### Tech Stack
React Hooks & Context w/ TypeScript on the frontend  
Express.js server w/ Typescript on the backend  
Redis cache to store Pokemon & Moves data  

### Deployment Stack
React App, Express server, and Redis cache deployed in a Docker Network  
Nginx used as a reverse proxy  
Deployed in an EC2 instance  

### Diagram
![Alt text](/architecture.png?raw=true "Project Diagram")

### Resources that helped along the way
[The Pokemon API](https://pokeapi.co/)  
[André Ilhicas dos Santos's guide on using Let's Encrypt w/ Docker](https://ilhicas.com/2019/03/02/Nginx-Letsencrypt-Docker.html)  
[Mozilla reference for SSL Nginx confg](https://ssl-config.mozilla.org/)  
[John Sorrentino's incredible favicon.io](https://favicon.io/)  

## Installing / Running Locally
While certainly not intended to be run via localhost, it is possible to do so.  
```
# from the root directory spin up a instance of Redis using the dev config provided
docker-compose up -d 

// start the Express server
cd backend
npm i

// create an .env file in the /backend folder with the following values:
/*
NODE_ENV=development
PORT={choose a port}
REDIS_HOST=localhost
REDIS_PORT={choose a port}
REDIS_AUTH=none
MOVE_LIMIT=729
POKEMON_LIMIT=808
*/

npm run start-dev

// go back to the root directory
cd ..

// start a server to serve the frontend
cd frontend
npm i

// create an .env.development file in the /frontend folder with the following values:
/*
NODE_ENV=development
URL=http://localhost:{port selected above}
IMAGE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon
*/

npm run start-dev

// you will now need to populate Redis with the necessary moves and Pokemon data.
// send the following two PUT requests
http://localhost:{port-you-selected}/moveTypes
http://localhost:{port-you-selected}/pokemon

// due to API request limits, each action will take about 10 minutes

```
