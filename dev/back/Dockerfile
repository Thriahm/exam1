FROM node:latest
WORKDIR /usr/app
COPY package.json package.json
COPY server.js server.js 
RUN npm install
CMD node server.js