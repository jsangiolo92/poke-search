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
While certainly not intended to be run via localhost, it is possible to do so. Please note, these steps will involve creating/modifying files labeled for production, however, the NODE_ENV value will be set to 'development' - this is intentional.
```
# rename the /backend/config/redis-dev.conf to backend/confg/redis-prod.conf

# create an .env.production file in the /backend folder with the following values:
/*
NODE_ENV=development
PORT=8080
REDIS_HOST=redis
REDIS_PORT=6739
MOVE_LIMIT=729
POKEMON_LIMIT=808
*/


# create an .env.production file in the /frontend folder with the following values:
/*
NODE_ENV=development
URL=http://localhost
IMAGE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon
*/

# from the root directory build the frontend and backend apps
sh build-all.sh

# create a docker volume to persist Redis data
docker volume create redis-volume

# start the docker network
docker-compose -f ./docker-compose-smoke.yaml up --build -d

# send the following two PUT requests to populate Redis with the necessary moves and Pokemon data.
http://localhost:8080/moveTypes
http://localhost:8080/pokemon

// due to API request limits, each action will take about 10 minutes

# you'll be able to access the app on http://localhost

```
