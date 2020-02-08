FROM node:12.14.1
RUN mkdir -p /home/app/vp/node_modules && chown -R node:node /home/app/vp
WORKDIR /home/app/vp
COPY package.json ./
USER node
RUN npm i --production
COPY --chown=node:node ./dist ./dist
EXPOSE 3000
CMD [ "node", "dist/server" ]