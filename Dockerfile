FROM node:9.5.0-alpine

ENV WORKDIR /algolia-web-api
ENV PORT 3000

WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}
COPY package-lock.json ${WORKDIR}

RUN npm install --no-cache --production

COPY . ${WORKDIR}

CMD npm start

EXPOSE $PORT
