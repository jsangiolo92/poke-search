FROM node:10
WORKDIR /usr/src/app
COPY package*.json dist ./
COPY .env.production ./.env
RUN npm install
CMD ["npm", "run", "start-prod"]