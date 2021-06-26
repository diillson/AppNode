FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV TZ=America/Sao_Paulo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

#EXPOSE 8080
CMD [ "node", "server.js" ]
