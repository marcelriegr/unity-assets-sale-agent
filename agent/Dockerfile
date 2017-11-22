FROM node:8.9.1-slim

RUN mkdir /src
RUN npm install -g gulp forever

WORKDIR /src

ADD package.json /src/package.json
RUN npm install

CMD ["npm", "start"]