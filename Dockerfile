ARG HOME=/usr/src/app

FROM node:12.14.1
WORKDIR $HOME
COPY package.json ./
RUN echo '-- install dependency --'
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD [ "node", "dist/server.js" ]
RUN echo '-- complete --'