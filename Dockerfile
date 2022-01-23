FROM node:16.13.2

WORKDIR '/app'
COPY package*.json ./

RUN npm i -g yarn --force

COPY . .

RUN yarn install

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]