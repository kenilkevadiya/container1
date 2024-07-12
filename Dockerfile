FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6000

CMD ["node", "app1.js"]
