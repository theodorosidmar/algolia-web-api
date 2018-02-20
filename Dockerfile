FROM node:9.5.0-alpine

RUN mkdir -p usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

COPY . /usr/src/app/

RUN npm install --no-cache --production

CMD ["npm", "start"]
