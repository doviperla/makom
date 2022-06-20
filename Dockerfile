FROM node:12.22.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app/

EXPOSE 3005
CMD [ "npm", "run", "start" ]
