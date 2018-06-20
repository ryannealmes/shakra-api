FROM node:9.11.1-alpine

ENV NODE_PATH /usr/local/lib/node_modules/
ENV PATH /usr/local/lib/bin:$PATH

RUN mkdir /app

WORKDIR /app

COPY package.json /app/

RUN npm install --quiet

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
