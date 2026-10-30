FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npx sequelize-cli db:migrate --config config/config.js && npx sequelize-cli db:seed:all --config config/config.js && npx tsx src/server.ts"]
