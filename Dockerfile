FROM node:12.14.1
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/app
COPY package.json ./
USER node
RUN npm i --production
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "dist/server.js" ]