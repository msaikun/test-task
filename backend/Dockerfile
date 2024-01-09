FROM node:16

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8001

CMD ["./node_modules/.bin/ts-node", "index.ts"]
