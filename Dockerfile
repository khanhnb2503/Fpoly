FROM node:15.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD . .

CMD ["npm", "run", "dev"]