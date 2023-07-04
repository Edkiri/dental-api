FROM node:18
WORKDIR /dental-api
COPY package*.json ./
RUN npm install
COPY ./src ./
CMD ["npm", "run", "dev"]